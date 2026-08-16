"use client";

import { useEffect, useRef } from "react";
import type { ParticlesGLInstance } from "particles-gl";

const SOURCE = "/hero-tiles.png";

/* particlesGL only creates particles where alpha > 50%, so the opaque dark
   background of the artwork must be removed before sampling. */
const BG_MAX_CHANNEL = 60;
const SATURATION_BOOST = 1.6;
const SAMPLING = 4;

/* particlesGL renders each particle as a "•" glyph drawn into a 64px point
   sprite; at the default fontSize 48 the glyph only fills ~a quarter of the
   sprite, leaving big gaps between dots. A larger glyph plus a size factor
   just above 1.5 keeps dots small (not chunky) while still overlapping
   enough to read as a continuous filled surface. */
const DOT_SIZE_FACTOR = 1.55;
const DOT_FONT_SIZE = 112;

/*
 * The six tile crops in the 736x736 artwork, verified offline by keying out
 * the background (flood fill from the borders, max channel < 60) and taking
 * the connected components of the remaining opaque pixels: six ~184x183
 * squares at x = {87, 276, 465}, y = {182, 371}, padded by 4px. Hardcoded
 * because runtime run-detection mis-segmented the artwork (the tiles' soft
 * glows touch, merging the axis projections into a single run) and produced
 * sliver fragments.
 */
const ART_SIDE = 736;
const TILE_RECTS = [
  { x: 83, y: 178, w: 192, h: 191 },
  { x: 272, y: 178, w: 192, h: 191 },
  { x: 461, y: 178, w: 191, h: 191 },
  { x: 83, y: 367, w: 192, h: 191 },
  { x: 272, y: 367, w: 192, h: 191 },
  { x: 461, y: 367, w: 191, h: 191 },
];

/* The video sampling path in particlesGL has no alpha channel (a MediaStream
   flattens transparency to black), so it keeps a pixel only when its
   luma exceeds 80 and its max channel exceeds 50. Opaque artwork pixels
   darker than that would vanish, so they get lifted to this luma floor
   (kept well above 80 so the library's 2x upscale can't blur interior
   pixels back under the threshold near tile edges). */
const MIN_LUMA = 100;

/* Resolution of the hidden animation canvas (longest side). High enough
   that smoothed sprite pixels stay fine relative to the sampling grid. */
const ANIM_LONG_SIDE = 1440;
const STREAM_FPS = 30;
/* How often particlesGL resamples the video into particles (ms). Chosen
   with LOOP_SECONDS so the conveyor moves less than one sampling step
   between resamples, keeping consecutive lattices continuous. */
const VIDEO_UPDATE_RATE = 66;

/*
 * Conveyor pose + motion. All six tiles share one rigid 3D pose — cards
 * standing at an angle to the viewer, like a row of album covers seen
 * from the side: horizontally compressed (fake Y-axis rotation) with the
 * top/bottom edges sloping so the right edge sits lower/nearer. The row
 * glides sideways at one constant speed and wraps seamlessly.
 */
const TILT_X_SCALE = 0.72; // horizontal compression ≈ cos(44°)
const TILT_SLOPE = 0.38; // rendered dy/dx of the top edge ≈ tan(21°)
const ROW_HEIGHT_FRAC = 0.38; // card height as a fraction of canvas height
const GAP_FRAC = 0.22; // gap between cards as a fraction of card width
/*
 * One full wrap of the conveyor. Slow enough that the motion between two
 * resamples stays under one sampling step: on a 16:9 hero the track is
 * ~1728 canvas px ≈ 2458 px in the library's 2048px sampling canvas, so
 * 2458 / 70s * 0.066s ≈ 2.3 sampled px per resample < SAMPLING (4).
 */
const LOOP_SECONDS = 70;

type TileSprite = {
  canvas: HTMLCanvasElement;
  w: number;
  h: number;
};

function clamp255(v: number) {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

/*
 * Keys out the dark background and boosts saturation. The background is
 * removed with a flood fill from the image borders instead of a global
 * brightness threshold, so the dark cores *inside* the tiles stay opaque
 * and only the surrounding field goes transparent. Remaining opaque pixels
 * are lifted to MIN_LUMA so they survive particlesGL's video brightness
 * threshold.
 */
function processArtwork(raw: HTMLImageElement): {
  canvas: HTMLCanvasElement;
  imageData: ImageData;
} {
  const w = raw.naturalWidth;
  const h = raw.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(raw, 0, 0);
  const imageData = ctx.getImageData(0, 0, w, h);
  const d = imageData.data;

  const isDark = (p: number) =>
    Math.max(d[p * 4], d[p * 4 + 1], d[p * 4 + 2]) < BG_MAX_CHANNEL;

  const visited = new Uint8Array(w * h);
  const stack: number[] = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);

  while (stack.length) {
    const p = stack.pop()!;
    if (visited[p]) continue;
    visited[p] = 1;
    if (!isDark(p)) continue;
    d[p * 4 + 3] = 0;
    const x = p % w;
    const y = (p / w) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - w);
    if (y < h - 1) stack.push(p + w);
  }

  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] === 0) continue;
    let r = d[i];
    let g = d[i + 1];
    let b = d[i + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    r = clamp255(lum + (r - lum) * SATURATION_BOOST);
    g = clamp255(lum + (g - lum) * SATURATION_BOOST);
    b = clamp255(lum + (b - lum) * SATURATION_BOOST);

    /* Lift dark cores above the video-path luma threshold. Adding an equal
       amount to every channel raises the (weighted-sum) luma by exactly
       that amount, preserving the hue ordering. */
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    if (luma < MIN_LUMA) {
      const lift = MIN_LUMA - luma;
      r = clamp255(r + lift);
      g = clamp255(g + lift);
      b = clamp255(b + lift);
    }

    d[i] = r;
    d[i + 1] = g;
    d[i + 2] = b;
  }

  ctx.putImageData(imageData, 0, 0);
  return { canvas, imageData };
}

/* Cuts the six tiles out of the processed artwork at the verified crop
   rects (scaled if the artwork is ever swapped for another resolution). */
function extractTiles(
  full: HTMLCanvasElement,
  imageData: ImageData,
): TileSprite[] {
  const scale = imageData.width / ART_SIDE;
  return TILE_RECTS.map((rect) => {
    const bx = Math.round(rect.x * scale);
    const by = Math.round(rect.y * scale);
    const bw = Math.round(rect.w * scale);
    const bh = Math.round(rect.h * scale);

    const sprite = document.createElement("canvas");
    sprite.width = bw;
    sprite.height = bh;
    sprite.getContext("2d")!.drawImage(full, bx, by, bw, bh, 0, 0, bw, bh);

    return { canvas: sprite, w: bw, h: bh };
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function HeroParticles() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let instance: ParticlesGLInstance | null = null;
    let stream: MediaStream | null = null;
    let rafId = 0;
    let cancelled = false;

    async function start() {
      const video = videoRef.current;
      const animCanvas = animCanvasRef.current;
      if (!video || !animCanvas) return;

      const [raw, { default: particlesGL }] = await Promise.all([
        loadImage(SOURCE),
        import("particles-gl"),
      ]);
      if (cancelled) return;

      const { canvas: processed, imageData } = processArtwork(raw);
      const tiles = extractTiles(processed, imageData);

      /* Size the animation canvas to the hero's aspect ratio so the tile
         row maps 1:1 onto the visible area (no crop ambiguity). */
      const rect = video.getBoundingClientRect();
      const aspect = rect.width / Math.max(rect.height, 1);
      const animW =
        aspect >= 1 ? ANIM_LONG_SIDE : Math.round(ANIM_LONG_SIDE * aspect);
      const animH =
        aspect >= 1 ? Math.round(ANIM_LONG_SIDE / aspect) : ANIM_LONG_SIDE;
      animCanvas.width = animW;
      animCanvas.height = animH;
      const ctx = animCanvas.getContext("2d")!;

      /*
       * Conveyor layout: every card is scaled to the same rendered height
       * and drawn with one shared rigid tilt (horizontal compression +
       * vertical shear). Cards sit evenly spaced on a circular track that
       * is wider than the canvas, so a card that leaves one side re-enters
       * on the other while the wrap seam itself stays offscreen.
       */
      const drawH = ROW_HEIGHT_FRAC * animH;
      const layouts = tiles.map((tile) => {
        const s = drawH / tile.h; // uniform rendered height
        const renderedW = tile.w * s * TILT_X_SCALE;
        return { tile, s, renderedW };
      });
      const maxW = Math.max(...layouts.map((l) => l.renderedW));
      /* Equidistant slots: every card is centered in a slot of the same
         width (card + constant gap). The animW / 5 lower bound keeps
         trackWidth >= animW + one slot, so the wrap seam never becomes
         visible as a hole in the row. */
      const pitch = Math.max(maxW * (1 + GAP_FRAC), animW / 5);
      const trackWidth = pitch * layouts.length;
      const trackOffset = (trackWidth - animW) / 2;
      /* Matrix b entry: rendered slope is b / a for a horizontal edge. */
      const shearB = TILT_SLOPE * TILT_X_SCALE;

      const drawFrame = (t: number) => {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, animW, animH);
        /* One shared constant speed, drifting leftward like the video. */
        const shift = ((t / LOOP_SECONDS) % 1) * trackWidth;
        for (let i = 0; i < layouts.length; i++) {
          const { tile, s, renderedW } = layouts[i];
          const base = (i + 0.5) * pitch;
          const u =
            (((base - shift) % trackWidth) + trackWidth) % trackWidth;
          const x = u - trackOffset;
          /* The shear is symmetric about the card center, so the sheared
             card spans an extra slope*renderedW/2 above and below drawH. */
          const halfSpan = renderedW / 2 + 2;
          for (const wrap of [-trackWidth, 0, trackWidth]) {
            const cx = x + wrap;
            if (cx + halfSpan < 0 || cx - halfSpan > animW) continue;
            ctx.setTransform(TILT_X_SCALE, shearB, 0, 1, cx, animH / 2);
            ctx.scale(s, s);
            ctx.drawImage(tile.canvas, -tile.w / 2, -tile.h / 2);
          }
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      };

      drawFrame(0);

      /* particlesGL only live-resamples <video> targets (never <canvas>),
         so the animation is piped through a muted MediaStream video. */
      stream = animCanvas.captureStream(STREAM_FPS);
      video.srcObject = stream;

      const t0 = performance.now();
      const tick = () => {
        drawFrame((performance.now() - t0) / 1000);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      try {
        await video.play();
      } catch {
        /* Autoplay of a muted stream is allowed everywhere; a rejection
           here only happens on teardown races. */
      }
      if (cancelled) return;
      if (video.readyState < 2) {
        await new Promise<void>((resolve) => {
          video.addEventListener("loadeddata", () => resolve(), { once: true });
        });
      }
      if (cancelled) return;

      /*
       * particlesGL resamples the video into a canvas whose longest side is
       * 2048px and places particles at (pixel - center) * particleSpacing in
       * world units, but its camera (75° fov at z = 1.15) only sees ~1.76
       * world units of height. The animation canvas shares the hero's aspect
       * ratio, so this spacing makes the tile row fill the hero exactly.
       */
      const SAMPLED_SIDE = 2048;
      const visibleHeight = 2 * Math.tan((75 * Math.PI) / 360) * 1.15;
      const visibleWidth = visibleHeight * aspect;
      const particleSpacing =
        Math.max(visibleWidth, visibleHeight) / SAMPLED_SIDE;

      instance = particlesGL({
        target: ".hero-particles",
        particleColor: "sample",
        // dots sized to overlap the sampled grid gap: solid dotted surface
        particleSize: particleSpacing * SAMPLING * DOT_SIZE_FACTOR,
        particleSpacing,
        sampling: SAMPLING,
        character: "•",
        fontSize: DOT_FONT_SIZE,
        // scatter kept subtle and smooth: gentle push, low velocity bias
        displaceStrength: 0.11,
        displaceRadius: 0.22,
        velocityInfluence: 0.11,
        // per-frame easing factor: ~0.02 ≈ a slow 1s+ drift back home
        returnSpeed: 0.02,
        tilt: false,
        videoUpdateRate: VIDEO_UPDATE_RATE,
      });
    }

    start();
    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      stream?.getTracks().forEach((track) => track.stop());
      instance?.cleanup();
    };
  }, []);

  return (
    <>
      {/* Hidden 2D canvas where the six tile sprites are animated; it is
          streamed into the video below, which particlesGL live-samples. */}
      <canvas
        ref={animCanvasRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
      />
      {/* opacity-0 keeps the raw video invisible while particlesGL samples
          it (the library reads pixels, not rendered opacity), so only the
          particle canvas ever appears on screen. particlesGL copies this
          element's z-index onto its canvas, keeping particles above the
          page background. */}
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        aria-hidden
        className="hero-particles pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover opacity-0"
      />
    </>
  );
}

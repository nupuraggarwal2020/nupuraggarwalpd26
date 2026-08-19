"use client";

import { useEffect, useRef } from "react";
import type { ParticlesGLInstance } from "particles-gl";

/* The brand ramp shared with the button glow border and the footer logo
   flow (see .glow-border and .logo-flow in globals.css). */
const GRADIENT = ["#ffd21f", "#f0964e", "#9b83e8", "#6fa8e8", "#b8d94e"];

const WORD = "hello";
/* Word cap height as a fraction of the canvas height, reduced when the
   word would overflow the canvas width on narrow screens. */
const WORD_SCALE = 0.6;
const MAX_WIDTH_FRAC = 0.92;

/* Same dot recipe as the homepage hero particles: sampling step, sprite
   glyph size, and the overlap factor that makes dots read as a surface. */
const SAMPLING = 4;
const DOT_SIZE_FACTOR = 1.55;
const DOT_FONT_SIZE = 112;

export function TypeParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let instance: ParticlesGLInstance | null = null;
    let cancelled = false;

    async function start() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      /* The word is rasterized in Saans, so the font must be loaded
         before it is drawn. */
      await document.fonts.ready;
      if (cancelled) return;

      const rect = canvas.getBoundingClientRect();
      /* 2x the CSS size is plenty: the library upsamples the source to a
         2048px canvas for particle placement anyway. */
      canvas.width = Math.round(rect.width * 2);
      canvas.height = Math.round(rect.height * 2);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const fontFamily = getComputedStyle(canvas).fontFamily;
      let fontSize = canvas.height * WORD_SCALE;
      ctx.font = `700 ${Math.round(fontSize)}px ${fontFamily}`;
      const measured = ctx.measureText(WORD).width;
      if (measured > canvas.width * MAX_WIDTH_FRAC) {
        fontSize *= (canvas.width * MAX_WIDTH_FRAC) / measured;
        ctx.font = `700 ${Math.round(fontSize)}px ${fontFamily}`;
      }
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const wordWidth = ctx.measureText(WORD).width;
      const gradient = ctx.createLinearGradient(
        (canvas.width - wordWidth) / 2,
        0,
        (canvas.width + wordWidth) / 2,
        0,
      );
      GRADIENT.forEach((color, index) =>
        gradient.addColorStop(index / (GRADIENT.length - 1), color),
      );
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;
      ctx.fillText(WORD, canvas.width / 2, canvas.height / 2);

      /* Reduced motion: keep the static gradient word, skip the cloud. */
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const { default: particlesGL } = await import("particles-gl");
      if (cancelled) return;

      /* Same world math as HeroParticles: the library resamples the source
         into a canvas whose longest side is 2048px, and its camera (75°
         fov at z = 1.15) sees ~1.76 world units of height. This spacing
         maps the word 1:1 onto the element's box. */
      const aspect = rect.width / Math.max(rect.height, 1);
      const visibleHeight = 2 * Math.tan((75 * Math.PI) / 360) * 1.15;
      const visibleWidth = visibleHeight * aspect;
      const particleSpacing =
        Math.max(visibleWidth, visibleHeight) / 2048;

      try {
        instance = particlesGL({
          target: ".type-particles",
          particleColor: "sample",
          particleSize: particleSpacing * SAMPLING * DOT_SIZE_FACTOR,
          particleSpacing,
          sampling: SAMPLING,
          character: "•",
          fontSize: DOT_FONT_SIZE,
          /* Interaction numbers copied from the homepage hero particles. */
          displaceStrength: 0.11,
          displaceRadius: 0.22,
          velocityInfluence: 0.11,
          returnSpeed: 0.02,
          tilt: false,
        });
      } catch {
        /* No WebGL: the static gradient word stays visible. */
      }
    }

    start();
    return () => {
      cancelled = true;
      instance?.cleanup();
    };
  }, []);

  return (
    <div className="h-64 cursor-crosshair sm:h-80 md:h-[26rem] lg:h-[30rem]">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="hello"
        className="type-particles h-full w-full"
      />
    </div>
  );
}

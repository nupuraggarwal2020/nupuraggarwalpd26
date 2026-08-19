"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ParticlesGLInstance } from "particles-gl";
import { GlowBorder } from "@/components/GlowBorder";

/* The brand ramp shared with the button glow border, the footer logo flow
   and the playground scatter word. */
const GRADIENT = ["#ffd21f", "#f0964e", "#9b83e8", "#6fa8e8", "#b8d94e"];

/* Word cap height as a fraction of the canvas height, reduced when the
   word would overflow the canvas width on narrow screens. Kept small so
   the wild scatter has room on all sides: particles clip at the canvas
   edge, and the fling can carry them far from the glyphs. */
const WORD_SCALE = 0.4;
const MAX_WIDTH_FRAC = 0.6;

/* Same dot recipe as the homepage hero particles. */
const SAMPLING = 4;
const DOT_SIZE_FACTOR = 1.55;
const DOT_FONT_SIZE = 112;

type ErrorScreenProps = {
  /** The word drawn in particles, e.g. "404". */
  word: string;
  message: string;
  /** Shows a "Try again" button that calls this (error boundary reset). */
  onRetry?: () => void;
};

/**
 * Full-page error state: the word set in scatterable gradient particles
 * (the homepage hero style) above a short message and recovery actions.
 * Used by app/not-found.tsx and app/error.tsx.
 */
export function ErrorScreen({ word, message, onRetry }: ErrorScreenProps) {
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
      canvas.width = Math.round(rect.width * 2);
      canvas.height = Math.round(rect.height * 2);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const fontFamily = getComputedStyle(canvas).fontFamily;
      let fontSize = canvas.height * WORD_SCALE;
      ctx.font = `700 ${Math.round(fontSize)}px ${fontFamily}`;
      const measured = ctx.measureText(word).width;
      if (measured > canvas.width * MAX_WIDTH_FRAC) {
        fontSize *= (canvas.width * MAX_WIDTH_FRAC) / measured;
        ctx.font = `700 ${Math.round(fontSize)}px ${fontFamily}`;
      }
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const wordWidth = ctx.measureText(word).width;
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
      ctx.fillText(word, canvas.width / 2, canvas.height / 2);

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
      const particleSpacing = Math.max(visibleWidth, visibleHeight) / 2048;

      try {
        instance = particlesGL({
          target: ".error-particles",
          particleColor: "sample",
          particleSize: particleSpacing * SAMPLING * DOT_SIZE_FACTOR,
          particleSpacing,
          sampling: SAMPLING,
          character: "•",
          fontSize: DOT_FONT_SIZE,
          /* Same wild tuning as the playground scatter: strong push, wide
             radius, velocity fling and a lazy return. */
          displaceStrength: 1.6,
          displaceRadius: 0.38,
          velocityInfluence: 1.3,
          returnSpeed: 0.012,
          tilt: true,
          tiltFactor: 0.3,
          tiltSpeed: 0.06,
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
  }, [word]);

  return (
    <main className="relative z-10 mb-[560px] min-h-[calc(100svh+120px)] rounded-b-[48px] bg-night shadow-[0_24px_60px_rgba(0,0,0,0.6)] md:mb-[600px]">
      <section className="mx-auto flex min-h-[92svh] max-w-6xl flex-col items-center justify-center px-6 text-center text-night-ink">
        <div className="h-72 w-full cursor-crosshair sm:h-96 md:h-[30rem]">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={word}
            className="error-particles h-full w-full"
          />
        </div>

        <p className="mt-6 max-w-md text-base leading-relaxed text-night-ink/70 md:text-lg">
          {message}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="btn-chip group px-5 py-2.5"
            >
              Try again
              <GlowBorder />
            </button>
          )}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn-chip group px-5 py-2.5"
          >
            Go back
            <GlowBorder />
          </button>
          <Link href="/" className="btn-chip group px-5 py-2.5">
            Go to the homepage
            <GlowBorder />
          </Link>
        </div>
      </section>
    </main>
  );
}

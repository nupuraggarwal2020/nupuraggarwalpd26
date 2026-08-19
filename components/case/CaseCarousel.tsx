"use client";

import { useCallback, useId, useState } from "react";
import { GlowBorder } from "@/components/GlowBorder";
import { PersonaOutline } from "@/components/case/PersonaOutline";

export type CaseCarouselSlide = {
  src: string;
  alt: string;
};

type CaseCarouselProps = {
  slides: CaseCarouselSlide[];
  fig?: number;
  caption?: string;
  tint: string;
  tone: string;
  /** Thin cyan-to-navy stroke. Default for slides. Set false to opt out. */
  outline?: "persona" | false;
};

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir === "prev" ? (
        <path d="M8.5 2.5L4 7l4.5 4.5" />
      ) : (
        <path d="M5.5 2.5L10 7l-4.5 4.5" />
      )}
    </svg>
  );
}

/**
 * Slow, clickable case-study carousel. One image at a time, with
 * previous / next and dots. No autoplay. The well keeps a 16/9 height
 * so slides do not jump.
 */
export function CaseCarousel({
  slides,
  fig,
  caption,
  tint: _tint,
  tone,
  outline = "persona",
}: CaseCarouselProps) {
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  if (count === 0) return null;

  const current = slides[index];

  return (
    <figure className="grid grid-cols-1 items-center gap-x-4 gap-y-3 sm:grid-cols-[minmax(0,1fr)_auto]">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={caption ? labelId : undefined}
        aria-label={caption ? undefined : "Outcome screens"}
        className="col-span-full w-full"
      >
        {outline === false ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.alt}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>
        ) : (
          <PersonaOutline>
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.src}
                alt={current.alt}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          </PersonaOutline>
        )}
        <p className="sr-only" aria-live="polite">
          Image {index + 1} of {count}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:col-start-2 sm:row-start-2">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous image"
          className="btn-icon h-8 w-8"
        >
          <Arrow dir="prev" />
          <GlowBorder />
        </button>

        <div className="flex items-center gap-1.5 px-1">
          {slides.map((slide, i) => {
            const active = i === index;
            return (
              <button
                key={slide.src}
                type="button"
                aria-label={`Show image ${i + 1} of ${count}`}
                aria-current={active ? "true" : undefined}
                onClick={() => go(i)}
                className="flex h-5 w-5 cursor-pointer items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ outlineColor: tone }}
              >
                <span
                  className="block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out motion-reduce:transition-none"
                  style={{
                    width: active ? 16 : 6,
                    background: active ? tone : "rgba(245, 243, 238, 0.28)",
                  }}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next image"
          className="btn-icon h-8 w-8"
        >
          <Arrow dir="next" />
          <GlowBorder />
        </button>
      </div>

      {caption && (
        <figcaption
          id={labelId}
          className="meta min-w-0 text-faint sm:col-start-1 sm:row-start-2"
        >
          {fig != null && <span className="text-night-ink/60">Fig {fig}</span>}
          {fig != null && " · "}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type QuoteRevealProps = {
  quote: string;
  attribution: string;
  tone: string;
};

/**
 * Interfere-style social proof quote: ghost words fill to white as the
 * reader scrolls. The card pins. Reduced motion shows the full quote.
 */
export function QuoteReveal({ quote, attribution, tone }: QuoteRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const words = quote.split(/\s+/).filter(Boolean);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const wordEls = gsap.utils.toArray<HTMLElement>(
        "[data-quote-word]",
        root,
      );
      if (!wordEls.length) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      const applyStatic = () => {
        gsap.set(wordEls, { opacity: 1, clearProps: "willChange" });
      };

      if (reduced.matches) {
        applyStatic();
        return;
      }

      gsap.set(wordEls, { opacity: 0.18, willChange: "opacity" });

      const tween = gsap.to(wordEls, {
        opacity: 1,
        ease: "none",
        stagger: { each: 0.22, from: "start" },
        scrollTrigger: {
          trigger: root,
          start: "top 16%",
          end: "+=155%",
          // Transform pin stays in the content column. Fixed pin can
          // resolve width against the viewport (100vw) and cover the TOC.
          pin: true,
          pinType: "transform",
          pinSpacing: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: () => {
            gsap.set(wordEls, { willChange: "auto" });
          },
          onEnterBack: () => {
            gsap.set(wordEls, { willChange: "opacity" });
          },
        },
      });

      const onChange = (event: MediaQueryListEvent) => {
        if (!event.matches) return;
        tween.scrollTrigger?.kill();
        tween.kill();
        applyStatic();
      };

      reduced.addEventListener("change", onChange);
      return () => reduced.removeEventListener("change", onChange);
    },
    { scope: rootRef, dependencies: [quote] },
  );

  return (
    <div ref={rootRef} className="w-full min-w-0 max-w-full">
      <figure className="relative flex min-h-[52vh] w-full items-center justify-center overflow-hidden rounded-[32px] border border-white/10 px-8 py-16 md:min-h-[62vh] md:px-16 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 72% 58% at 50% 112%, ${tone}24, transparent 58%), radial-gradient(ellipse 46% 36% at 82% 0%, rgba(111, 168, 232, 0.08), transparent 52%), linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.012))`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, transparent 46%, rgba(245, 243, 238, 0.35) 50%, transparent 54%), linear-gradient(45deg, transparent 46%, rgba(245, 243, 238, 0.35) 50%, transparent 54%)",
            backgroundSize: "100% 100%",
            transform: "translateZ(0)",
          }}
        />
        <blockquote className="relative z-10 mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <p className="sr-only">{quote}</p>
          <p
            aria-hidden
            className="display text-[clamp(1.75rem,4.1vw,2.85rem)] leading-[1.14] text-night-ink"
          >
            <span className="mr-[0.18em] inline-block opacity-40">&ldquo;</span>
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                data-quote-word
                className="mr-[0.28em] inline-block transform-gpu motion-safe:opacity-[0.18]"
              >
                {word}
              </span>
            ))}
            <span className="inline-block opacity-40">&rdquo;</span>
          </p>
          <footer className="meta mt-10 text-faint">{attribution}</footer>
        </blockquote>
      </figure>
    </div>
  );
}

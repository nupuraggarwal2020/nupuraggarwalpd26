"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PersonaOutline } from "@/components/case/PersonaOutline";
import styles from "./CanvaResizeReplay.module.css";

gsap.registerPlugin(useGSAP);

const REDUCE = "(prefers-reduced-motion: reduce)";
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_INOUT = "cubic-bezier(0.77, 0, 0.175, 1)";

const TITLE_BEFORE = "Generating 24 assets for Vera Glow Ritual Campaign";
const TITLE_AFTER = "Resized to 4 sizes";

const SLOTS = [
  { src: "/work/canva-ai/resize-fill-1.png", pos: "center" },
  { src: "/work/canva-ai/resize-fill-2.png", pos: "left center" },
  { src: "/work/canva-ai/resize-fill-1.png", pos: "center 20%" },
  { src: "/work/canva-ai/resize-fill-2.png", pos: "right center" },
  { src: "/work/canva-ai/resize-fill-1.png", pos: "center top" },
  { src: "/work/canva-ai/resize-fill-2.png", pos: "center" },
] as const;

type CanvaResizeReplayProps = {
  fig?: number;
  caption?: string;
};

function IconChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M5.1 2.8 9.2 7 5.1 11.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCanvaC() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M8.3 3.4C7.7 2.7 6.9 2.4 6 2.4 4.2 2.4 3 3.7 3 5.9c0 2.1 1.3 3.5 3 3.5.9 0 1.7-.3 2.3-1L7.4 7.5c-.3.4-.8.6-1.3.6-1 0-1.6-.8-1.6-2.2S5.1 3.7 6.1 3.7c.5 0 1 .2 1.3.6l.9-.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CanvaResizeReplay({
  fig = 1,
  caption = "Multi-platform resize from one conversation.",
}: CanvaResizeReplayProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleBeforeRef = useRef<HTMLParagraphElement>(null);
  const titleAfterRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      const titleBefore = titleBeforeRef.current;
      const titleAfter = titleAfterRef.current;
      if (!root || !track || !titleBefore || !titleAfter) return;

      const fills = gsap.utils.toArray<HTMLElement>("[data-slot-fill]", root);
      const slot = track.querySelector<HTMLElement>("[data-slot]");
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 11;
      const delta = slot ? -(slot.offsetWidth + gap) * 1.12 : -164;

      const showFinal = () => {
        root.setAttribute("data-reduce", "true");
        gsap.set(fills, { autoAlpha: 1, scale: 1 });
        gsap.set(titleBefore, { autoAlpha: 0 });
        gsap.set(titleAfter, { autoAlpha: 1 });
        gsap.set(track, { x: 0 });
      };

      if (window.matchMedia(REDUCE).matches) {
        showFinal();
        return;
      }

      const resetIdle = () => {
        root.removeAttribute("data-reduce");
        gsap.set(fills, { autoAlpha: 0, scale: 1.04 });
        gsap.set(titleBefore, { autoAlpha: 1 });
        gsap.set(titleAfter, { autoAlpha: 0 });
        gsap.set(track, { x: 0 });
      };

      resetIdle();

      let tl: gsap.core.Timeline | null = null;

      const play = () => {
        if (tl) return;

        gsap.set([track, ...fills], { willChange: "transform, opacity" });

        tl = gsap.timeline({
          defaults: { ease: EASE_OUT },
          repeat: -1,
        });

        tl.to({}, { duration: 0.5 })
          .to(fills, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.42,
            stagger: 0.2,
            ease: EASE_OUT,
          })
          .to(titleBefore, { autoAlpha: 0, duration: 0.22, ease: EASE_INOUT }, "+=0.08")
          .to(titleAfter, { autoAlpha: 1, duration: 0.22, ease: EASE_OUT }, "<")
          .to({}, { duration: 0.38 })
          .to(track, {
            x: delta,
            duration: 0.85,
            ease: EASE_INOUT,
          })
          .to({}, { duration: 1.2 })
          .to(fills, {
            autoAlpha: 0,
            scale: 1.04,
            duration: 0.3,
            stagger: 0.04,
            ease: EASE_INOUT,
          })
          .to(titleAfter, { autoAlpha: 0, duration: 0.18, ease: EASE_INOUT }, "<")
          .to(titleBefore, { autoAlpha: 1, duration: 0.18, ease: EASE_OUT }, "<")
          .add(() => {
            gsap.set(track, { x: 0 });
          })
          .to({}, { duration: 0.28 });
      };

      const io = new IntersectionObserver(
        (entries) => {
          const on = entries.some(
            (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.35,
          );
          if (on) {
            play();
            tl?.resume();
          } else {
            tl?.pause();
          }
        },
        { threshold: [0.35] },
      );
      io.observe(root);

      const onVis = () => {
        if (!tl) return;
        if (document.hidden) tl.pause();
        else tl.resume();
      };
      document.addEventListener("visibilitychange", onVis);

      return () => {
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
      };
    },
    { scope: rootRef },
  );

  return (
    <figure>
      <PersonaOutline>
        <div
          ref={rootRef}
          className={styles.stage}
          role="img"
          aria-label="Canva generates four Vera Glow sizes, then the carousel scrolls."
        >
          <p className={styles.sr}>
            {TITLE_BEFORE} {TITLE_AFTER}
          </p>
          <div className={styles.chrome}>
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.titleWell}>
                  <p ref={titleBeforeRef} className={styles.title}>
                    {TITLE_BEFORE}
                  </p>
                  <p
                    ref={titleAfterRef}
                    className={`${styles.title} ${styles.titleAfter}`}
                  >
                    {TITLE_AFTER}
                  </p>
                </div>
                <span className={styles.edit}>
                  <IconCanvaC />
                  Edit in Canva
                </span>
              </div>

              <div className={styles.carousel}>
                <div ref={trackRef} className={styles.track}>
                  {SLOTS.map((slot, i) => (
                    <div
                      key={`${slot.src}-${i}`}
                      data-slot
                      className={styles.slot}
                    >
                      <span className={styles.placeholder} />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        data-slot-fill
                        src={slot.src}
                        alt=""
                        className={styles.fill}
                        style={{ objectPosition: slot.pos }}
                      />
                    </div>
                  ))}
                </div>
                <span className={styles.next} aria-hidden>
                  <IconChevronRight />
                </span>
              </div>
            </div>
          </div>
        </div>
      </PersonaOutline>
      <figcaption className="meta mt-3 text-faint">
        {fig != null && <span className="text-night-ink/60">Fig {fig}</span>}
        {fig != null && " · "}
        {caption}
      </figcaption>
    </figure>
  );
}

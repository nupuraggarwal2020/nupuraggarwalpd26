"use client";

import { useId, useRef } from "react";
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

function IconGptMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
      <circle cx="14" cy="14" r="14" fill="#202123" />
      <path
        d="M14 7.1c.9 0 1.7.3 2.3 1l.3.3c.3-.2.7-.3 1.1-.3 1.2 0 2.2 1 2.2 2.2 0 .4-.1.8-.3 1.1l.3.3c.6.6 1 1.4 1 2.3s-.4 1.7-1 2.3l-.3.3c.2.3.3.7.3 1.1 0 1.2-1 2.2-2.2 2.2-.4 0-.8-.1-1.1-.3l-.3.3c-.6.7-1.4 1-2.3 1s-1.7-.3-2.3-1l-.3-.3c-.3.2-.7.3-1.1.3-1.2 0-2.2-1-2.2-2.2 0-.4.1-.8.3-1.1l-.3-.3c-.6-.6-1-1.4-1-2.3s.4-1.7 1-2.3l.3-.3c-.2-.3-.3-.7-.3-1.1 0-1.2 1-2.2 2.2-2.2.4 0 .8.1 1.1.3l.3-.3c.6-.7 1.4-1 2.3-1Z"
        fill="none"
        stroke="#fff"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function IconCompose() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect
        x="3.1"
        y="3.1"
        width="11.8"
        height="11.8"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.45"
      />
      <path
        d="M9.6 6.1 12 8.5M6 12.5l.6-2.5 5.1-5.1a1.15 1.15 0 0 1 1.6 1.6L8.2 11.6 6 12.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="8.1" cy="8.1" r="4.4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m11.4 11.4 3.2 3.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconLibrary() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect
        x="4.2"
        y="5.4"
        width="9.6"
        height="8"
        rx="1.6"
        stroke="currentColor"
        strokeWidth="1.45"
      />
      <path
        d="M6.1 5.2V4.6A1.6 1.6 0 0 1 7.7 3h5.1A1.6 1.6 0 0 1 14.4 4.6V5"
        stroke="currentColor"
        strokeWidth="1.45"
      />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M1.8 3.2 5 6.8 8.2 3.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShare() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path
        d="M7.5 9.2V2.4M4.6 5 7.5 2.2 10.4 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.2 8.2v3.2A1.4 1.4 0 0 0 4.6 12.8h5.8a1.4 1.4 0 0 0 1.4-1.4V8.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMore() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="4.2" cy="9" r="1.15" fill="currentColor" />
      <circle cx="9" cy="9" r="1.15" fill="currentColor" />
      <circle cx="13.8" cy="9" r="1.15" fill="currentColor" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 3.6v10.8M3.6 9h10.8"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMic() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect
        x="5.6"
        y="2.2"
        width="4.8"
        height="7.2"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M3.6 7.6a4.4 4.4 0 0 0 8.8 0M8 12v1.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSend() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 11.2V2.8M3.6 6 7 2.6 10.4 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconThumb({ down = false }: { down?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      style={down ? { transform: "rotate(180deg)" } : undefined}
    >
      <path
        d="M4.2 12.2h-1A1.2 1.2 0 0 1 2 11V6.6A1.2 1.2 0 0 1 3.2 5.4h1.2l1.4-2.7A1.3 1.3 0 0 1 7 2c.6 0 1 .5.9 1.1L7.6 5.4h3.7A1.5 1.5 0 0 1 12.8 7l-.6 3.2a1.8 1.8 0 0 1-1.8 1.5H4.2Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 1.1 6.7 4.4 10 5.1 6.7 5.8 6 9.1 5.3 5.8 2 5.1 5.3 4.4 6 1.1Z"
        fill="currentColor"
      />
      <path d="m9.3 8.2.3 1.3 1.3.3-1.3.3-.3 1.3-.3-1.3-1.3-.3 1.3-.3.3-1.3Z" fill="currentColor" />
    </svg>
  );
}

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

function IconCanvaMark({ gid }: { gid: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="2" y1="16" x2="16" y2="2">
          <stop offset="0%" stopColor="#00c4cc" />
          <stop offset="55%" stopColor="#7d2ae8" />
          <stop offset="100%" stopColor="#8b3dff" />
        </linearGradient>
      </defs>
      <circle cx="9" cy="9" r="9" fill={`url(#${gid})`} />
      <path
        d="M11.7 6.2c-.7-.8-1.7-1.2-2.8-1.2-2.2 0-3.7 1.6-3.7 4 0 2.3 1.6 4 3.8 4 1.1 0 2.1-.4 2.8-1.2l-1.1-1.1c-.4.5-1 .8-1.7.8-1.2 0-2-1-2-2.5s.8-2.5 2-2.5c.7 0 1.3.3 1.7.8l1-1.1Z"
        fill="#fff"
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
  const uid = useId().replace(/:/g, "");
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
            <aside className={styles.rail} aria-hidden>
              <span className={styles.railLogo}>
                <IconGptMark />
              </span>
              <span className={styles.railBtn}>
                <IconCompose />
              </span>
              <span className={styles.railBtn}>
                <IconSearch />
              </span>
              <span className={styles.railBtn}>
                <IconLibrary />
              </span>
            </aside>

            <header className={styles.topbar} aria-hidden>
              <span className={styles.model}>
                ChatGPT 5
                <span className={styles.modelChevron}>
                  <IconChevronDown />
                </span>
              </span>
              <span className={styles.topRight}>
                <span className={styles.share}>
                  <IconShare />
                  Share
                </span>
                <span className={styles.more}>
                  <IconMore />
                </span>
              </span>
            </header>

            <div className={styles.thread}>
              <div className={styles.prev} aria-hidden>
                <div className={styles.prevTrack}>
                  {SLOTS.slice(0, 4).map((slot, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={`prev-${slot.src}-${i}`}
                      src={slot.src}
                      alt=""
                      style={{ objectPosition: slot.pos }}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.actions} aria-hidden>
                <span className={styles.thumbs}>
                  <IconThumb />
                  <IconThumb down />
                </span>
                <span className={styles.pill}>Translate</span>
                <span className={styles.pill}>Resize</span>
                <span className={`${styles.pill} ${styles.pillAi}`}>
                  <IconSparkle />
                  Edit with AI
                </span>
              </div>

              <div className={styles.canvaRow} aria-hidden>
                <IconCanvaMark gid={`${uid}-canva`} />
                <span>Canva</span>
              </div>

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

            <div className={styles.dock} aria-hidden>
              <div className={styles.composer}>
                <span className={styles.composerIcon}>
                  <IconPlus />
                </span>
                <span className={styles.ask}>Ask anything...</span>
                <span className={styles.composerIcon}>
                  <IconMic />
                </span>
                <span className={styles.send}>
                  <IconSend />
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

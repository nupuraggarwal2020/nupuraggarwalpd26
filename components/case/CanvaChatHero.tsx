"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PersonaOutline } from "@/components/case/PersonaOutline";
import styles from "./CanvaChatHero.module.css";

gsap.registerPlugin(useGSAP);

const REDUCE = "(prefers-reduced-motion: reduce)";
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_INOUT = "cubic-bezier(0.77, 0, 0.175, 1)";

/**
 * Prompt from outcome-1.png, also captioned on the case page as
 * "ChatGPT conversation with a Canva sales pitch deck draft".
 */
const PROMPT =
  "Canva create a sales pitch deck for Realty First, a new client we're pitching for. Use the company knowledge from the company report pdf";

/** Follow-up line under the Canva card on outcome-1.png. */
const REPLY =
  "I've created a draft of the presentation for you to customise. You can update the page content, length, audience and style.";

const RESULTS = [
  {
    src: "/work/canva-ai/outcome-4.png",
    alt: "Generated Realty First pitch slide",
    title: "Sales pitch deck",
    sub: "Generated in ChatGPT",
  },
  {
    src: "/work/canva-ai/outcome-5.png",
    alt: "Canva editor with a generated presentation slide",
    title: "Who we are",
    sub: "Open in Canva",
  },
  {
    src: "/work/canva-ai/outcome-1.png",
    alt: "ChatGPT conversation with a Canva sales pitch deck draft",
    title: "Sales pitch deck",
    sub: "Professional · 5 to 15 pages",
  },
] as const;

function IconPlus() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 3.4v11.2M3.4 9h11.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMic() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect
        x="6.2"
        y="2.6"
        width="5.6"
        height="8.2"
        rx="2.8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4.3 8.6a4.7 4.7 0 0 0 9.4 0M9 13.3v2.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconWave() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.2 6.2v3.6M6.4 4.1v7.8M9.6 5.4v5.2M12.8 6.8v2.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSend() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 12.6V3.4M4.2 7.1 8 3.4l3.8 3.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 7.4h12M4 12.6h12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCompose() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect
        x="3.2"
        y="3.2"
        width="11.6"
        height="11.6"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9.7 6.2 12 8.5M6.1 12.4l.6-2.4 5-5a1.15 1.15 0 0 1 1.6 1.6l-5 5-2.4.6Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
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

function IconClose() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.2 2.2 9.8 9.8M9.8 2.2 2.2 9.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSignal() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden>
      <rect x="0" y="7.2" width="2.4" height="3.8" rx="0.5" />
      <rect x="4.1" y="4.8" width="2.4" height="6.2" rx="0.5" />
      <rect x="8.2" y="2.4" width="2.4" height="8.6" rx="0.5" />
      <rect x="12.3" y="0" width="2.4" height="11" rx="0.5" opacity="0.38" />
    </svg>
  );
}

function IconWifi() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden>
      <path
        d="M1.3 3.6A8.4 8.4 0 0 1 13.7 3.6M3.5 6A5.4 5.4 0 0 1 11.5 6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <circle cx="7.5" cy="9.1" r="1.15" fill="currentColor" />
    </svg>
  );
}

function IconBattery() {
  return (
    <svg width="22" height="11" viewBox="0 0 22 11" fill="none" aria-hidden>
      <rect
        x="0.6"
        y="0.6"
        width="18.2"
        height="9.8"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect x="2.1" y="2.1" width="15.2" height="6.8" rx="1.1" fill="currentColor" />
      <path d="M20.4 3.6v3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M3.2 1.8 6.8 5 3.2 8.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CanvaChatHeroProps = {
  /** page: case study hero. home: homepage card well. */
  variant?: "page" | "home";
};

export function CanvaChatHero({ variant = "page" }: CanvaChatHeroProps) {
  const isHome = variant === "home";
  const rootRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const placeholderRef = useRef<HTMLSpanElement>(null);
  const sendRef = useRef<HTMLSpanElement>(null);
  const sendIconRef = useRef<HTMLSpanElement>(null);
  const waveIconRef = useRef<HTMLSpanElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const composer = composerRef.current;
      const typed = typedRef.current;
      const caret = caretRef.current;
      const placeholder = placeholderRef.current;
      const send = sendRef.current;
      const sendIcon = sendIconRef.current;
      const waveIcon = waveIconRef.current;
      const search = searchRef.current;
      const phone = phoneRef.current;
      const reply = replyRef.current;
      const cards = cardsRef.current;
      const detail = detailRef.current;
      if (
        !root ||
        !composer ||
        !typed ||
        !caret ||
        !placeholder ||
        !send ||
        !sendIcon ||
        !waveIcon ||
        !search ||
        !phone ||
        !reply ||
        !cards ||
        !detail
      ) {
        return;
      }

      const cardEls = gsap.utils.toArray<HTMLElement>("[data-cch-card]", cards);

      const showFinal = () => {
        typed.textContent = PROMPT;
        composer.classList.remove(styles.composerEmpty);
        gsap.set(placeholder, { autoAlpha: 0, position: "absolute" });
        gsap.set(caret, { autoAlpha: 0 });
        gsap.set(waveIcon, { autoAlpha: 0 });
        gsap.set(sendIcon, { autoAlpha: 1 });
        gsap.set(composer, { autoAlpha: 0, scale: 0.96 });
        gsap.set(search, { autoAlpha: 0 });
        gsap.set(phone, { autoAlpha: 1, scale: 1, y: 0 });
        gsap.set(reply, { autoAlpha: 1 });
        gsap.set(cardEls, { autoAlpha: 1, x: 0 });
        gsap.set(detail, { autoAlpha: 0 });
      };

      if (window.matchMedia(REDUCE).matches) {
        showFinal();
        return;
      }

      gsap.set(composer, { autoAlpha: 1, scale: 1 });
      gsap.set(placeholder, { autoAlpha: 1 });
      gsap.set(caret, { autoAlpha: 0 });
      gsap.set(typed, { autoAlpha: 1 });
      gsap.set(waveIcon, { autoAlpha: 1 });
      gsap.set(sendIcon, { autoAlpha: 0 });
      gsap.set(search, { autoAlpha: 0, scale: 0.96 });
      gsap.set(phone, { autoAlpha: 0, scale: 0.95, y: 28 });
      gsap.set(reply, { autoAlpha: 0 });
      gsap.set(cardEls, { autoAlpha: 0, x: 28 });
      gsap.set(detail, { autoAlpha: 0, scale: 0.96 });
      typed.textContent = "";

      const state = { n: 0 };
      let started = false;
      let tl: gsap.core.Timeline | null = null;

      const play = () => {
        if (started) return;
        started = true;

        tl = gsap.timeline({
          defaults: { ease: EASE_OUT },
          onComplete: () => {
            gsap.set([composer, search, phone, detail, ...cardEls], {
              willChange: "auto",
            });
          },
        });

        gsap.set([composer, search, phone, detail], {
          willChange: "transform, opacity",
        });

        tl.to(
          {},
          { duration: 0.28 },
        )
          .add(() => {
            caret.classList.add(styles.caretBlink);
          })
          .to(caret, { autoAlpha: 1, duration: 0.08 }, "<")
          .to(
            state,
            {
              n: PROMPT.length,
              duration: 3.85,
              ease: "none",
              onUpdate: () => {
                const count = Math.round(state.n);
                typed.textContent = PROMPT.slice(0, count);
                if (count === 1) {
                  gsap.set(placeholder, { autoAlpha: 0, position: "absolute" });
                  composer.classList.remove(styles.composerEmpty);
                  gsap.set(waveIcon, { autoAlpha: 0 });
                  gsap.set(sendIcon, { autoAlpha: 1 });
                }
              },
            },
            "+=0.12",
          )
          .to(caret, { autoAlpha: 0, duration: 0.08 }, "+=0.22")
          .to(
            send,
            { scale: 0.92, duration: 0.1, ease: EASE_OUT },
          )
          .to(send, { scale: 1, duration: 0.12, ease: EASE_OUT })
          .to(
            composer,
            { autoAlpha: 0, scale: 0.94, duration: 0.32, ease: EASE_INOUT },
            "+=0.04",
          )
          .fromTo(
            search,
            { autoAlpha: 0, scale: 0.96 },
            { autoAlpha: 1, scale: 1, duration: 0.38, ease: EASE_OUT },
            "<0.06",
          )
          .to({}, { duration: 1.15 })
          .to(
            search,
            { autoAlpha: 0, scale: 0.96, duration: 0.28, ease: EASE_INOUT },
          )
          .to(
            phone,
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.52, ease: EASE_OUT },
            "<0.08",
          )
          .to(reply, { autoAlpha: 1, duration: 0.28 }, "-=0.12")
          .to(
            cardEls,
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.42,
              stagger: 0.07,
              ease: EASE_OUT,
            },
            "+=0.18",
          )
          .to({}, { duration: 0.7 })
          .to(
            phone,
            { autoAlpha: 0, scale: 1.04, duration: 0.42, ease: EASE_INOUT },
          )
          .fromTo(
            detail,
            { autoAlpha: 0, scale: 0.96 },
            { autoAlpha: 1, scale: 1, duration: 0.48, ease: EASE_OUT },
            "<0.08",
          );
      };

      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.35)) {
            play();
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

  const layers = (
    <>
      {!isHome ? (
        <p className={styles.sr}>
          {PROMPT} {REPLY}
        </p>
      ) : null}

      <div className={styles.layer}>
        <div
          ref={composerRef}
          className={`${styles.composer} ${styles.composerEmpty}`}
        >
          <div className={styles.composerBody}>
            <p className={styles.line}>
              <span ref={typedRef} className={styles.typed} />
              <span ref={caretRef} className={styles.caret} />
              <span ref={placeholderRef} className={styles.placeholder}>
                Ask anything
              </span>
            </p>
          </div>
          <span className={styles.plus}>
            <IconPlus />
          </span>
          <span className={styles.toolRight}>
            <span className={styles.iconBtn}>
              <IconMic />
            </span>
            <span ref={sendRef} className={styles.send}>
              <span ref={waveIconRef} className={styles.sendIcon}>
                <IconWave />
              </span>
              <span ref={sendIconRef} className={styles.sendIcon}>
                <IconSend />
              </span>
            </span>
          </span>
        </div>

        <div ref={searchRef} className={styles.search}>
          <p className={styles.searchText}>Designing with Canva</p>
        </div>
      </div>

      <div className={styles.layer}>
        <div ref={phoneRef} className={styles.phone}>
          <div className={styles.status}>
            <span className={styles.statusTime}>11:30</span>
            <span className={styles.statusIcons}>
              <IconSignal />
              <IconWifi />
              <IconBattery />
            </span>
          </div>
          <div className={styles.nav}>
            <span className={styles.navLeft}>
              <IconMenu />
            </span>
            <span className={styles.model}>
              ChatGPT 5
              <span className={styles.modelChevron}>
                <IconChevron />
              </span>
            </span>
            <span className={styles.navRight}>
              <IconCompose />
              <IconMore />
            </span>
          </div>
          <div className={styles.thread}>
            <p className={styles.bubble}>{PROMPT}</p>
            <p ref={replyRef} className={styles.reply}>
              {REPLY}
            </p>
            <div ref={cardsRef} className={styles.carousel}>
              {RESULTS.map((item) => (
                <article
                  key={item.src}
                  data-cch-card
                  className={styles.card}
                >
                  {/* Native img keeps the file aspect, same as Media. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={isHome ? "" : item.alt} />
                  <div className={styles.cardMeta}>
                    <p className={styles.cardTitle}>{item.title}</p>
                    <p className={styles.cardSub}>{item.sub}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className={styles.dock}>
            <div className={styles.input}>
              <span className={styles.iconBtn}>
                <IconPlus />
              </span>
              <span className={styles.inputGhost}>Ask anything</span>
              <span className={styles.iconBtn}>
                <IconMic />
              </span>
              <span className={styles.voice}>
                <IconWave />
              </span>
            </div>
          </div>
          <div className={styles.home} />
        </div>
      </div>

      <div className={styles.layer}>
        <div ref={detailRef} className={styles.detail}>
          <div className={styles.detailTop}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/canva-ai/outcome-4.png"
              alt={isHome ? "" : "Generated Realty First pitch slide"}
            />
            <div className={styles.detailActions}>
              <span className={styles.detailChip}>
                <IconMore />
              </span>
              <span className={styles.detailChip}>
                <IconClose />
              </span>
            </div>
          </div>
          <div className={styles.detailBody}>
            <p className={styles.detailTitle}>Sales pitch deck</p>
            <p className={styles.detailSub}>
              Professional · 5 to 15 pages · Minimalist
            </p>
            <div className={styles.detailCta}>Open in Canva</div>
          </div>
        </div>
      </div>
    </>
  );

  const stage = (
    <div
      ref={rootRef}
      className={isHome ? `${styles.stage} ${styles.stageHome}` : styles.stage}
      role="img"
      aria-hidden={isHome || undefined}
      aria-label={
        isHome
          ? undefined
          : "ChatGPT types a Canva prompt for a Realty First sales pitch deck, then shows the generated design frames."
      }
    >
      {isHome ? <div className={styles.canvasHome}>{layers}</div> : layers}
    </div>
  );

  return (
    <figure className={isHome ? `${styles.figure} ${styles.figureHome}` : styles.figure}>
      {isHome ? stage : <PersonaOutline>{stage}</PersonaOutline>}
    </figure>
  );
}

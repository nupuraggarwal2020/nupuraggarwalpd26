"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, useGSAP);

/*
 * Ethnocare Text Showcase (8.35s, not a loop). The sentence scene
 * (0.3s to 2.8s) is the match for this heading:
 *   1. Every word is already on the page, dim and blurred.
 *   2. A reading wave sharpens each word in order (blur + opacity).
 *   3. Motion is optical, not a slide. Weighted ease, ~2.5s total.
 * The supporting line waits until that wave ends, then rises + fades.
 */

const REDUCE = "(prefers-reduced-motion: reduce)";

function heroInView(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return r.bottom > 64 && r.top < window.innerHeight - 48;
}

export function HeroText() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const title = titleRef.current;
    const sub = subRef.current;
    if (!title || !sub) return;

    if (window.matchMedia(REDUCE).matches || !heroInView(title)) {
      return;
    }

    let cancelled = false;
    let titleSplit: SplitText | null = null;
    let subSplit: SplitText | null = null;
    const timeline: gsap.core.Timeline[] = [];

    gsap.set([title, sub], { autoAlpha: 0 });

    const play = () => {
      if (cancelled || !titleRef.current || !subRef.current) return;
      if (!heroInView(titleRef.current)) {
        gsap.set([titleRef.current, subRef.current], { autoAlpha: 1 });
        return;
      }

      titleSplit = SplitText.create(titleRef.current, {
        type: "words",
        tag: "span",
        wordsClass: "hero-word",
        aria: "auto",
        smartWrap: true,
      });
      subSplit = SplitText.create(subRef.current, {
        type: "words",
        tag: "span",
        wordsClass: "hero-sub-word",
        aria: "auto",
        smartWrap: true,
      });

      const titleWords = titleSplit.words;
      const subWords = subSplit.words;

      gsap.set(titleRef.current, { autoAlpha: 1 });
      gsap.set(subRef.current, { autoAlpha: 1 });
      gsap.set(titleWords, {
        opacity: 0.14,
        filter: "blur(10px)",
        force3D: true,
      });
      gsap.set(subWords, {
        opacity: 0,
        y: 28,
        force3D: true,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          titleWords.forEach((word) => {
            (word as HTMLElement).style.filter = "";
            (word as HTMLElement).style.willChange = "auto";
          });
          subWords.forEach((word) => {
            (word as HTMLElement).style.willChange = "auto";
          });
        },
      });

      tl.to(titleWords, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.05,
        stagger: 0.18,
        ease: "power3.out",
      });
      tl.to(
        subWords,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.04,
          ease: "power3.out",
        },
        "+=0.12",
      );

      timeline.push(tl);
    };

    const fonts = document.fonts;
    if (fonts?.ready) {
      fonts.ready.then(play);
    } else {
      play();
    }

    return () => {
      cancelled = true;
      timeline.forEach((tl) => tl.kill());
      titleSplit?.revert();
      subSplit?.revert();
    };
  });

  return (
    <>
      <h1
        ref={titleRef}
        className="hero-title display relative z-10 max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)]"
      >
        I design how complex technical systems become{" "}
        <em className="italic">usable</em> products.
      </h1>
      <p
        ref={subRef}
        className="hero-sub absolute inset-x-0 bottom-20 z-10 mx-auto max-w-xl px-6 text-base leading-relaxed text-pretty text-night-ink/70 md:text-lg"
      >
        I bring systems thinking to develop and ship innovative products.
        Currently focused on AI-powered workflows and developer ecosystems at{" "}
        <strong className="font-semibold text-night-ink">Canva</strong>.
      </p>
    </>
  );
}

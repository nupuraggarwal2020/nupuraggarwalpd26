"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { mainCases, type CaseStudy } from "@/lib/content";
import { GlowBorder } from "./GlowBorder";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PIN_TOP = 84;
const STACK_GAP = 16;
const MARQUEE_DURATION = 180;

/* Simple placeholder UI panels — replaced with real project visuals later */

function SkeletonLines({ tone, rows }: { tone: string; rows: number }) {
  const widths = ["82%", "64%", "91%", "48%", "73%", "57%"];
  return (
    <div className="flex flex-col gap-2.5">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-2.5 rounded-full"
          style={{ width: widths[i % widths.length], background: tone, opacity: 0.35 }}
        />
      ))}
    </div>
  );
}

function BrowserPanel({ tone }: { tone: string }) {
  return (
    <div className="h-full w-full rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div className="mb-4 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-ink/10" />
        ))}
      </div>
      <div className="mb-4 h-8 w-2/5 rounded-lg" style={{ background: tone, opacity: 0.5 }} />
      <SkeletonLines tone={tone} rows={5} />
    </div>
  );
}

function ChatPanel({ tone }: { tone: string }) {
  return (
    <div className="flex h-full w-full flex-col justify-end gap-3 rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div className="ml-auto h-9 w-3/5 rounded-2xl rounded-br-md bg-ink/8" />
      <div className="h-9 w-4/5 rounded-2xl rounded-bl-md" style={{ background: tone, opacity: 0.4 }} />
      <div className="h-9 w-1/2 rounded-2xl rounded-bl-md" style={{ background: tone, opacity: 0.25 }} />
      <div className="mt-1 flex h-10 items-center rounded-full border border-ink/10 px-4">
        <div className="h-2 w-1/3 rounded-full bg-ink/10" />
      </div>
    </div>
  );
}

function ChipPanel({ tone }: { tone: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-3 rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div className="h-6 w-16 rounded-full" style={{ background: tone, opacity: 0.5 }} />
      <SkeletonLines tone={tone} rows={3} />
    </div>
  );
}

function ImagePanel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex h-full shrink-0 items-center overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      {/* Height follows the marquee row. Width follows the file aspect. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-auto max-w-none object-contain"
      />
    </div>
  );
}

type PanelItem = {
  kind: "panel";
  Panel: typeof BrowserPanel;
  aspect: string;
};

type ImageItem = {
  kind: "image";
  src: string;
  alt: string;
};

type CarouselItem = PanelItem | ImageItem;

/* One seamless-loop sequence of carousel items; rendered twice for the marquee. */
const placeholderItems: CarouselItem[] = [
  { kind: "panel", Panel: BrowserPanel, aspect: "aspect-[16/10]" },
  { kind: "panel", Panel: ChatPanel, aspect: "aspect-[3/4]" },
  { kind: "panel", Panel: ChipPanel, aspect: "aspect-[4/5]" },
];

const canvaAiItems: CarouselItem[] = [
  {
    kind: "image",
    src: "/work/canva-ai/hero.png",
    alt: "ChatGPT creating on-brand Chopify Burger social posts via Canva",
  },
  {
    kind: "image",
    src: "/work/canva-ai/link-component.png",
    alt: "Canva using brand guidelines from a chat prompt",
  },
];

function itemsForCase(slug: string): CarouselItem[] {
  return slug === "canva-ai" ? canvaAiItems : placeholderItems;
}

function CaseCard({ cs, index }: { cs: CaseStudy; index: number }) {
  return (
    <article
      className="case-card relative mx-auto flex h-[82svh] w-full max-w-[1600px] flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-[#1c1b18]/90 p-6 text-night-ink backdrop-blur-md shadow-[0_-12px_60px_rgba(0,0,0,0.5)] md:p-9"
      style={{ zIndex: index + 1 }}
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="meta text-night-ink/45">Project {index + 1}</span>
            <span className="text-night-ink/45">·</span>
            <span className="text-sm text-night-ink/60">{cs.role}</span>
          </div>
          <Link
            href={`/work/${cs.slug}`}
            className="group relative shrink-0 rounded-full bg-night-ink px-5 py-2.5 text-sm font-medium text-night transition-colors hover:bg-white"
          >
            View case study →
            <GlowBorder />
          </Link>
        </div>
        <h2 className="display mt-3 font-bold text-[clamp(1.6rem,2.6vw,2.5rem)] lg:whitespace-nowrap">
          {cs.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-night-ink/85 md:text-lg">
          {cs.subheading}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="meta mr-2 text-night-ink/45">Outcomes</span>
          {cs.proof.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-night-ink/90 md:text-base"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-2xl">
        <div className="marquee-track flex h-full w-max">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex h-full items-stretch gap-5 pr-5"
            >
              {itemsForCase(cs.slug).map((item, i) =>
                item.kind === "image" ? (
                  <ImagePanel key={i} src={item.src} alt={item.alt} />
                ) : (
                  <div key={i} className={`h-full shrink-0 ${item.aspect}`}>
                    <item.Panel tone={cs.tone} />
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function CaseStack() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".case-card");

      cards.forEach((card, i) => {
        // Pin each card at a slightly deeper offset; later cards slide over
        // earlier ones (pinSpacing off keeps the document flow compact).
        ScrollTrigger.create({
          trigger: card,
          start: () => `top ${PIN_TOP + i * STACK_GAP}px`,
          endTrigger: container.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });
      });

      // Slow right-to-left conveyor. Each track holds two identical
      // sequences (each with trailing padding), so 0 → -50% loops seamlessly.
      gsap.utils.toArray<HTMLElement>(".marquee-track").forEach((track) => {
        gsap.fromTo(
          track,
          { xPercent: 0 },
          { xPercent: -50, duration: MARQUEE_DURATION, ease: "none", repeat: -1 },
        );
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      aria-label="Selected case studies"
      className="relative px-4 pb-[14vh] md:px-8"
    >
      <div className="flex flex-col gap-[9vh]">
        {mainCases.map((cs, i) => (
          <CaseCard key={cs.slug} cs={cs} index={i} />
        ))}
      </div>
    </section>
  );
}

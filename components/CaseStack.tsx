"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { mainCases, type CaseStudy } from "@/lib/content";
import { GlowBorder } from "./GlowBorder";
import { CanvaChatHero } from "./case/CanvaChatHero";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PIN_TOP = 84;
const STACK_GAP = 16;
const MARQUEE_DURATION = 180;
const PARALLAX_X = 32;
/* The media well owns height (flex-1 + min-h-0). Slide width is 8/5 of
   that well height via 100cqh, so image files cannot change the box. */
const SLIDE_BOX =
  "relative h-full w-[calc(100cqh*8/5)] shrink-0 self-stretch overflow-hidden rounded-none";

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
    <div className="h-full w-full rounded-none bg-white p-5">
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
    <div className="flex h-full w-full flex-col justify-end gap-3 rounded-none bg-white p-5">
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
    <div className="flex h-full w-full flex-col gap-3 rounded-none bg-white p-4">
      <div className="h-6 w-16 rounded-full" style={{ background: tone, opacity: 0.5 }} />
      <SkeletonLines tone={tone} rows={3} />
    </div>
  );
}

function ImagePanel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={SLIDE_BOX}>
      {/* Fill the well box. Height never comes from the file. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 block h-full w-full max-h-none max-w-none rounded-none object-cover object-left-top"
      />
    </div>
  );
}

type PanelItem = {
  kind: "panel";
  Panel: typeof BrowserPanel;
};

type ImageItem = {
  kind: "image";
  src: string;
  alt: string;
};

type CarouselItem = PanelItem | ImageItem;

/* One seamless-loop sequence of carousel items; rendered twice for the marquee. */
const placeholderItems: CarouselItem[] = [
  { kind: "panel", Panel: BrowserPanel },
  { kind: "panel", Panel: ChatPanel },
  { kind: "panel", Panel: ChipPanel },
];

const securityInJiraItems: CarouselItem[] = [
  {
    kind: "image",
    src: "/work/security-in-jira/hero-home.png",
    alt: "Jira Security setup state. Connect your tools to manage security work in one place.",
  },
  {
    kind: "image",
    src: "/work/security-in-jira/hero-home-2.png",
    alt: "Jira Security for the Beyond Gravity project, with a vulnerabilities table.",
  },
];

const smartDevopsItems: CarouselItem[] = [
  {
    kind: "image",
    src: "/work/smart-devops/hero-home.png",
    alt: "Jira board with a pull request hover card on an issue",
  },
  {
    kind: "image",
    src: "/work/smart-devops/hero-home-2.png",
    alt: "Jira board grouped by pull request status into swimlanes",
  },
];

const pipelinesVisionItems: CarouselItem[] = [
  {
    kind: "image",
    src: "/work/pipelines-vision/hero-home.png",
    alt: "Vision for a collaborative drag and drop pipeline builder",
  },
  {
    kind: "image",
    src: "/work/pipelines-vision/hero-home-2.png",
    alt: "Workshop journey mapping across merge, build, test, and deploy",
  },
];

function itemsForCase(slug: string): CarouselItem[] {
  if (slug === "security-in-jira") return securityInJiraItems;
  if (slug === "smart-devops") return smartDevopsItems;
  if (slug === "pipelines-vision") return pipelinesVisionItems;
  return placeholderItems;
}

function CaseCard({ cs, index }: { cs: CaseStudy; index: number }) {
  return (
    <article
      className="case-card relative mx-auto h-[82svh] w-full max-w-[1600px] overflow-hidden rounded-3xl border border-white/10 bg-[#1c1b18]/90 text-night-ink backdrop-blur-md shadow-[0_-12px_60px_rgba(0,0,0,0.5)]"
      style={{ zIndex: index + 1 }}
    >
      <Link
        href={`/work/${cs.slug}`}
        aria-label={`View ${cs.heading} case study`}
        className="flex h-full min-h-0 flex-col text-inherit no-underline"
      >
        <div className="flex flex-col px-6 pb-5 pt-6 md:px-9 md:pb-6 md:pt-9">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="meta text-night-ink/45">Project {index + 1}</span>
            <span className="text-night-ink/45">·</span>
            <span className="text-sm text-night-ink/60">{cs.role}</span>
          </div>
          <h2 className="display mt-3 font-bold text-[clamp(1.6rem,2.6vw,2.5rem)] lg:whitespace-nowrap">
            {cs.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-night-ink/85 md:text-lg">
            {cs.subheading}
          </p>
          <span className="btn-chip group mt-5 inline-flex w-full items-center justify-center px-5 py-3.5 leading-none md:w-auto md:self-end">
            View case study
            <span aria-hidden className="ml-1 inline-block translate-y-px">
              →
            </span>
            <GlowBorder />
          </span>
        </div>

        {cs.slug === "canva-ai" ? (
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-none [container-type:size]">
            <div className="marquee-parallax h-full min-h-0 will-change-transform [transform:translate3d(0,0,0)]">
              {/* Same 8/5 slide math as the image wells. Grows to the card
                 width when the leftover well is wider than 8/5. */}
              <div className="absolute inset-y-0 left-0 h-full w-[max(100%,calc(100cqh*8/5))] overflow-hidden rounded-none">
                <CanvaChatHero variant="home" />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative min-h-0 flex-1 overflow-hidden [container-type:size]">
            <div className="marquee-parallax h-full min-h-0 will-change-transform [transform:translate3d(0,0,0)]">
              <div className="marquee-track flex h-full w-max items-stretch">
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
                        <div key={i} className={SLIDE_BOX}>
                          <item.Panel tone={cs.tone} />
                        </div>
                      ),
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Link>
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
        // anticipatePin engages the pin slightly early based on scroll
        // velocity: without it a fast scroll carries the card past its
        // pin line for a frame and it visibly snaps back down.
        ScrollTrigger.create({
          trigger: card,
          start: () => `top ${PIN_TOP + i * STACK_GAP}px`,
          endTrigger: container.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });

      // Slow right-to-left conveyor. Each track holds two identical
      // sequences (each with trailing padding), so 0 → -50% loops seamlessly.
      gsap.utils.toArray<HTMLElement>(".marquee-track").forEach((track) => {
        gsap.fromTo(
          track,
          { xPercent: 0 },
          {
            xPercent: -50,
            duration: MARQUEE_DURATION,
            ease: "none",
            repeat: -1,
            force3D: true,
          },
        );
      });

      // Additive scroll offset on a wrapper so the RTL loop stays intact.
      // Scroll down eases the strip further left (travel direction).
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!reduceMotion) {
        cards.forEach((card) => {
          const layer = card.querySelector<HTMLElement>(".marquee-parallax");
          if (!layer) return;
          gsap.fromTo(
            layer,
            { x: PARALLAX_X },
            {
              x: -PARALLAX_X,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });
      }
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      aria-label="Selected case studies"
      // Bottom padding sets how long the completed stack stays pinned
      // before it releases: the last card only holds for ~(132px - 4vh)
      // plus this extra, so 20vh gives it a readable rest.
      className="relative px-4 pb-[20vh] md:px-8"
    >
      <div className="flex flex-col gap-[9vh]">
        {mainCases.map((cs, i) => (
          <CaseCard key={cs.slug} cs={cs} index={i} />
        ))}
      </div>
    </section>
  );
}

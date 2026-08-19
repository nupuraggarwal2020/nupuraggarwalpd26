"use client";

import { useState, type ReactNode } from "react";
import { GlowBorder } from "@/components/GlowBorder";

/**
 * A single collapsible row — used for process steps and asides.
 * Closed by default; the chevron rotates and the body animates open
 * via the grid-rows trick (no measured heights).
 */
export function Collapse({
  title,
  eyebrow,
  defaultOpen = false,
  children,
}: {
  title: string;
  eyebrow?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="flex items-baseline gap-3">
          {eyebrow && (
            <span className="meta shrink-0 text-night-ink/40">{eyebrow}</span>
          )}
          <span className="text-sm font-medium text-night-ink md:text-base">
            {title}
          </span>
        </span>
        <span className="btn-icon h-9 w-9">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden
            className={`transition-transform duration-300 motion-reduce:transition-none ${
              open ? "rotate-180" : ""
            }`}
          >
            <path d="M2.5 5l4.5 4.5L11.5 5" />
          </svg>
          <GlowBorder />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-sm leading-relaxed text-night-ink/70">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

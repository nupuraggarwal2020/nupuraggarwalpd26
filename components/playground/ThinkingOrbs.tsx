"use client";

import { useEffect, useRef } from "react";
import { thinkingOrbs, type ThinkingOrbState } from "@/lib/thinking-orbs";

const orbStates: { state: ThinkingOrbState; label: string }[] = [
  { state: "working", label: "Working" },
  { state: "searching", label: "Searching" },
  { state: "solving", label: "Solving" },
  { state: "listening", label: "Listening" },
  { state: "composing", label: "Composing" },
  { state: "shaping", label: "Shaping" },
];

/**
 * The six agent states of the Thinking Orbs canvas animation, shown live
 * inside the playground card. The site body is always night, so the orbs
 * are pinned to the dark theme instead of the system preference.
 */
export function ThinkingOrbs() {
  const scopeRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!scopeRef.current) return;
    return thinkingOrbs(scopeRef.current);
  }, []);

  return (
    <ul
      ref={scopeRef}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
    >
      {orbStates.map(({ state, label }) => (
        <li
          key={state}
          className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-night/40 px-4 pt-9 pb-6"
        >
          <canvas
            data-thinking-orb
            data-orb-state={state}
            data-orb-size="64"
            data-orb-theme="dark"
            aria-label={`Agent state: ${label}`}
          />
          <span className="meta text-night-ink/60">{label}</span>
        </li>
      ))}
    </ul>
  );
}

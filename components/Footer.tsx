"use client";

import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import confetti from "canvas-confetti";
import { email, instagram, linkedin } from "@/lib/content";
import { GlowBorder } from "./GlowBorder";
import { Logo, LOGO_MASK } from "./Logo";

gsap.registerPlugin(useGSAP);

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
    >
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.1" cy="6.9" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer({ quiet }: { quiet?: boolean } = {}) {
  const pathname = usePathname();
  const isQuiet =
    quiet ?? (pathname === "/about" || pathname === "/playground");
  const footerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);
  const moveTo = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(
    null,
  );

  // Cursor-reactive logo (replaces the old dot grid): a conic gradient
  // clipped to the mark's shape whose angle tracks the cursor's direction
  // from the logo and whose strength ramps up with proximity.
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const flowTo = useRef<{
    angle: (v: number) => void;
    glow: (v: number) => void;
  } | null>(null);
  const flowAngle = useRef(0);

  useGSAP(
    () => {
      if (isQuiet) return;

      if (pillRef.current) {
        moveTo.current = {
          x: gsap.quickTo(pillRef.current, "x", { duration: 0.3, ease: "power3.out" }),
          y: gsap.quickTo(pillRef.current, "y", { duration: 0.3, ease: "power3.out" }),
        };
      }

      const wrap = logoWrapRef.current;
      if (wrap) {
        const state = { angle: 0, glow: 0 };
        const apply = () => {
          wrap.style.setProperty("--flow-angle", `${state.angle}deg`);
          wrap.style.setProperty("--flow-glow", `${state.glow}`);
        };
        flowTo.current = {
          angle: gsap.quickTo(state, "angle", {
            duration: 0.7,
            ease: "power2.out",
            onUpdate: apply,
          }),
          glow: gsap.quickTo(state, "glow", {
            duration: 0.45,
            ease: "power2.out",
            onUpdate: apply,
          }),
        };
      }
    },
    { scope: footerRef, dependencies: [isQuiet] },
  );

  function showPill() {
    if (pillRef.current) pillRef.current.style.opacity = "1";
  }

  function hidePill() {
    if (pillRef.current) pillRef.current.style.opacity = "0";
    flowTo.current?.glow(0);
  }

  function onMove(e: React.MouseEvent) {
    const rect = footerRef.current!.getBoundingClientRect();
    moveTo.current?.x(e.clientX - rect.left);
    moveTo.current?.y(e.clientY - rect.top);

    const wrap = logoWrapRef.current;
    if (wrap && flowTo.current) {
      const lb = wrap.getBoundingClientRect();
      const dx = e.clientX - (lb.left + lb.width / 2);
      const dy = e.clientY - (lb.top + lb.height / 2);
      // Unwrap atan2 so the gradient always rotates the short way round.
      const raw = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      const prev = flowAngle.current;
      const next = prev + ((((raw - prev) % 360) + 540) % 360) - 180;
      flowAngle.current = next;
      flowTo.current.angle(next);
      const prox = Math.max(0, 1 - Math.hypot(dx, dy) / 560);
      flowTo.current.glow(0.35 + 0.65 * prox);
    }
  }

  async function copyEmail(e: React.MouseEvent) {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      /* clipboard unavailable — the © line still shows the address */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    confetti({
      particleCount: 140,
      spread: 80,
      startVelocity: 42,
      origin: {
        // Keyboard-activated clicks report 0,0 — fall back to the footer area.
        x: (e.clientX || window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY || window.innerHeight * 0.8) / window.innerHeight,
      },
      // exact same palette as the button border-beam hover
      colors: ["#ffd21f", "#b8d94e", "#6fa8e8", "#9b83e8", "#f0964e"],
    });
  }

  return (
    <footer
      ref={footerRef}
      onClick={copyEmail}
      onMouseMove={isQuiet ? undefined : onMove}
      onMouseEnter={isQuiet ? undefined : showPill}
      onMouseLeave={isQuiet ? undefined : hidePill}
      className="fixed inset-x-0 bottom-0 z-0 flex h-[560px] cursor-pointer flex-col justify-between bg-night px-6 pt-20 pb-6 text-night-ink md:h-[600px] md:px-12"
    >
      <div className="flex items-start justify-between">
        <div>
          {/* Idle: calm ink mark. On cursor movement across the footer the
              conic gradient (beam palette) flows through the logo's shape. */}
          <div ref={logoWrapRef} aria-hidden className="relative w-max">
            <Logo className="h-14 w-auto text-night-ink/40" />
            {isQuiet ? null : (
              <span
                className="logo-flow"
                style={{ WebkitMaskImage: LOGO_MASK, maskImage: LOGO_MASK }}
              />
            )}
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-night-ink/70">
            Design, to me, is making the complicated feel obvious.
            <br />
            Open to product design roles. Please reach out to me anytime!
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn-icon group h-11 w-11"
            aria-label="Instagram"
          >
            <InstagramIcon />
            <GlowBorder />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn-icon group h-11 w-11 text-sm font-semibold"
            aria-label="LinkedIn"
          >
            in
            <GlowBorder />
          </a>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          className="display block w-full cursor-pointer text-center text-[clamp(3rem,11.5vw,10.5rem)] leading-none whitespace-nowrap text-night-ink"
          aria-label={`Copy email address ${email}`}
        >
          Nupur Aggarwal
        </button>
        <div className="mt-6 flex items-center justify-between text-xs text-night-ink/50">
          <span>© 2026 Nupur Aggarwal</span>
          <span aria-live="polite">{copied ? `${email} copied` : email}</span>
        </div>
      </div>

      {isQuiet ? null : (
        <span
          ref={pillRef}
          className="pointer-events-none absolute top-0 left-0 z-10 rounded-full bg-night-ink px-4 py-2 text-sm font-semibold whitespace-nowrap text-night shadow-lg"
          style={{
            opacity: 0,
            translate: "-50% -130%",
          }}
        >
          {copied ? "Copied! ✓" : "Click to copy email"}
        </span>
      )}
    </footer>
  );
}

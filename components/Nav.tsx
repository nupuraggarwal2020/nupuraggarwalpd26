"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { GlowBorder } from "./GlowBorder";

// Must match PIN_TOP in CaseStack.tsx: the first card is "fully in view"
// when its top sits 84px below the viewport top (its ScrollTrigger start).
const PIN_TOP = 84;

function scrollToFirstCase() {
  const card = document.querySelector<HTMLElement>(".case-card");
  if (!card) return;
  // pinSpacing: false keeps the first card's natural document position
  // intact before it pins, so its rect + scrollY is a reliable target.
  const top = card.getBoundingClientRect().top + window.scrollY - PIN_TOP;
  window.scrollTo({ top, behavior: "smooth" });
}

// Header hides once the user has scrolled down past HIDE_AFTER, reappears on
// a clear upward scroll, and is always visible above ALWAYS_SHOW_BELOW.
// DIRECTION_DELTA is hysteresis: 1px jitter (font load, accordion, scroll
// anchoring, overlay) must not flip the header.
const HIDE_AFTER = 120;
const ALWAYS_SHOW_BELOW = 80;
const DIRECTION_DELTA = 16;
const MIN_SCROLLABLE = 240;

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onAbout = pathname === "/about";
  const [hidden, setHidden] = useState(false);

  // About is a short sheet over a 560px curtain footer. Do not attach a
  // scroll listener there: leftover scrollY plus hide classes will flash
  // the header. Snap to the top so the curtain is not in view on arrival.
  useEffect(() => {
    if (onAbout) {
      const root = document.documentElement;
      root.dataset.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      return () => {
        root.dataset.scrollBehavior = "smooth";
      };
    }

    setHidden(false);

    let lastY = window.scrollY;
    let accumulated = 0;
    let ticking = false;
    let frame = 0;

    const update = () => {
      ticking = false;
      const y = Math.max(0, window.scrollY);
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const delta = y - lastY;
      lastY = y;

      // Short pages sit near the hide threshold. Hiding there oscillates.
      if (scrollable < MIN_SCROLLABLE || y < ALWAYS_SHOW_BELOW) {
        accumulated = 0;
        setHidden((was) => (was ? false : was));
        return;
      }

      if ((delta > 0 && accumulated < 0) || (delta < 0 && accumulated > 0)) {
        accumulated = 0;
      }
      accumulated += delta;

      if (accumulated > DIRECTION_DELTA && y > HIDE_AFTER) {
        setHidden((was) => (was ? was : true));
        accumulated = 0;
      } else if (accumulated < -DIRECTION_DELTA) {
        setHidden((was) => (was ? false : was));
        accumulated = 0;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        frame = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [onAbout]);

  // Shared by both fixed header elements so they move as one unit. About
  // stays static: no hide classes, no transform transition. With reduced
  // motion the header simply stays put on other routes too.
  const isHidden = hidden && !onAbout;
  const hideClass = isHidden
    ? "pointer-events-none -translate-y-[150%] motion-reduce:pointer-events-auto motion-reduce:translate-y-0"
    : "translate-y-0";
  const headerMotion = onAbout
    ? ""
    : `transition-transform duration-300 ease-out motion-reduce:transition-none ${hideClass}`;

  // Cross-route case: arriving at /#work from another page, scroll to the
  // first case card once the homepage has mounted.
  useEffect(() => {
    if (onHome && window.location.hash === "#work") {
      const raf = requestAnimationFrame(scrollToFirstCase);
      return () => cancelAnimationFrame(raf);
    }
  }, [onHome]);

  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onHome) {
      e.preventDefault();
      scrollToFirstCase();
    }
  };

  // Already on the homepage: a Link to "/" wouldn't move the page, so
  // scroll back to the top instead.
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // One header row so the mark and the pills share a height and a
  // vertical center. pointer-events stay off on the bar so clicks in
  // the gap reach the page. Children turn them back on when visible.
  const chromeEvents = isHidden ? "" : "pointer-events-auto";

  return (
    <header
      className={`pointer-events-none fixed inset-x-6 top-5 z-50 flex h-12 items-center justify-between ${headerMotion}`}
    >
      <Link
        href="/"
        aria-label="Home"
        onClick={handleHomeClick}
        className={`group flex h-12 items-center gap-3 rounded-full p-1 sm:pr-4 ${
          onAbout ? "bg-night" : "bg-night/60 backdrop-blur-md"
        } ${chromeEvents}`}
      >
        <span className="btn-icon h-10 w-10">
          <Logo className="h-[18px] w-auto" />
          <GlowBorder />
        </span>
        <span className="hidden leading-tight sm:block">
          <span className="block text-sm font-bold text-night-ink">
            Nupur Aggarwal
          </span>
          <span className="block text-xs text-night-ink/60">
            Product Designer
          </span>
        </span>
      </Link>

      <nav
        className={`flex h-12 flex-nowrap items-center gap-1.5 sm:gap-2 ${chromeEvents}`}
      >
        <Link
          href="/#work"
          onClick={handleWorkClick}
          className="btn-chip group h-10 shrink-0 whitespace-nowrap px-3.5 sm:px-5"
        >
          Projects
          <GlowBorder />
        </Link>
        <Link
          href="/playground"
          aria-current={pathname === "/playground" ? "page" : undefined}
          className="btn-chip group h-10 shrink-0 whitespace-nowrap px-3.5 sm:px-5"
        >
          Playground
          <GlowBorder />
        </Link>
        <Link
          href="/about"
          aria-current={pathname === "/about" ? "page" : undefined}
          className="btn-chip group h-10 shrink-0 whitespace-nowrap px-3.5 sm:px-5"
        >
          About
          <GlowBorder />
        </Link>
      </nav>
    </header>
  );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TRANSITION_MS = 500;
const REDUCED_MS = 10;

function motionMs() {
  if (typeof window === "undefined") return TRANSITION_MS;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? REDUCED_MS
    : TRANSITION_MS;
}

function isModifiedClick(event: MouseEvent) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

function internalHref(anchor: HTMLAnchorElement): string | null {
  if (anchor.hasAttribute("download")) return null;
  const target = anchor.getAttribute("target");
  if (target && target !== "_self") return null;

  let url: URL;
  try {
    url = new URL(anchor.href);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin) return null;
  return `${url.pathname}${url.search}${url.hash}`;
}

function isSameDocument(href: string) {
  const next = new URL(href, window.location.href);
  return (
    next.pathname === window.location.pathname &&
    next.search === window.location.search
  );
}

export function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [displayed, setDisplayed] = useState(children);
  const [displayedPath, setDisplayedPath] = useState(pathname);
  const [animating, setAnimating] = useState(false);

  const childrenRef = useRef(children);
  const pathnameRef = useRef(pathname);
  const displayedPathRef = useRef(displayedPath);
  const routerRef = useRef(router);
  const pendingHref = useRef<string | null>(null);
  const leaving = useRef(false);
  const leaveTimer = useRef(0);
  const refreshTimer = useRef(0);

  childrenRef.current = children;
  pathnameRef.current = pathname;
  displayedPathRef.current = displayedPath;
  routerRef.current = router;

  function clearLeaveTimer() {
    if (leaveTimer.current) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = 0;
    }
  }

  function fadeIn() {
    leaving.current = false;
    pendingHref.current = null;
    setDisplayed(childrenRef.current);
    setDisplayedPath(pathnameRef.current);
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimating(false);
        if (refreshTimer.current) window.clearTimeout(refreshTimer.current);
        refreshTimer.current = window.setTimeout(() => {
          try {
            if (ScrollTrigger.getAll().length > 0) {
              ScrollTrigger.refresh();
            }
          } catch {
            /* ScrollTrigger is not active on this page */
          }
        }, motionMs());
      });
    });
  }

  function beginLeave(href: string) {
    pendingHref.current = href;
    if (leaving.current) return;
    leaving.current = true;
    setAnimating(true);
    clearLeaveTimer();
    leaveTimer.current = window.setTimeout(() => {
      const dest = pendingHref.current;
      if (dest) routerRef.current.push(dest, { scroll: false });
    }, motionMs());
  }

  useEffect(() => {
    if (pathname === displayedPathRef.current) return;

    clearLeaveTimer();
    if (pendingHref.current) {
      fadeIn();
      return;
    }

    // Back / forward, or a navigation we did not intercept.
    setAnimating(true);
    leaving.current = true;
    leaveTimer.current = window.setTimeout(fadeIn, motionMs());

    return () => clearLeaveTimer();
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (isModifiedClick(event)) return;
      const el = event.target;
      if (!(el instanceof Element)) return;
      const anchor = el.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = internalHref(anchor);
      if (!href || isSameDocument(href)) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      beginLeave(href);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearLeaveTimer();
      if (refreshTimer.current) window.clearTimeout(refreshTimer.current);
    };
    // Persistent layout: one interceptor for the session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={
        animating
          ? "page-fade is-animating relative z-10"
          : "page-fade relative z-10"
      }
      aria-busy={animating}
    >
      {displayed}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/**
 * Sticky mini table of contents for case study pages (desktop only).
 * Highlights the section currently in the reading band of the viewport.
 */
export function CaseToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A narrow band ~1/4 from the top decides the active section.
      { rootMargin: "-22% 0px -68% 0px" },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-28 hidden h-max flex-col items-start gap-3 lg:flex"
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={active === item.id ? "true" : undefined}
          className={`meta transition-colors ${
            active === item.id
              ? "text-night-ink underline underline-offset-4"
              : "text-night-ink/35 hover:text-night-ink/70"
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

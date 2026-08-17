import Link from "next/link";
import { moreProjects } from "@/lib/content";
import { GlowBorder } from "./GlowBorder";

export function MoreProjects() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 pb-32 md:px-8">
      <div className="group relative rounded-3xl">
        <details className="about-panel rounded-3xl border border-white/10 bg-[#1c1b18]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-6 py-5 select-none [&::-webkit-details-marker]:hidden md:px-8 md:py-6">
            <span className="display font-bold text-xl text-night-ink md:text-2xl">
              More projects
            </span>
            <span
              aria-hidden
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-night-ink/70 transition-transform duration-300 [details[open]_&]:rotate-45"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M7 1v12M1 7h12" />
              </svg>
            </span>
          </summary>
          <div className="px-6 pt-2 pb-8 md:px-8 md:pb-10">
            <p className="max-w-2xl text-sm leading-relaxed text-night-ink/60 md:text-base">
              A few more, from further back.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {moreProjects.map((p, i) => {
                const cardClass =
                  "relative flex flex-col rounded-3xl border border-white/10 bg-night/40 p-7 text-night-ink";

                const body = (
                  <>
                    <div className="mb-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="meta text-night-ink/45">
                        Project {i + 5}
                      </span>
                      <span className="text-night-ink/45">·</span>
                      <span className="text-xs text-night-ink/50">
                        {p.role}
                      </span>
                    </div>
                    <h3 className="display font-bold text-xl leading-snug md:text-2xl">
                      {p.heading}
                    </h3>
                    <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-night-ink/70">
                      {p.subheading}
                    </p>
                    <div className="mt-6 flex items-center justify-end">
                      {p.comingSoon ? (
                        <span className="cursor-default rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-night-ink/60">
                          Coming soon
                        </span>
                      ) : (
                        <span
                          aria-hidden
                          className="text-sm transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      )}
                    </div>
                  </>
                );

                if (p.comingSoon) {
                  return (
                    <article key={p.slug} className={cardClass}>
                      {body}
                    </article>
                  );
                }

                return (
                  <Link
                    key={p.slug}
                    href={`/work/${p.slug}`}
                    className={`group ${cardClass} transition-colors hover:bg-[#26241f]/90`}
                  >
                    <GlowBorder />
                    {body}
                  </Link>
                );
              })}
            </div>
          </div>
        </details>
        <GlowBorder />
      </div>
    </section>
  );
}

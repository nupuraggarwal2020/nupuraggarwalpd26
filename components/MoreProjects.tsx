import Link from "next/link";
import { moreProjects } from "@/lib/content";
import { GlowBorder } from "./GlowBorder";

export function MoreProjects() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 pb-32 md:px-8">
      <p className="meta text-faint">More projects</p>
      <h2 className="display mt-3 text-3xl md:text-4xl">
        A few more, from further back.
      </h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {moreProjects.map((p, i) => {
          const cardClass =
            "relative flex flex-col rounded-3xl border border-white/10 bg-[#1c1b18]/90 p-7 text-night-ink backdrop-blur-md";

          const body = (
            <>
              <div className="mb-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="meta text-night-ink/45">Project {i + 5}</span>
                <span className="text-night-ink/45">·</span>
                <span className="text-xs text-night-ink/50">{p.role}</span>
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
    </section>
  );
}

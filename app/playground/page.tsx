import type { Metadata } from "next";
import { ThinkingOrbs } from "@/components/playground/ThinkingOrbs";
import { TypeParticles } from "@/components/playground/TypeParticles";

export const metadata: Metadata = {
  title: "Playground · Nupur Aggarwal",
  description:
    "Small experiments with motion, canvas and interface craft.",
};

export default function PlaygroundPage() {
  return (
    <main className="relative z-10 mb-[560px] min-h-[calc(100svh+120px)] rounded-b-[48px] bg-night shadow-[0_24px_60px_rgba(0,0,0,0.6)] md:mb-[600px]">
        <section className="mx-auto max-w-5xl px-6 pt-40 pb-40 md:pt-48">
          <p className="meta text-night-ink/45">Playground</p>
          <h1 className="display mt-4 font-bold text-4xl md:text-5xl">
            Fun experiments with motion and code.
          </h1>
          <article className="mt-16 rounded-3xl border border-white/10 bg-[#1c1b18] p-6 md:p-8">
            <h2 className="display font-bold text-2xl text-night-ink md:text-3xl">
              Thinking
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-night-ink/70 md:text-base">
              Particle animations to show progress. Adapted from{" "}
              <a
                href="https://github.com/Jakubantalik/thinking-orbs"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-night-ink/30 underline-offset-4 transition-colors hover:text-night-ink hover:decoration-night-ink/60"
              >
                Thinking Orbs
              </a>{" "}
              by Jakub Antalik.
            </p>

            <div className="mt-8">
              <ThinkingOrbs />
            </div>

          </article>

          <article className="mt-8 rounded-3xl border border-white/10 bg-[#1c1b18] p-6 md:p-8">
            <h2 className="display font-bold text-2xl text-night-ink md:text-3xl">
              Scatter
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-night-ink/70 md:text-base">
              A word set in particles. Move your cursor fast across the
              letters to throw them everywhere.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-night/40">
              <TypeParticles />
            </div>
          </article>
        </section>
    </main>
  );
}

import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GlowBorder } from "@/components/GlowBorder";
import { email } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — Nupur Aggarwal",
};

type Row = {
  role: string;
  place: string;
  years: string;
};

const experience: Row[] = [
  { role: "Senior Product Designer", place: "Canva", years: "2024-Present" },
  { role: "Senior Product Designer", place: "Atlassian", years: "2022-2023" },
  { role: "Product Designer II", place: "Atlassian", years: "2021-2022" },
  { role: "Product Designer", place: "Atlassian", years: "2019-2021" },
  { role: "Product Designer", place: "Microsoft", years: "2017-2019" },
];

// TODO: replace with real education details
const education: Row[] = [
  { role: "Your degree here", place: "Your institution here", years: "Years" },
  { role: "Your degree here", place: "Your institution here", years: "Years" },
];

function RowGroup({ label, rows }: { label: string; rows: Row[] }) {
  return (
    <div>
      <p className="meta text-night-ink/45">{label}</p>
      <ul className="mt-3">
        {rows.map((row, i) => (
          <li
            key={`${label}-${i}-${row.role}-${row.years}`}
            className={`grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-0.5 py-4 md:grid-cols-[1.3fr_1fr_auto] ${
              i > 0 ? "border-t border-white/10" : ""
            }`}
          >
            <span className="font-medium text-night-ink">{row.role}</span>
            <span className="order-3 col-span-2 text-sm text-night-ink/60 md:order-none md:col-span-1 md:text-base">
              {row.place}
            </span>
            <span className="text-right text-sm text-night-ink/45">
              {row.years}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="about-page relative z-10 mb-[560px] min-h-[calc(100svh+120px)] overflow-x-hidden rounded-b-[48px] bg-night md:mb-[600px]">
        <section className="mx-auto max-w-3xl px-6 pt-40 pb-20 md:pt-48">
          <p className="meta text-night-ink/45">About</p>
          <h1 className="display mt-4 font-bold text-4xl md:text-5xl">
            Bringing opportunities to life and making things happen.
          </h1>

          <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-night-ink/80 md:text-lg">
            <p>
              My experience spans designing for SaaS, B2B, consumer and
              startups and growing into a multidisciplinary Design Lead,
              Product Designer, and AI Builder. I define design principles
              that meet business goals end-to-end, across every stage of
              maturity, from zero-to-one through to ecosystem strategy.
              Equally at home shaping what to build and how to build it.
            </p>
            <p>
              What drives me, deep down, is bringing delight and simplicity to
              create experiences for people. I have a background in fashion,
              interaction design, ergonomics and software technology and I
              love exploring the relationship between them. I&apos;m a strong
              believer in community and culture; both have shaped my
              professional development enormously.
            </p>
            <p>
              So while I work as a designer in technical spaces, for me
              it&apos;s really about bringing opportunities to life and making
              things happen. My core purpose as a designer is to deliver
              authentic, beautiful and human-centred experiences.
            </p>
            <p>
              Based in Sydney, Australia. I am open to opportunities
              worldwide, can work remotely and hybrid, and across geographies.
              Best way to reach me is on{" "}
              <a
                href={`mailto:${email}`}
                className="font-medium text-night-ink underline decoration-night-ink/30 underline-offset-4 transition-colors hover:decoration-night-ink"
              >
                {email}
              </a>
              .
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-40">
          <div className="group relative rounded-3xl">
            <details className="about-panel rounded-3xl border border-white/10 bg-[#1c1b18]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-6 py-5 select-none [&::-webkit-details-marker]:hidden md:px-8 md:py-6">
                <span className="display font-bold text-xl text-night-ink md:text-2xl">
                  Experience and education
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
              <div className="space-y-10 px-6 pt-2 pb-8 md:px-8 md:pb-10">
                <RowGroup label="Experience" rows={experience} />
                <RowGroup label="Education" rows={education} />
              </div>
            </details>
            <GlowBorder />
          </div>
        </section>
      </main>
      <Footer quiet />
    </>
  );
}

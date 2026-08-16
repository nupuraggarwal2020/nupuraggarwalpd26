import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getCase, mainCases, moreProjects } from "@/lib/content";

export function generateStaticParams() {
  return [...mainCases, ...moreProjects].map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const cs = getCase((await params).slug);
  if (!cs) return {};
  return {
    title: `${cs.heading} — Nupur Aggarwal`,
    description: cs.subheading,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const cs = getCase((await params).slug);
  if (!cs) notFound();

  return (
    <>
      <Nav />
      <main className="relative z-10 mb-[560px] rounded-b-[48px] bg-night md:mb-[600px]">
        <section className="mx-auto flex min-h-[80svh] max-w-4xl flex-col justify-center px-6 py-40">
          <p className="meta flex items-center gap-2 text-faint">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: cs.tone }}
            />
            Case study
          </p>
          <h1 className="display mt-4 text-4xl md:text-6xl">{cs.heading}</h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-night-ink/70">
            {cs.subheading}
          </p>
          <p className="mt-4 text-sm text-faint">{cs.role}</p>
          <p className="mt-12 leading-relaxed text-night-ink/70">
            The full case study is being written. If you&apos;d like the
            walkthrough sooner, the email in the footer works — say so.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block text-sm font-medium underline underline-offset-4"
          >
            ← Back to the work
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

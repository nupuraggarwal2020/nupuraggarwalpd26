import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GlowBorder } from "@/components/GlowBorder";
import { CaseToc, type TocItem } from "@/components/case/CaseToc";
import { Collapse } from "@/components/case/Collapse";
import { CaseCarousel } from "@/components/case/CaseCarousel";
import { Media } from "@/components/case/Media";
import { ProofPills } from "@/components/case/ProofPills";
import { mainCases } from "@/lib/content";

const cs = mainCases.find((c) => c.slug === "pipelines-vision")!;
const next = mainCases.find((c) => c.slug === "canva-ai")!;

export const metadata: Metadata = {
  title: `${cs.heading} · Nupur Aggarwal`,
  description: cs.subheading,
};

const TOC: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The problem" },
  { id: "research", label: "Workshops" },
  { id: "decisions", label: "Decisions made" },
  { id: "process", label: "Process" },
  { id: "outcome", label: "Outcome" },
  { id: "impact", label: "Impact" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-sm font-medium tracking-[0.08em] uppercase text-night-ink">
      {children}
    </h2>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-white/10 pt-10">
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-6 flex flex-col gap-8">{children}</div>
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-w-[640px] flex-col gap-4 leading-relaxed text-night-ink/75 [&_strong]:font-semibold [&_strong]:text-night-ink">
      {children}
    </div>
  );
}

function CollapseStack({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

function Labeled({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="meta text-night-ink/45">{label}</p>
      <div className="mt-1.5 flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function OutcomeCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <p className="meta" style={{ color: cs.tone }}>
        {eyebrow}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-night-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-night-ink/65">
        {children}
      </p>
    </div>
  );
}

function Stat({
  value,
  label,
  caption,
}: {
  value: string;
  label: string;
  caption: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <p className="meta text-night-ink/45">{label}</p>
      <p
        className="display mt-3 text-5xl md:text-6xl"
        style={{ color: cs.tone }}
      >
        {value}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-night-ink/65">
        {caption}
      </p>
    </div>
  );
}

function Decision({
  index,
  title,
  fig,
  figCaption,
  src,
  alt,
  children,
  compact,
}: {
  index: string;
  title: string;
  fig?: number;
  figCaption?: string;
  src?: string;
  alt?: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <article className="flex flex-col gap-6">
      <div>
        <p className="meta" style={{ color: cs.tone }}>
          Decision {index}
        </p>
        <h3 className="display mt-3 max-w-[640px] text-2xl md:text-3xl">
          {title}
        </h3>
      </div>
      <Prose>{children}</Prose>
      {src ? (
        <Media
          fig={fig}
          caption={figCaption}
          src={src}
          alt={alt}
          tint={cs.tint}
          tone={cs.tone}
          compact={compact}
        />
      ) : null}
    </article>
  );
}

export default function PipelinesVisionCaseStudy() {
  return (
    <>
      <Nav />
      <main className="relative z-10 mb-[560px] rounded-b-[48px] bg-night shadow-[0_24px_60px_rgba(0,0,0,0.6)] md:mb-[600px]">
        <header className="mx-auto max-w-5xl px-6 pt-36 pb-14 md:pt-44">
          <p className="meta flex items-center gap-2 text-faint">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: cs.tone }}
            />
            {cs.role}
          </p>
          <h1 className="display mt-5 max-w-3xl text-4xl md:text-6xl">
            {cs.heading}
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-night-ink/70 md:text-lg">
            {cs.subheading}
          </p>
          <ProofPills items={cs.proof} className="mt-8" />
        </header>

        <div className="mx-auto max-w-5xl px-6">
          <Media
            src="/work/pipelines-vision/hero.png"
            alt="Illustration of developers collaborating around a laptop, cloud, and code"
            tint={cs.tint}
            tone={cs.tone}
          />
        </div>

        <div className="mx-auto grid max-w-5xl gap-x-16 px-6 pt-16 pb-24 lg:grid-cols-[160px_1fr]">
          <CaseToc items={TOC} />

          <div className="flex min-w-0 flex-col gap-16">
            <section id="overview" className="scroll-mt-32">
              <SectionTitle>Overview</SectionTitle>
              <div className="mt-6 flex flex-col gap-8">
                <Prose>
                  <p>
                    In August 2021, I led a workshop with the Bitbucket team
                    in Sydney. The goal was to understand the challenges our
                    customers face with CI/CD management.
                  </p>
                  <p>
                    Bitbucket Pipelines is a CI/CD builder used by 10M+
                    developers monthly. This work was meant to spark
                    conversation on product strategy, roadmap, and future
                    envisioning. The goal was an actionable experience vision
                    that connected current work streams to where we were going.
                  </p>
                </Prose>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-6 md:grid-cols-4">
                  {[
                    ["Role", "Product Designer"],
                    ["Team", "Bitbucket Pipelines"],
                    ["Timeline", "August 2021"],
                    ["Status", "Vision and 18-month roadmap"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="meta text-night-ink/40">{k}</dt>
                      <dd className="mt-1.5 text-sm text-night-ink/85">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex max-w-[720px] flex-col gap-3">
                  <Collapse title="What I owned">
                    <CollapseStack>
                      <p>
                        Secondary research before the workshop. Two user
                        journeys with a small team. Design and facilitation of
                        the workshop. Refinement with the product manager and
                        the wider team. A road-show of the vision to get
                        buy-in and start roadmap talks.
                      </p>
                      <Labeled label="Key skills">
                        <p>
                          Strategy alignment, workshopping ideas,
                          cross-functional collaboration, design principles
                        </p>
                      </Labeled>
                    </CollapseStack>
                  </Collapse>
                  <Collapse title="Who I worked with">
                    <CollapseStack>
                      <p>
                        Designer, content designer, a team of 10 engineers, an
                        engineering manager, a product manager, a marketing
                        manager, and a support engineer. Later I worked on the
                        experience vision with other designers.
                      </p>
                    </CollapseStack>
                  </Collapse>
                </div>
              </div>
            </section>

            <Section id="problem" title="The problem">
              <Prose>
                <p>
                  There was no visualisation that connected the dots across
                  the multi-year strategy and the vision for Bitbucket. Teams,
                  stakeholders, and customers found it hard to grok what
                  Bitbucket Pipelines is, and to get excited about where we
                  were going.
                </p>
                <p>
                  Imagine a developer writing code. They push it to the cloud
                  to integrate it with the rest of the code. Every time they
                  push it, it is tested, verified, and integrated, then
                  delivered to customers. That is CI/CD. Bitbucket helps them
                  manage the code and the CI/CD flow.
                </p>
              </Prose>
              <ul className="flex max-w-[640px] flex-col gap-3">
                {[
                  [
                    "Communicate the strategy.",
                    "Clear, fun, easy to access, and memorable.",
                  ],
                  [
                    "Inspire the team.",
                    "Rally Bitbucket and wider Atlassian audiences.",
                  ],
                  [
                    "Bring customers along.",
                    "Excite customers and other stakeholders, and bring them on the journey.",
                  ],
                ].map(([head, body]) => (
                  <li
                    key={head}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-relaxed text-night-ink/70"
                  >
                    <strong className="font-semibold text-night-ink">
                      {head}
                    </strong>{" "}
                    {body}
                  </li>
                ))}
              </ul>
              <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
                {[
                  [
                    "Missing platform support",
                    "Teams choose their own infrastructure, language, OS, and architecture. Pipelines did not support popular use cases such as Windows, Buildkit, and macOS, or bring-your-own runners. Customers had to pick a competing product.",
                  ],
                  [
                    "Work spread across repositories",
                    "Many customers have one repository per service. They need to share code and pipelines so dependent services can work together. That needs automation between repositories.",
                  ],
                  [
                    "Need for visibility and insights",
                    "Customers monitor deployments across environments and microservices. A missing piece was a cross-project and cross-repository view of deployment status, so teams could decide on releases from insights instead of manual checks.",
                  ],
                  [
                    "Scalability for large teams",
                    "Quarterly reports showed adoption of Bitbucket Pipelines reducing in larger teams. We believed the main cause of churn was scalability limits. Mid-market and enterprise teams were moving to Bitbucket. Pipelines had to be ready.",
                  ],
                ].map(([head, body]) => (
                  <div key={head} className="bg-[#141310] p-6">
                    <h3 className="text-sm font-semibold text-night-ink">
                      {head}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-night-ink/65">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
              <Media
                fig={1}
                caption="Bitbucket navigation and team model. Workspaces contain projects. Projects contain repositories. Pipelines sits on the repository."
                src="/work/pipelines-vision/bitbucket-model.png"
                alt="Diagram of Bitbucket workspaces, projects, repositories, and feature tabs"
                tint={cs.tint}
                tone={cs.tone}
              />
            </Section>

            <Section id="research" title="Workshops">
              <Prose>
                <p>
                  I analysed 1000+ responses from a customer satisfaction
                  report and interviewed 8 participants. I shared a list of
                  problems with the workshop. Before the session, a small team
                  and I defined two unique user journeys, with challenges and
                  jobs to be done.
                </p>
              </Prose>
              <Media
                fig={2}
                caption="CI journey for Leah, the developer. Onstage actions, results, backstage work, and pain points."
                src="/work/pipelines-vision/journey-ci.jpg"
                alt="CI journey map for Leah the developer, with pain points along the build"
                tint={cs.tint}
                tone={cs.tone}
              />
              <Media
                fig={3}
                caption="CD journey for Tim, the orchestrator. Deployments at scale, with environments and release decisions."
                src="/work/pipelines-vision/journey-cd.jpg"
                alt="CD journey map for Tim the orchestrator"
                tint={cs.tint}
                tone={cs.tone}
              />
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Media
                    src="/work/pipelines-vision/persona-leah.png"
                    alt="Illustration of Leah, a developer, at a laptop"
                    tint={cs.tint}
                    tone={cs.tone}
                    caption="Leah, the end user. Developer at Acme Travel."
                  />
                </div>
                <div>
                  <Media
                    src="/work/pipelines-vision/persona-tim.png"
                    alt="Illustration of Tim, a DevOps engineer, at a workstation"
                    tint={cs.tint}
                    tone={cs.tone}
                    caption="Tim, the orchestrator. DevOps engineer at Acme Travel."
                  />
                </div>
              </div>
              <div className="flex max-w-[720px] flex-col gap-3">
                <Collapse eyebrow="01" title="Leah, the end user">
                  <CollapseStack>
                    <p>
                      Check automated testing and security scanning results
                      triggered from CI/CD pipelines.
                    </p>
                    <p>
                      Getting access to all of the team&apos;s tools when I
                      first join can be difficult.
                    </p>
                    <p>
                      It takes many conversations and much reading to
                      understand my team&apos;s toolchain and workflow.
                    </p>
                    <p>I don&apos;t know how the team is tracking.</p>
                  </CollapseStack>
                </Collapse>
                <Collapse eyebrow="02" title="Tim, the orchestrator">
                  <CollapseStack>
                    <p>
                      Builds the entire SDLC. Standardises, maintains, and
                      troubleshoots failing builds.
                    </p>
                    <p>
                      Works closely with development teams: advice, training,
                      and hands-on support.
                    </p>
                    <p>Keeping up with the growing scale of the organisation.</p>
                    <p>
                      Introduce change and make an adoptable CI/CD and
                      compliance process.
                    </p>
                  </CollapseStack>
                </Collapse>
              </div>
              <CaseCarousel
                fig={4}
                caption="In-person workshop in Sydney. Enterprise CI, deployments, journey mapping, and the room."
                tint={cs.tint}
                tone={cs.tone}
                slides={[
                  {
                    src: "/work/pipelines-vision/workshop-ci.png",
                    alt: "Whiteboard for Enterprise CI, with who, what, where, and why",
                  },
                  {
                    src: "/work/pipelines-vision/workshop-cd.png",
                    alt: "Glass wall workshop board for Deployments",
                  },
                  {
                    src: "/work/pipelines-vision/workshop-journey.png",
                    alt: "User journey mapping across merge, build, test, and deploy",
                  },
                  {
                    src: "/work/pipelines-vision/workshop-room.png",
                    alt: "Workshop participant mapping sticky notes on a glass wall",
                  },
                ]}
              />
            </Section>

            <Section id="decisions" title="Decisions made">
              <Prose>
                <p>
                  The vision: we help teams ship faster by building, testing
                  and deploying code in a flexible, reliable and easy way.
                </p>
                <p>
                  Design principles are directive, not prescriptive. They
                  speak to the what and why, not the how. When we had to make
                  tradeoffs, they kept us true to purpose.
                </p>
              </Prose>
              <div className="flex flex-col gap-16">
                <Decision
                  index="01"
                  title="Four principles for CI/CD in Bitbucket"
                >
                  <p>
                    How might we come out with principles that champion the
                    users we are designing for, yet still match Atlassian
                    values? We outlined the themes we believed were critical
                    to the future of CI/CD.
                  </p>
                </Decision>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                {[
                  [
                    "Flexible with customer software",
                    "People's working styles and the technologies they use will be more flexible. Choosing a different technology, or adapting software, helps our products serve customers from concept to completion.",
                  ],
                  [
                    "Enriched and actionable",
                    "We provide actionable insights for teams to make informed decisions. Teams do not rely on senior engineers to push a manual button. They feel confident to take action.",
                  ],
                  [
                    "Guide to mastery",
                    "Large teams will rely on pipelines to achieve more. We can help them move quicker if they have visibility, more control of users, and fewer limitations from the product.",
                  ],
                  [
                    "Collaboration over silos",
                    "By knowing the developers who use our CI/CD platform, we can provide collaboration. It should be immersive and participatory, with more human interaction. Use Atlassian's advantage for rich collaboration.",
                  ],
                ].map(([title, body]) => (
                  <div key={title}>
                    <h3 className="text-base font-semibold leading-snug text-night-ink">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-night-ink/55">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
              <Decision
                index="02"
                title="Design for two kinds of users"
              >
                <p>
                  End users and orchestrators. They may be on the same team
                  or different teams. In most experiences, the end users make
                  use of the system the orchestrators set up.
                </p>
              </Decision>
              <Decision
                index="03"
                title="An 18-month north star, not a committed backlog"
                fig={5}
                figCaption="Journey key points for handling deployments at scale: pages, system events, and actions."
                src="/work/pipelines-vision/journey-keys.png"
                alt="Journey cards for a cross-repository page, deployments dashboard, and environment view"
              >
                <p>
                  For CI and CD, we considered a multi-year strategy. The
                  next items were our vision for the next 18 months. This was
                  our north star, not a list of roadmapped items. The goal
                  was to motivate people to think about what they could do in
                  the future.
                </p>
              </Decision>
            </Section>

            <Section id="process" title="Process">
              <Prose>
                <p>
                  I ran a 2-day workshop after a stretch of research and
                  journey work. Day 1 was product vision and research. Day 2
                  was ideation. We split into two groups: CI and CD.
                </p>
              </Prose>
              <div className="flex max-w-[720px] flex-col gap-3">
                <Collapse eyebrow="01" title="Day 1: product vision and research">
                  <CollapseStack>
                    <p>
                      I presented past research and future goals. I looked at
                      competitive products and their differentiating features.
                    </p>
                    <p>
                      As a team, we came up with two problem statements for
                      the two feature teams. Then we split into two groups.
                      Group A was the CI journey. Group B was the CD journey.
                    </p>
                    <Labeled label="Activities">
                      <p>Review secondary research and competitive research in CI/CD</p>
                      <p>Form problem statements</p>
                      <p>
                        Map the current user experience across CI and CD.
                        Review opportunities and pain points for the key
                        persona.
                      </p>
                    </Labeled>
                  </CollapseStack>
                </Collapse>
                <Collapse eyebrow="02" title="Day 2: ideation">
                  <CollapseStack>
                    <p>Come up with a wide range of ideas, then theme them.</p>
                    <p>Prioritise the ideas on an urgency and impact graph.</p>
                    <p>
                      Storyboard the customer journey based on the voted
                      ideas.
                    </p>
                  </CollapseStack>
                </Collapse>
                <Collapse eyebrow="03" title="How might we fail">
                  <CollapseStack>
                    <p>
                      We did this at the end of ideation. It is a real insight
                      into what users see as success, and what they see as
                      failure. It lets users tell us what we need to consider
                      when we design a solution. Back in the office, it lets
                      us set success criteria so the solution meets those
                      expectations.
                    </p>
                  </CollapseStack>
                </Collapse>
              </div>
              <Media
                fig={6}
                caption="Storyboard snapshots from the room: multi-step deployments, services, and more complex workflows."
                src="/work/pipelines-vision/storyboards.png"
                alt="Four photos of hand-drawn storyboards for deployments and workflows"
                tint={cs.tint}
                tone={cs.tone}
              />
              <Media
                fig={7}
                caption="Build and test metrics on the table. Merge dialog and create issue on the right."
                src="/work/pipelines-vision/storyboard-metrics.png"
                alt="Workshop photos of build metrics sketches and a merge dialog storyboard"
                tint={cs.tint}
                tone={cs.tone}
              />
            </Section>

            <Section id="outcome" title="Outcome">
              <blockquote
                className="max-w-[640px] border-l-2 pl-6"
                style={{ borderColor: cs.tone }}
              >
                <p className="display text-xl leading-snug text-night-ink md:text-2xl">
                  We help teams ship faster by building, testing and deploying
                  code in a flexible, reliable and easy way.
                </p>
                <footer className="meta mt-3 text-faint">
                  Experience vision · Bitbucket Pipelines
                </footer>
              </blockquote>
              <Prose>
                <p>
                  We painted a picture of how the product could add value. A
                  few examples: contextual build metrics, automated
                  deployment checks, a collaborative pipeline builder, and
                  code insights that create action in Jira.
                </p>
              </Prose>
              <CaseCarousel
                fig={8}
                caption="Vision explorations: pipeline builder, code insights, artifacts, and pre-deployment checks."
                tint={cs.tint}
                tone={cs.tone}
                slides={[
                  {
                    src: "/work/pipelines-vision/vision-builder.png",
                    alt: "Drag and drop pipeline builder with Testing, Staging, and Production",
                  },
                  {
                    src: "/work/pipelines-vision/vision-insights.png",
                    alt: "Code insights table with severity, summary, and create issue",
                  },
                  {
                    src: "/work/pipelines-vision/vision-artifacts.png",
                    alt: "Artifacts table with health, description, and last updated",
                  },
                ]}
              />
              <Media
                fig={9}
                caption="Pre-deployment checks: change management, incidents, security, and verification."
                src="/work/pipelines-vision/vision-checks.png"
                alt="Pre deployment checks card with four completed checks"
                tint={cs.tint}
                tone={cs.tone}
                compact
                compactWidth={280}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <OutcomeCard eyebrow="Vision" title="A shared experience vision">
                  Principles and a painted picture that connected current
                  work streams to a multi-year direction for CI/CD.
                </OutcomeCard>
                <OutcomeCard eyebrow="Roadmap" title="An 18-month north star">
                  Engineering, product, and design aligned around a shared
                  18-month roadmap.
                </OutcomeCard>
                <OutcomeCard eyebrow="Onboarding" title="Time to first build">
                  A redesigned onboarding flow shipped across five versioned
                  releases, and reduced time-to-first-build by 40%.
                </OutcomeCard>
                <OutcomeCard eyebrow="Builder" title="Used every month">
                  Owned design for the Bitbucket Pipelines CI/CD builder used
                  by 10M+ developers monthly.
                </OutcomeCard>
              </div>
            </Section>

            <Section id="impact" title="Impact">
              <div className="grid gap-4 sm:grid-cols-2">
                <Stat
                  value="10M+"
                  label="Developers monthly"
                  caption="Bitbucket Pipelines CI/CD builder used by 10M+ developers monthly."
                />
                <Stat
                  value="40%"
                  label="Time to first build"
                  caption="Reduced time-to-first-build by 40% through a redesigned onboarding flow shipped across five versioned releases."
                />
                <Stat
                  value="18 mo"
                  label="Shared roadmap"
                  caption="Vision workshops aligned engineering, product, and design around a shared 18-month roadmap."
                />
                <Stat
                  value="2-day"
                  label="Workshop"
                  caption="A 2-day in-person workshop in Sydney, after research and journey work, set the experience vision and design principles."
                />
              </div>
              <div className="flex max-w-[720px] flex-col gap-3">
                <Collapse title="Closing notes">
                  <CollapseStack>
                    <p>
                      The project was a cross-collaboration between design,
                      product, and developers from the Bitbucket team. It had
                      a strong effect on team planning and execution. I had a
                      good time organising the in-person workshop and getting
                      the team on the same page.
                    </p>
                    <p>
                      As a next phase, it was worthwhile to create an
                      end-to-end journey and to run tests with the proposed
                      designs. I heard positive feedback for many of them.
                      They were mapped into the product roadmap and published
                      online.
                    </p>
                    <p>
                      This workshop was confidential. This write-up covers
                      the approach. It skips strategic decisions that were
                      made. Illustrations are original, made by me.
                    </p>
                  </CollapseStack>
                </Collapse>
              </div>
            </Section>

            <Link
              href={`/work/${next.slug}`}
              className="group relative mt-4 flex flex-col rounded-3xl border border-white/10 bg-[#1c1b18]/90 p-8 transition-colors hover:bg-[#26241f]/90"
            >
              <GlowBorder />
              <span className="meta flex items-center gap-2 text-night-ink/45">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: next.tone }}
                />
                Next case study
              </span>
              <span className="display mt-3 text-2xl md:text-3xl">
                {next.heading}
              </span>
              <span className="mt-4 flex items-center justify-between text-sm text-night-ink/60">
                {next.role}
                <span
                  aria-hidden
                  className="text-base transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

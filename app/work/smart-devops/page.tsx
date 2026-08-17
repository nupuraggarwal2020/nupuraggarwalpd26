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

const cs = mainCases.find((c) => c.slug === "smart-devops")!;
const next = mainCases.find((c) => c.slug === "pipelines-vision")!;

export const metadata: Metadata = {
  title: `${cs.heading} · Nupur Aggarwal`,
  description: cs.subheading,
};

const TOC: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The problem" },
  { id: "research", label: "Research" },
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

function FindingRow({
  kind,
  children,
}: {
  kind: "positive" | "negative";
  children: React.ReactNode;
}) {
  const positive = kind === "positive";
  const color = positive ? "#8fae8c" : "#c48b84";
  const fill = positive
    ? "rgba(143, 174, 140, 0.14)"
    : "rgba(196, 139, 132, 0.14)";

  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={{ color, background: fill }}
        aria-hidden
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          {positive ? (
            <path
              d="M2.5 6.2L4.8 8.5L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <>
              <path
                d="M3.5 3.5L8.5 8.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M8.5 3.5L3.5 8.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </span>
      <p className="leading-relaxed text-night-ink/80">{children}</p>
    </li>
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
  compactWidth,
  pad,
  outline,
}: {
  index: string;
  title: string;
  fig?: number;
  figCaption?: string;
  src?: string;
  alt?: string;
  children: React.ReactNode;
  compact?: boolean;
  compactWidth?: number;
  pad?: string;
  outline?: false;
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
          tint={pad ?? cs.tint}
          tone={cs.tone}
          compact={compact}
          compactWidth={compactWidth}
          outline={outline}
          framed={outline === false ? false : undefined}
        />
      ) : null}
    </article>
  );
}

export default function SmartDevopsCaseStudy() {
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
            src="/work/smart-devops/hero.png"
            alt="Jira board with a pull request hover card on an issue"
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
                    If you&apos;ve used Jira, you probably know it as an
                    industry-leading product for software teams to plan and
                    track work. In this role, I look at it as the backbone of
                    their toolchain, and I seek ways to help them use
                    integrations and data connections to collaborate better,
                    and ship value quicker.
                  </p>
                  <p>
                    In this project, I had the opportunity to design for
                    developers to increase the visibility of work and reduce
                    context switching. There are 3 designed experiences that
                    were shipped.
                  </p>
                </Prose>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Media
                    src="/work/smart-devops/overview-swimlanes.png"
                    alt="Code review swimlanes on a Jira board"
                    caption="A. Code review swimlanes"
                    tint={cs.tint}
                    tone={cs.tone}
                  />
                  <Media
                    src="/work/smart-devops/overview-hover.png"
                    alt="Smart hover card experiences on a Jira board"
                    caption="B. Smart hover card experiences"
                    tint={cs.tint}
                    tone={cs.tone}
                  />
                  <Media
                    src="/work/smart-devops/overview-index.png"
                    alt="An index of work for code review"
                    caption="C. An index of work"
                    tint={cs.tint}
                    tone={cs.tone}
                  />
                </div>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-6 md:grid-cols-4">
                  {[
                    ["Role", "Leading design for DevOps experiences"],
                    ["Team", "Multiple product teams"],
                    ["Started", "January 2022"],
                    ["Status", "3 experiences shipped"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="meta text-night-ink/40">{k}</dt>
                      <dd className="mt-1.5 text-sm text-night-ink/85">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex max-w-[720px] flex-col gap-3">
                  <Collapse title="Intention">
                    I think of developer experiences as a core part of a
                    developer&apos;s life. I believe that they should have
                    at-par experiences at their place of work as they do in
                    their personal life. Enterprise tools should consider
                    their experiences outside of work, like making a booking
                    with Airbnb, and emulate a similar feeling of delight and
                    satisfaction. The tools should make them feel empowered,
                    effective and collaborative. Ideally, to help developers
                    switch off from work and reduce stress.
                  </Collapse>
                  <Collapse title="What I owned">
                    <CollapseStack>
                      <p>
                        I&apos;ve been leading design for DevOps experiences
                        in Atlassian Agile and DevOps team since January 2022.
                        I&apos;ve been collaborating closely with researchers
                        to come up with and execute a research plan for
                        exploratory and usability research at the beginning
                        and end of the project.
                      </p>
                      <p>
                        At a strategic level, I&apos;ve been working closely
                        with the PM and data scientists to scope problems and
                        potential areas for lighting up experiences. I&apos;m
                        deeply involved in the design which includes defining
                        aspects like what data to show and how to show it.
                      </p>
                      <p>
                        From an execution perspective, I&apos;ve been planning
                        and prioritizing deliverables. I&apos;ve created
                        end-to-end UI specs with inputs from UX writers,
                        handed them off to engineers and ensured the fit and
                        finish of the developed bits.
                      </p>
                      <Labeled label="Key skills and outcomes of this project">
                        <p>
                          End-to-end design exploration and implementation,
                          Cross-team collaboration, Attention to details
                        </p>
                      </Labeled>
                    </CollapseStack>
                  </Collapse>
                  <Collapse title="Who I worked with">
                    DevOps experiences for developers is an ongoing effort
                    running in tight collaboration with members from multiple
                    product teams and multiple disciplines: engineers, product
                    managers, UX writers, designers, UX researchers and data
                    scientists.
                  </Collapse>
                </div>
              </div>
            </section>

            <Section id="problem" title="The problem">
              <Prose>
                <p>
                  Across the industry, development (dev) and operations (ops)
                  teams are working closer than ever before to build and run
                  software together. However, their toolchains are fragmented
                  causing a lack of visibility &amp; control. This is happening
                  as businesses seek greater agility and velocity in order to
                  address ever-increasing customer demands and competitive
                  threats.
                </p>
                <p>
                  Our customers across all industries are looking for
                  solutions that help them to consistently ship higher quality
                  software, faster. For many teams, DevOps practices have
                  become a valuable approach to achieving this outcome.
                </p>
              </Prose>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm font-semibold text-night-ink">
                  DevOps is a culture, a movement, a philosophy.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-night-ink/65">
                  The concept of DevOps is founded on building a culture of
                  collaboration between teams that historically functioned in
                  relative silos. DevOps is a set of practices that helps
                  automate the processes between software development and IT
                  teams in order that they can build, test, and release
                  software faster and more reliably.
                </p>
              </div>
              <Prose>
                <p>
                  Atlassian offers tools out-of-the-box, for the whole team,
                  like Jira Software, Bitbucket, OpsGenie and confluence. They
                  also allow third-party tools like Github, Gitlab,
                  ServiceNow, Slack, AWS, Jenkins etc. to plug and play into
                  the products.
                </p>
              </Prose>
              <Media
                fig={1}
                caption="The Atlassian tools are interspersed with 2P and 3P tools to complete the DevOps toolchain."
                src="/work/smart-devops/toolchain.png"
                alt="Atlassian tools next to GitLab, Slack, ServiceNow, AWS, and Jenkins"
                tint={cs.tint}
                tone={cs.tone}
              />
              <div>
                <h3 className="display max-w-[640px] text-2xl md:text-3xl">
                  Why on the board?
                </h3>
                <p className="mt-4 max-w-[640px] leading-relaxed text-night-ink/75">
                  Developers and dev teams have processes for code
                  development, testing, peer reviews and deploying software to
                  their customers. As Jira is a task management board, they
                  can see how the work is progressing but can sometimes miss
                  what&apos;s happening on the codebase. The code pull request
                  may be in review but the team members cannot grok that from
                  the board and its columns unless they check the issues
                  manually.
                </p>
              </div>
              <blockquote
                className="max-w-[640px] border-l-2 pl-6"
                style={{ borderColor: cs.tone }}
              >
                <p className="display text-xl leading-snug text-night-ink md:text-2xl">
                  Sometimes I&apos;m busy and other people do code reviews and
                  merge without me. But I do want to take a look at what they
                  did there.
                </p>
              </blockquote>
              <Prose>
                <p>
                  This is an example of the Jira board with the columns and
                  work progressing across the columns in the form of Issues.
                  &ldquo;Issues&rdquo; are a ticket that contains a unit of
                  work, that is broken down into tasks or subtasks. A
                  developer typically assigns themselves to an issue and works
                  on it until it&apos;s done.
                </p>
              </Prose>
              <Media
                fig={2}
                caption="A typical Jira scrum board with issues in the to do, progress, review and done columns."
                src="/work/smart-devops/board.png"
                alt="Typical Jira scrum board with To Do, In Progress, In Review, and Done columns"
                tint={cs.tint}
                tone={cs.tone}
              />
            </Section>

            <Section id="research" title="Research">
              <Prose>
                <p>
                  I&apos;ve identified 4 parts of the DevOps toolchain:
                  Installation, Configuration, Connection and Usage.
                </p>
                <p>
                  Showing contextual insights and smart information wherever
                  possible can help reduce context switching and focus on the
                  task at hand.
                </p>
              </Prose>
              <div className="flex max-w-[720px] flex-col gap-3">
                <Collapse eyebrow="01" title="Installation">
                  <CollapseStack>
                    <p>
                      Teams can focus on building and operating software while
                      Open DevOps integrates Atlassian and partner tools
                      automatically. Bring your existing tools or swap out our
                      tools with just a few clicks.
                    </p>
                    <p>
                      Users need to stay on top of code and processes
                      originating from multiple sources by visiting the
                      different sources, so Atlassian provides a control
                      centre to developers and supervisors.
                    </p>
                  </CollapseStack>
                </Collapse>
                <Collapse eyebrow="02" title="Configuration and connection">
                  <CollapseStack>
                    <p>
                      This is the process of allowing the third-party tools to
                      share and connect with Jira and start sending any
                      development data by making a connection from the Jira
                      issue to their development data.
                    </p>
                    <p>
                      This is done by including a Jira issue key anywhere in a
                      commit message, pull request or a CI/CD build.
                    </p>
                  </CollapseStack>
                </Collapse>
                <Collapse eyebrow="03" title="Usage">
                  <CollapseStack>
                    <p>
                      Having all the data creates experiences that increase
                      the productivity of developers and supervisors. It
                      creates smart, meaningful experiences by using the data
                      and provides insights to the users on their development
                      work. This is the most creative part of the journey, and
                      what my role mostly focuses on.
                    </p>
                    <Labeled label="Research observation">
                      <p>
                        Users often look for useful insights into how their
                        team is doing. They want to associate work done with
                        people on their team and help unblock any work.
                      </p>
                    </Labeled>
                  </CollapseStack>
                </Collapse>
                <Collapse eyebrow="04" title="What do they need to see?">
                  This is a table I made for the types of data they&apos;d
                  like to see in the context of the board. This was based on a
                  card-sorting exercise done with representative users.
                </Collapse>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="meta" style={{ color: cs.tone }}>
                  The goal
                </p>
                <p className="mt-3 max-w-[640px] leading-relaxed text-night-ink/80">
                  By providing more relevant information to our primary
                  persona, the Supervisor/Team Lead, we believe they will have
                  a better pulse on their team&apos;s work and clear options
                  to take action to move their team&apos;s work forward.
                </p>
              </div>
              <blockquote
                className="max-w-[640px] border-l-2 pl-6"
                style={{ borderColor: cs.tone }}
              >
                <p className="display text-xl leading-snug text-night-ink md:text-2xl">
                  Participants find a lot of value from being able to see
                  which pull requests have been merged, and what issues have
                  been deployed. Their current process for doing that takes
                  many steps, across multiple products, but having a single
                  location would streamline that process.
                </p>
              </blockquote>
            </Section>

            <Section id="decisions" title="Decisions made">
              <Prose>
                <p>
                  While reviewing the above journey, I did a workshop with
                  multiple stakeholders to answer a gnarly problem: How might
                  we help users on every part of the journey?
                </p>
                <p>
                  After a series of usability testing, I was able to create
                  and ship 3 distinct experiences that were multi-touch,
                  contextual and useful.
                </p>
              </Prose>
              <div className="flex flex-col gap-16">
                <Decision
                  index="01"
                  title="Code review swim-lane for team-managed projects"
                  fig={3}
                  figCaption="Swimlanes for Open, Merged and Declined pull requests."
                  src="/work/smart-devops/swimlanes.png"
                  alt="Jira board grouped by pull request status into swimlanes"
                >
                  <p>
                    Divides work by the &ldquo;Open&rdquo;
                    &ldquo;Declined&rdquo; &ldquo;Merged&rdquo; and
                    &ldquo;Unmapped&rdquo; work status, providing clear
                    visibility into code review progress.
                  </p>
                </Decision>

                <Decision
                  index="02"
                  title="Smart hover card experience"
                  fig={4}
                  figCaption="Anatomy of the hover card for a deployment."
                  src="/work/smart-devops/hover-anatomy.png"
                  alt="Annotated anatomy of a deployment hover card"
                  compact
                  compactWidth={420}
                  pad="#e6e6e8"
                >
                  <p>
                    Appears when there is information to show, determining
                    what&apos;s the most critical information to display based
                    on a system design and machine learning model.
                  </p>
                  <p>
                    The card determines what&apos;s the most critical
                    information to show based on the system design I presented
                    above and a machine learning model that determines what
                    users have more propensity to see this information.
                  </p>
                </Decision>
                <Media
                  fig={5}
                  caption="The card appears on hover and It disappears when you hover away."
                  src="/work/smart-devops/hover-notes.png"
                  alt="Jira board with a pull request hover card"
                  tint={cs.tint}
                  tone={cs.tone}
                />
                <Media
                  fig={6}
                  caption="Card interaction details."
                  src="/work/smart-devops/hover-interaction.png"
                  alt="Hover card interaction states"
                  tint={cs.tint}
                  tone={cs.tone}
                />

                <Decision
                  index="03"
                  title="An index of work"
                  fig={7}
                  figCaption="Aggregated list of work from sources."
                  src="/work/smart-devops/index.jpg"
                  alt="Jira Code page with repositories and an aggregated pull request list"
                  outline={false}
                >
                  <p>
                    PRs, commits etc from different sources, aggregated on a
                    &ldquo;Code&rdquo; page that provides comprehensive
                    filtering and search capabilities.
                  </p>
                </Decision>
              </div>
            </Section>

            <Section id="process" title="Process">
              <Prose>
                <p>
                  I worked with the designers and we came up with guiding
                  principles that have helped us hone our future user
                  experience and make decisions.
                </p>
              </Prose>
              <div className="grid gap-8 sm:grid-cols-2">
                {[
                  [
                    "Collaboration",
                    "Collaboration between developers and operations is at the heart of the DevOps practice. Our products must have the underlying collaboration models that enable great teamwork.",
                  ],
                  [
                    "Automation",
                    "Automation not only eliminates repetitive tasks but also reduces expensive wait times and post-release defects through detection, response, and updating.",
                  ],
                  [
                    "Open toolchain",
                    "Teams need flexibility and interoperability when configuring their toolchain. Customers often have up to 25 different tools in their DevOps toolchain.",
                  ],
                  [
                    "Metrics and insights",
                    "Data-driven insights & moments for team reflection support customers through their DevOps transformation and beyond.",
                  ],
                  [
                    "Project-centric",
                    "The Jira project should be a hub that unifies scoped content from other first- and third-party tools within a single interface.",
                  ],
                  [
                    "Team-based",
                    "Teams play a central role in the use of tools, tracking work, measurement of success, and collaboration.",
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
              <Media
                fig={8}
                caption="Priority of data types. Hierarchical table for information from most to least important in the developer cycle."
                src="/work/smart-devops/priority.png"
                alt="Hierarchy of deployments, builds, pull requests, branches, and commits"
                tint={cs.tint}
                tone={cs.tone}
              />
              <div className="flex max-w-[720px] flex-col gap-3">
                <Collapse eyebrow="01" title="Design considerations">
                  <CollapseStack>
                    <Labeled label="Consider the hierarchy of developer data">
                      <p>
                        As we expand the visibility of developer activity and
                        start to think about all the different data points a
                        developer needs to make a decision, we need a common
                        vocabulary of the entities and their relationships
                        that make up this complex system in Jira. For that, I
                        made this hierarchical table that lists information
                        from most to least important in the developer cycle.
                      </p>
                    </Labeled>
                    <Labeled label="Don't overwhelm or confuse users">
                      <p>
                        Show only one important thing at a time. Should be
                        easy to ignore/dismiss.
                      </p>
                      <p>
                        Shield our users from warning overload. Let us not
                        create problems to solve later.
                      </p>
                    </Labeled>
                    <Labeled label="Prioritize showing what's important and urgent first">
                      <p>
                        Like warnings and alerts first. Using Eisenhower's
                        strategy for taking action and organizing the
                        warnings. Using the 2x2 decision matrix below, we can
                        separate them based on four possibilities.
                      </p>
                      <p>
                        While providing a list of PRs with its metadata is
                        helpful for supervisors to triangulate on what's
                        important, it would save a lot more time if we were
                        able to tell them straight up what they need to focus
                        on with alerts and warnings.
                      </p>
                    </Labeled>
                    <Labeled label="Make it work for every team">
                      <p>
                        Every engineering manager has a different process and
                        is involved in code review differently. Every
                        engineering manager is involved in their team's
                        development work to varying degrees. Some would try to
                        not be involved in the code work at all, some would
                        like to be on top of recent changes, and some are
                        actively involved in reviewing pull requests.
                      </p>
                    </Labeled>
                  </CollapseStack>
                </Collapse>
                <Collapse eyebrow="02" title="Explorations we did not ship">
                  <CollapseStack>
                    <Labeled label="Showing warnings on the column or on the top of the page">
                      <p>
                        The user can interact with the icon to show them more
                        dev data and warnings.
                      </p>
                      <p>
                        Both of these designs were top contenders but this
                        didn't work with the partner teams which focus on the
                        CSAT (Customer satisfaction) of the board. They found
                        that adding visual icons to the board confuses users
                        and adds cognitive load to the page.
                      </p>
                    </Labeled>
                    <Labeled label="A more radical approach with modifying the Jira board columns">
                      <p>
                        A new "Pivot" and arranging the issues by the status
                        of the code.
                      </p>
                      <p>
                        Usability test results showed that this design
                        confused users. They're simply not used to seeing the
                        Jira columns not show the Jira issue progress.
                      </p>
                    </Labeled>
                    <Labeled label="Using the existing Insights panel">
                      <p>The more obvious choice.</p>
                      <p>
                        This was a small section for all the complex
                        information that we needed. The pattern didn't work
                        well for our needs.
                      </p>
                    </Labeled>
                  </CollapseStack>
                </Collapse>
                <Collapse eyebrow="03" title="Shipping swimlanes as an experiment">
                  <CollapseStack>
                    <p>
                      Our team decided to ship this as an experiment. With
                      this design experience, we hit a problem with the TTI
                      (Time to Interactive) increasing by 1 second with this
                      experiment.
                    </p>
                    <Labeled label="Letting users know they are using an experimental feature">
                      <p>
                        We explored ways to make clear to our users that this
                        new Group By option is experimental and that they
                        should expect a degraded experience as a trade-off for
                        a new shiny feature. This should also let us prompt
                        our users to send us feedback on the feature.
                      </p>
                    </Labeled>
                    <Labeled label="Add a kill-switch for the feature">
                      <p>
                        In order to react quickly in case the feature is
                        impacting negatively too many users, we can add a
                        specific kill-switch to this feature, that would allow
                        us to turn it off, without impacting the other
                        features packaged in our experiment.
                      </p>
                    </Labeled>
                    <Labeled label="Decrease the cohort that would see the feature">
                      <p>
                        Potential mitigation of the impact would be to reduce
                        the cohort sample we expose our feature to.
                      </p>
                    </Labeled>
                  </CollapseStack>
                </Collapse>
                <Collapse eyebrow="04" title="Accessibility first">
                  <CollapseStack>
                    <p>
                      I designed this card and the interaction so users can
                      tab inside the card and exit without problems. The Jira
                      card did not have individual links so this allowed
                      users to tab into and away from the card.
                    </p>
                    <p>
                      While reading the issue card contents, it would say
                      &ldquo;1 Pull request, press Shift+D to open&rdquo; or
                      &ldquo;1 pull request, press space to expand&rdquo;
                    </p>
                    <p>
                      The inner content of the card follows the following
                      pattern:
                    </p>
                    <p>
                      Pull request, Open, NUC-336 update team page with names,
                      Last updated August 9, 2020, Approved by Name 1,
                      Unapproved by Name 2, Unapproved by Name 3...Name X.
                      Press Escape to close
                    </p>
                    <p>
                      I realised that the experience was built on icons which
                      used only colour on top of the icons to show the status
                      of Pull requests. I worked with another designer to
                      update the icons and compared them to other products to
                      ensure quality and standardization.
                    </p>
                    <p>
                      The design tested well on the legacy board that is still
                      used by a lot of customers. We adapted the design to
                      work well on all devices, board types and have a
                      consistent experience for legacy board users.
                    </p>
                    <Labeled label="Index of work">
                      <p>
                        When screen reader users navigate linearly through the
                        content, they hear the reading order which is
                        determined by the order of content. I did an audit of
                        the current page and added the focus areas and
                        landmarks/headings to the page so that the components
                        like the table are accessible with a screen-reader and
                        have the tab-stops for easy navigation.
                      </p>
                    </Labeled>
                  </CollapseStack>
                </Collapse>
              </div>
              <CaseCarousel
                caption="Explorations that did not ship: warnings on the board, a column pivot, and the Insights panel."
                tint={cs.tint}
                tone={cs.tone}
                slides={[
                  {
                    src: "/work/smart-devops/explore-warning.png",
                    alt: "Warning approach on the Jira board",
                  },
                  {
                    src: "/work/smart-devops/explore-modal.png",
                    alt: "Modal with development information and warnings",
                  },
                  {
                    src: "/work/smart-devops/explore-pivot.png",
                    alt: "Radical pivot arranging issues by code status",
                  },
                  {
                    src: "/work/smart-devops/explore-insights.png",
                    alt: "Using the existing Insights panel for development data",
                  },
                ]}
              />
              <Media
                fig={9}
                caption="The Eisenhower Matrix also referred to as Urgent-Important Matrix, helped us decide on and prioritise warnings by urgency and importance."
                src="/work/smart-devops/eisenhower.png"
                alt="Eisenhower matrix used to prioritise warnings"
                tint={cs.tint}
                tone={cs.tone}
                compact
              />
              <blockquote
                className="max-w-[640px] border-l-2 pl-6"
                style={{ borderColor: cs.tone }}
              >
                <p className="display text-xl leading-snug text-night-ink md:text-2xl">
                  I love this(warnings) because it calls my attention to
                  possible problems and it&apos;s pretty big and screaming on
                  my face.
                </p>
              </blockquote>
              <Media
                fig={10}
                caption="A video recording of using the keyboard shortcuts and the narration of the Development icon."
                src="/work/smart-devops/a11y.gif"
                alt="Keyboard and screen reader use of the development hover card"
                tint={cs.tint}
                tone={cs.tone}
              />
              <Media
                fig={11}
                caption="Accessible icons compared with other products."
                src="/work/smart-devops/icons.png"
                alt="Pull request icon comparison across products"
                tint={cs.tint}
                tone={cs.tone}
              />
              <Media
                fig={12}
                caption="Accessibility audit of the Code page."
                src="/work/smart-devops/a11y-audit.png"
                alt="Accessibility audit with focus areas and landmarks"
                tint={cs.tint}
                tone={cs.tone}
              />
            </Section>

            <Section id="outcome" title="Outcome">
              <Prose>
                <p>
                  After a series of usability testing, I was able to create
                  and ship 3 distinct experiences that were multi-touch,
                  contextual and useful.
                </p>
              </Prose>
              <div className="grid gap-4 sm:grid-cols-2">
                <OutcomeCard
                  eyebrow="A"
                  title="Code review swimlanes"
                >
                  Divides work by the Open, Declined, Merged and Unmapped work
                  status, providing clear visibility into code review
                  progress.
                </OutcomeCard>
                <OutcomeCard eyebrow="B" title="Smart hover cards">
                  Appears when there is information to show, determining
                  what&apos;s the most critical information to display based
                  on a system design and machine learning model.
                </OutcomeCard>
                <OutcomeCard eyebrow="C" title="An index of work">
                  PRs, commits etc from different sources, aggregated on a
                  Code page that provides comprehensive filtering and search
                  capabilities.
                </OutcomeCard>
                <OutcomeCard eyebrow="A11y" title="Keyboard and screen reader">
                  I designed this card and the interaction so users can tab
                  inside the card and exit without problems.
                </OutcomeCard>
              </div>
              <div>
                <h3 className="display max-w-[640px] text-2xl md:text-3xl">
                  Prototype usability testing findings
                </h3>
                <p className="mt-4 max-w-[640px] leading-relaxed text-night-ink/75">
                  I conducted interviews and concept tests with 6 external
                  users and 3 Atlassians, all of whom had a supervisor role
                  (engineering manager, team lead etc) or a developer role.
                </p>
                <ul className="mt-6 flex max-w-[640px] flex-col gap-4">
                  <FindingRow kind="positive">
                    Identifying problem pull requests. By providing a list of
                    open pull requests with the relevant data, supervisors can
                    determine which pull requests are potentially causing
                    bottlenecks, and take action on that.
                  </FindingRow>
                  <FindingRow kind="positive">
                    Incorporate into team rituals. A participant mentioned
                    that this feature is something the whole team could make
                    use of in rituals such as standups by using it alongside
                    the board view.
                  </FindingRow>
                </ul>
              </div>
              <blockquote
                className="max-w-[640px] border-l-2 pl-6"
                style={{ borderColor: cs.tone }}
              >
                <p className="display text-xl leading-snug text-night-ink md:text-2xl">
                  If one person has five open pull requests that are all 10
                  days old, then I&apos;d probably talk to them. One-on-one
                  say like, Hey, what are all these, do we need to do
                  something about them? Is no one reviewing them? What&apos;s
                  the problem?
                </p>
              </blockquote>
              <blockquote
                className="max-w-[640px] border-l-2 pl-6"
                style={{ borderColor: cs.tone }}
              >
                <p className="display text-xl leading-snug text-night-ink md:text-2xl">
                  It&apos;s definitely useful. And like, this is something I
                  would absolutely use in, in our stand-ups. At the moment, I
                  essentially, just before I stand up open three tabs, Boards,
                  Stash and Bitbucket.
                </p>
              </blockquote>
              <blockquote
                className="max-w-[640px] border-l-2 pl-6"
                style={{ borderColor: cs.tone }}
              >
                <p className="display text-xl leading-snug text-night-ink md:text-2xl">
                  I think this pop-up feature would be really helpful for us
                  during a scrum meeting in the morning. So for example, I
                  would pull this open engineers would have a lot more data to
                  talk about their work.
                </p>
              </blockquote>
            </Section>

            <Section id="impact" title="Impact">
              <div className="grid gap-4 sm:grid-cols-2">
                <Stat
                  value="4%"
                  label="Interactions"
                  caption="We saw a 4% increase in interactions and clicks within the first week of implementation!"
                />
                <Stat
                  value="3"
                  label="Shipped experiences"
                  caption="After a series of usability testing, I was able to create and ship 3 distinct experiences that were multi-touch, contextual and useful."
                />
                <Stat
                  value="6 + 3"
                  label="Prototype tests"
                  caption="I conducted interviews and concept tests with 6 external users and 3 Atlassians, all of whom had a supervisor role or a developer role."
                />
                <Stat
                  value="25"
                  label="Tools in a toolchain"
                  caption="Customers often have up to 25 different tools in their DevOps toolchain."
                />
              </div>
              <div className="flex max-w-[720px] flex-col gap-3">
                <Collapse title="Closing thoughts">
                  <CollapseStack>
                    <p>
                      In the quest for enabling users to be more productive,
                      it&apos;s important to stay on the lookout for not
                      creating dark patterns in the process that could burn
                      out users. The amount of information, warnings &amp;
                      intensity is something that I&apos;ve been conscious
                      about.
                    </p>
                    <p>
                      Leverage user context to light up relevant warnings.
                      Highlight relevant information to provide visibility to
                      users.
                    </p>
                    <p>
                      Don&apos;t get in the way: Ensure efficient dismissal of
                      the experiences. Respect user choices for not wanting
                      their data being shown.
                    </p>
                    <p>Continuously learn and adapt from user interactions.</p>
                    <p>
                      What&apos;s important for one user may not be important
                      for another user. It&apos;s necessary that the system
                      learns and adapts to cater to different users better.
                      We&apos;ve used a mix of signals to identify whether the
                      hover cards are relevant to the users or not.
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

import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GlowBorder } from "@/components/GlowBorder";
import { CaseToc, type TocItem } from "@/components/case/CaseToc";
import { Collapse } from "@/components/case/Collapse";
import { Media } from "@/components/case/Media";
import { ProofPills } from "@/components/case/ProofPills";
import { mainCases } from "@/lib/content";

const cs = mainCases.find((c) => c.slug === "security-in-jira")!;
const next = mainCases.find((c) => c.slug === "smart-devops")!;

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
}: {
  index: string;
  title: string;
  fig?: number;
  figCaption?: string;
  src?: string;
  alt?: string;
  children: React.ReactNode;
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
          outline="persona"
        />
      ) : null}
    </article>
  );
}

export default function SecurityInJiraCaseStudy() {
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
            Helping developers focus on improving their code security.
          </p>
          <ProofPills items={cs.proof} className="mt-8" />
        </header>

        <div className="mx-auto max-w-5xl px-6">
          <Media
            src="/work/security-in-jira/hero-case.png"
            alt="Security tab empty state in Jira, with Finish setup and Connect tool"
            tint={cs.tint}
            tone={cs.tone}
            outline="persona"
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
                    I designed a Security surface in Jira so product teams
                    can triage incoming security work in the same place they
                    plan the sprint.
                  </p>
                  <p>
                    The first version ran on Snyk. We then defined an
                    integration pattern so more security tools could connect
                    the same way.
                  </p>
                </Prose>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-6 md:grid-cols-4">
                  {[
                    ["Role", "Senior Product Designer"],
                    ["Team", "16 people"],
                    ["Timeline", "8 to 9 months"],
                    ["Status", "All shipped"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="meta text-night-ink/40">{k}</dt>
                      <dd className="mt-1.5 text-sm text-night-ink/85">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex max-w-[720px] flex-col gap-3">
                  <Collapse title="What I was responsible for">
                    <CollapseStack>
                      <Labeled label="Kickoff">
                        <p>
                          Understand the domain, set the mental model,
                          hypothesize user problems.
                        </p>
                      </Labeled>
                      <Labeled label="Wonder">
                        <p>
                          Define the initial customer journey, secondary
                          research diagnosis, facilitate ideation.
                        </p>
                      </Labeled>
                      <Labeled label="Explore">
                        <p>
                          Sparring designs, explore solutions, define design
                          principles.
                        </p>
                      </Labeled>
                      <Labeled label="Make">
                        <p>
                          Prototyping, design specifications, usability
                          testing.
                        </p>
                      </Labeled>
                      <Labeled label="Impact">
                        <p>Capturing feedback and capturing impact.</p>
                      </Labeled>
                    </CollapseStack>
                  </Collapse>
                  <Collapse title="Who I worked with">
                    <CollapseStack>
                      <Labeled label="Stakeholders">
                        <p>
                          Core Jira team, Product leadership, Product triad.
                        </p>
                      </Labeled>
                      <Labeled label="Product Manager">
                        <p>Set goals and the road map.</p>
                      </Labeled>
                      <Labeled label="UX Researcher">
                        <p>Ran customer interviews.</p>
                      </Labeled>
                      <Labeled label="Analyst">
                        <p>Did quantitative analysis.</p>
                      </Labeled>
                      <Labeled label="Eng Manager">
                        <p>
                          Set delivery milestones and technical feasibility.
                        </p>
                      </Labeled>
                      <Labeled label="Feature Lead">
                        <p>
                          Owned prioritisation and end to end demos.
                        </p>
                      </Labeled>
                      <Labeled label="Engineers">
                        <p>
                          Joined weekly design jams and defined edge cases.
                        </p>
                      </Labeled>
                      <Labeled label="Content Designer">
                        <p>
                          Covered discovery, onboarding, and documentation.
                        </p>
                      </Labeled>
                    </CollapseStack>
                  </Collapse>
                </div>
              </div>
            </section>

            <Section id="problem" title="The problem">
              <Prose>
                <p>
                  What might the Atlassian Security solution look like? What
                  is the strategic opportunity?
                </p>
              </Prose>
              <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3">
                {[
                  [
                    "71%",
                    "of our customers are currently adopting DevOps processes.",
                  ],
                  [
                    "9bn",
                    "VC investment in Cybersecurity this year.",
                  ],
                  [
                    "70%",
                    "of software applications' code comes from open source components.",
                  ],
                ].map(([value, label]) => (
                  <div key={value} className="bg-[#141310] p-6">
                    <p className="display text-4xl text-night-ink">{value}</p>
                    <p className="mt-2 text-sm leading-relaxed text-night-ink/60">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3">
                {[
                  ["2.8", "Security tools per organisation."],
                  ["78%", "Think everyone is responsible for security."],
                  ["15%", "Scan results are easily available to developers."],
                ].map(([value, label]) => (
                  <div key={value} className="bg-[#141310] p-6">
                    <p className="meta text-night-ink/40">Desk research</p>
                    <p className="display mt-2 text-4xl text-night-ink">
                      {value}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-night-ink/60">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
                {[
                  [
                    "A. Manual work from toolchain sprawl",
                    "Teams without fully integrated (or custom built) testing tools face more administrative work, errors and missed detail when trying to surface, track and triage relevant vulnerabilities.",
                  ],
                  [
                    "B. Duplicated work from different vulnerabilities",
                    "Teams using different operating systems and/or multiple security tools find that a single vulnerability may be reported multiple times and in different forms. This makes it hard for teams to truly understand their security posture.",
                  ],
                  [
                    "C. Education and onboarding into security tools",
                    "Organisations lacking security champions or stakeholder buy-in are likely to underestimate their exposure to exploits. Risk education is needed so that routine security testing and remediation is built in to workflows.",
                  ],
                  [
                    "D. Bringing in the supervisor",
                    "Developers do not always have a clear picture of security testing metrics to communicate upwards to stakeholders, nor clarity on how to continually improve these metrics.",
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
              <p className="max-w-[640px] text-sm leading-relaxed text-night-ink/60">
                Statement E did not test well: security vulnerability
                timelines are hard to track.
              </p>
              <div>
                <h3 className="display max-w-[640px] text-2xl md:text-3xl">
                  Selecting the user segments
                </h3>
                <p className="mt-4 max-w-[640px] leading-relaxed text-night-ink/75">
                  We designed for three segments: a team lead, a developer,
                  and a security analyst.
                </p>
              </div>
              <Media
                src="/work/security-in-jira/personas.png"
                alt="User personas: team lead Steph, developer Amir, and security analyst Amin"
                tint={cs.tint}
                tone={cs.tone}
                outline="persona"
              />
            </Section>

            <Section id="research" title="Research">
              <Prose>
                <p>
                  Research ran in rounds: Wonder interviews, concept testing,
                  prototype testing, then an end to end prototype.
                </p>
              </Prose>
              <div className="flex max-w-[720px] flex-col gap-3">
                <Collapse eyebrow="01" title="Wonder interviews">
                  <CollapseStack>
                    <Labeled label="Method">
                      <p>
                        About 5 participants, in a 60 minute 1:1 interview.
                      </p>
                    </Labeled>
                    <Labeled label="Criteria">
                      <p>Recruit 2 of:</p>
                      <p>Developer supervisor</p>
                      <p>Software developer</p>
                      <p>Security analyst</p>
                    </Labeled>
                    <Labeled label="Objectives">
                      <p>How each persona views security</p>
                      <p>Identify their security needs</p>
                      <p>
                        Confirm or debunk our hypotheses and problem
                        statements
                      </p>
                      <p>
                        Which types of customers, orgs, and maturity levels
                        might benefit
                      </p>
                    </Labeled>
                  </CollapseStack>
                </Collapse>
                <Collapse eyebrow="02" title="Concept testing with rapid prototyping">
                  <CollapseStack>
                    <Labeled label="Method">
                      <p>
                        About 8 participants, in a 60 minute 1:1 interview.
                      </p>
                      <p>
                        All Jira and Snyk users. All medium and
                        Enterprise-sized organisations. Mix of industries.
                      </p>
                      <p>
                        Seeking feedback on the written concept and a
                        walk-through of the experience as stills.
                      </p>
                    </Labeled>
                    <Labeled label="Finding">
                      <p>
                        Code security testing is shoe-horned into existing
                        processes, and this can help bring in a ritual.
                      </p>
                      <p>
                        Consuming tool output is typically the first step to
                        triaging, followed by human decision-making. Once
                        triaged, issues are created manually in Jira.
                      </p>
                    </Labeled>
                    <Labeled label="Challenge">
                      <p>
                        Every organisation has a different way of approaching
                        code security testing.
                      </p>
                    </Labeled>
                  </CollapseStack>
                </Collapse>
                <Collapse eyebrow="03" title="Prototype testing">
                  <CollapseStack>
                    <p>
                      The prototype overcame manual workflows, like copying
                      and pasting security information into Jira.
                    </p>
                    <p>
                      It gave greater visibility and easier remediation
                      through tracking.
                    </p>
                    <p>
                      People still wanted increased efficiency from less
                      context switching, increased automation, and more
                      seamless workflows for individuals and teams.
                    </p>
                  </CollapseStack>
                </Collapse>
                <Collapse eyebrow="04" title="End to end prototype testing">
                  <CollapseStack>
                    <p>
                      What can we learn from exploring the end-to-end
                      security experience to ensure that our solution will
                      be market ready? And what feedback may give us
                      insights into the features to add in the longer term?
                    </p>
                    <Labeled label="Finding">
                      <p>
                        How much is automated vs requires my manual input?
                        If this is not addressed it could undermine the
                        whole purpose of the integration.
                      </p>
                    </Labeled>
                    <Labeled label="Finding">
                      <p>
                        I am still confused, what is actually being
                        configured between Jira and Snyk?
                      </p>
                    </Labeled>
                  </CollapseStack>
                </Collapse>
              </div>
              <blockquote
                className="max-w-[640px] border-l-2 pl-6"
                style={{ borderColor: cs.tone }}
              >
                <p className="display text-xl leading-snug text-night-ink md:text-2xl">
                  There is a real use case that you&apos;re bringing all this
                  information within Jira, letting people build or create
                  tickets right there. It all gets attached.
                </p>
                <footer className="meta mt-3 text-faint">
                  P8 · PM · SMB SaaS
                </footer>
              </blockquote>
              <Media
                fig={2}
                caption="Prototype of the Security tab."
                src="/work/security-in-jira/prototype.png"
                alt="Jira Security tab prototype with security containers and a vulnerability table"
                tint={cs.tint}
                tone={cs.tone}
                outline="persona"
              />
              <div>
                <h3 className="display max-w-[640px] text-2xl md:text-3xl">
                  Outcomes of prototype testing
                </h3>
                <ul className="mt-6 flex max-w-[640px] flex-col gap-4">
                  <FindingRow kind="positive">
                    Overcomes{" "}
                    <strong className="font-semibold text-night-ink">
                      Manual workflows
                    </strong>{" "}
                    (like copying and pasting security information into Jira).
                  </FindingRow>
                  <FindingRow kind="positive">
                    Greater Visibility and easier remediation through tracking
                    them.
                  </FindingRow>
                  <FindingRow kind="negative">
                    Want Increased efficiency due to less context switching,
                    increased automation and more seamless workflows (for
                    individuals and teams).
                  </FindingRow>
                </ul>
                <blockquote
                  className="mt-8 max-w-[640px] border-l-2 pl-6"
                  style={{ borderColor: cs.tone }}
                >
                  <p className="display text-xl leading-snug text-night-ink md:text-2xl">
                    There is a real use case that you&apos;re bringing all
                    this information within Jira, letting people build or
                    create tickets right there. It all gets attached. So
                    again, it depends how many of these security
                    vulnerabilities you have to solve, but like the more you
                    have to solve or the more your job function is attached
                    to it, I think it adds a lot of value there. It adds a
                    lot of efficiency, let&apos;s put it that way.
                  </p>
                  <footer className="meta mt-3 text-faint">
                    (P8, PM, SMB SaaS)
                  </footer>
                </blockquote>
              </div>
              <div className="flex flex-col gap-6 border-t border-white/10 pt-6">
                <p className="meta text-night-ink/45">
                  Early guiding principles
                </p>
                <div className="grid gap-8 sm:grid-cols-3">
                  {[
                    [
                      "Prioritize SCA and SAST types of testing",
                      "Strategic impact as most users of Jira do this already.",
                    ],
                    [
                      "Educate customers on security best practices",
                      "Desk research.",
                    ],
                    [
                      "Enable Developers and security analysts to collaborate",
                      "User interviews.",
                    ],
                  ].map(([title, source]) => (
                    <div key={title}>
                      <h3 className="text-base font-semibold leading-snug text-night-ink">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm text-night-ink/55">{source}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Media
                fig={3}
                caption="Security activities mapped across Plan, Build, CI and Test, CD, and Runtime."
                src="/work/security-in-jira/end-to-end-journey.png"
                alt="Diagram mapping security activities across the software development lifecycle"
                tint={cs.tint}
                tone={cs.tone}
                outline="persona"
              />
              <Media
                fig={4}
                caption="Security tools and their outputs, all landing in a work tracking tool."
                src="/work/security-in-jira/domain-map.png"
                alt="Figjam map of SCA, SAST, DAST, IAST, WAF, RASP, and SIEM tools and outputs"
                tint={cs.tint}
                tone={cs.tone}
                outline="persona"
              />
            </Section>

            <Section id="decisions" title="Decisions made">
              <Prose>
                <p>
                  Milestone 1 asked: how might we create an easy-to-execute
                  security triaging ritual for product teams to use in
                  everyday workflows?
                </p>
                <p>
                  Milestone 2 asked: how might we easily integrate with
                  multiple security tools and onboard new users to create an
                  open toolchain experience?
                </p>
              </Prose>
              <div className="flex flex-col gap-16">
                <Decision
                  index="01"
                  title="A list of security issues, and a way to create Jira issues"
                  fig={5}
                  figCaption="Early Security tab: connections, filters, and create issue."
                  src="/work/security-in-jira/early-list.png"
                  alt="Early design of the Jira Security tab with Snyk connections and a vulnerability list"
                >
                  <p>
                    The tab shows connections linked to the project, then
                    the most recent vulnerabilities from those tools. Default
                    filter excludes closed and ignored. Project admins can
                    edit connections.
                  </p>
                </Decision>

                <Decision
                  index="02"
                  title="Filter the list, then file a ticket with security detail filled in"
                  fig={6}
                  figCaption="Filter atoms and the Create issue modal, with paths, fix, and CVSS."
                  src="/work/security-in-jira/filters-create.png"
                  alt="Filter bar, severity pills, status icons, and Create issue modal for a vulnerability"
                >
                  <p>
                    Search by vulnerability name, Jira issue key, and
                    identifiers. Filter by connection, severity, status, and
                    Jira issue status. Create issue pre-fills summary,
                    description, detailed paths, remediation, and security
                    information.
                  </p>
                </Decision>

                <Decision
                  index="03"
                  title="Start with Snyk, then open the pattern to more tools"
                  fig={7}
                  figCaption="Workspace to site, container to project, vulnerability to issue."
                  src="/work/security-in-jira/integration-model.png"
                  alt="Integration model mapping security workspace, container, and vulnerability to Jira site, project, and issue"
                >
                  <p>
                    The MVP goal: helping developers focus on improving their
                    code security by triaging and planning incoming adhoc
                    security issues. The feature is powered by Snyk, a
                    security tool that sends adhoc issues to Jira where they
                    can be planned.
                  </p>
                  <p>
                    User impact: drive current users of Jira towards
                    development maturity and help them secure their code. It
                    will be successful if we can test it in beta and prove
                    the concept to be useful. Partnerships later included
                    Snyk, Mend, Lacework, StackHawk, and JFrog.
                  </p>
                </Decision>

                <Decision
                  index="04"
                  title="A 3 step integration: install, configure, map to the project"
                >
                  <p>
                    A vulnerability is a new object. A security issue creates
                    it. It links to a Jira issue. Site-level config connects
                    the workspace. The project toolchain connects containers.
                  </p>
                </Decision>
              </div>
            </Section>

            <Section id="process" title="Process">
              <Prose>
                <p>
                  12 Jira customers onboarded to the Beta. We told them the
                  feature was experimental. We added a kill-switch.
                </p>
              </Prose>
              <div className="flex max-w-[720px] flex-col gap-3">
                <Collapse eyebrow="01" title="Beta rollout">
                  <CollapseStack>
                    <p>Gather interest from the public announcement.</p>
                    <p>Shortlist respondents for beta.</p>
                    <p>
                      Set up an initial call to explain the program.
                    </p>
                    <p>
                      Set-up call where the customer onboards and we
                      observe.
                    </p>
                    <p>Slack channel for feedback.</p>
                    <p>Exit interview.</p>
                  </CollapseStack>
                </Collapse>
                <Collapse eyebrow="02" title="Capture SEQ">
                  <CollapseStack>
                    <p>
                      SEQ measures the ease or difficulty of individual
                      tasks.
                    </p>
                    <Labeled label="One question">
                      <p>
                        On a scale of 1 to 7, with 1 being very difficult
                        and 7 being very easy, how would you rate that
                        task?
                      </p>
                    </Labeled>
                    <p>We aim for a score of 5.5 or higher.</p>
                  </CollapseStack>
                </Collapse>
                <Collapse eyebrow="03" title="Product and design feedback">
                  <CollapseStack>
                    <p>
                      I keep a record of direct and indirect customer
                      feedback in Confluence, tagged into themes.
                    </p>
                    <Labeled label="Themes">
                      <p>
                        Security type, Snyk Code, configuration, and
                        priority level.
                      </p>
                    </Labeled>
                    <Labeled label="Install and config notes">
                      <p>
                        Duplicate Jira issues, confusion on Get it now, the
                        term host application, project settings, and
                        administrator permissions.
                      </p>
                    </Labeled>
                  </CollapseStack>
                </Collapse>
              </div>
              <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3">
                {[
                  [
                    "6.9",
                    "Add security tools to your site. Above the 5.5 target.",
                  ],
                  [
                    "5.2",
                    "Configure your security tools. Below the 5.5 target.",
                  ],
                  [
                    "4.9",
                    "Link security containers to your project. Below the 5.5 target.",
                  ],
                ].map(([value, label]) => (
                  <div key={value} className="bg-[#141310] p-6">
                    <p className="meta text-night-ink/40">SEQ average</p>
                    <p className="display mt-2 text-4xl text-night-ink">
                      {value}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-night-ink/60">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="outcome" title="Outcome">
              <div className="flex flex-col gap-6">
                <Media
                  fig={8}
                  caption="App install, authentication and configuration, then project mapping."
                  src="/work/security-in-jira/three-step.png"
                  alt="Three screens: Security empty state, Snyk configuration, and project mapping"
                  tint={cs.tint}
                  tone={cs.tone}
                  outline="persona"
                />
                <div className="flex max-w-[640px] flex-col gap-5">
                  <div>
                    <p className="meta" style={{ color: cs.tone }}>
                      01 App install
                    </p>
                    <p className="mt-1.5 leading-relaxed text-night-ink/75">
                      Add security tools to your site.
                    </p>
                  </div>
                  <div>
                    <p className="meta" style={{ color: cs.tone }}>
                      02 Authentication and App configuration
                    </p>
                    <p className="mt-1.5 leading-relaxed text-night-ink/75">
                      Configure your security tools. Site-level config
                      connects the workspace.
                    </p>
                  </div>
                  <div>
                    <p className="meta" style={{ color: cs.tone }}>
                      03 Project mapping
                    </p>
                    <p className="mt-1.5 leading-relaxed text-night-ink/75">
                      Link security containers to your project. The project
                      toolchain connects containers.
                    </p>
                  </div>
                </div>
              </div>
              <Media
                fig={9}
                caption="Early onboarding layouts: three versions of the empty Security page."
                src="/work/security-in-jira/onboarding-early.png"
                alt="Three early onboarding layout options for the Security tab"
                tint={cs.tint}
                tone={cs.tone}
                outline="persona"
              />
              <Media
                fig={10}
                caption="Onboarding modal: install the app, set it up, connect containers."
                src="/work/security-in-jira/onboarding-modal.png"
                alt="Jira onboarding modal, You are almost ready to view security information in Jira"
                tint={cs.tint}
                tone={cs.tone}
                outline="persona"
              />
              <Prose>
                <p>
                  The latest empty state and the 3 step onboarding modal are
                  usable by all security tools. Copy on the empty state:
                  connect your tools to manage security work in one place.
                </p>
              </Prose>
              <div className="grid gap-4 sm:grid-cols-2">
                <OutcomeCard
                  eyebrow="Feature"
                  title="A new feature called Security in Jira"
                >
                  Turning an ambiguous problem into a Paid solution by
                  designing and testing the feature, collaborating with a 3rd
                  Party (Snyk).
                </OutcomeCard>
                <OutcomeCard
                  eyebrow="Pattern"
                  title="An integration pattern for multiple security tools"
                >
                  Systems thinking in designing onboarding, app integration
                  and configuration.
                </OutcomeCard>
              </div>
            </Section>

            <Section id="impact" title="Impact">
              <div className="grid gap-4 sm:grid-cols-2">
                <Stat
                  value="All shipped"
                  label="Status"
                  caption="The Security feature and the multi-tool integration pattern both shipped."
                />
                <Stat
                  value="12"
                  label="Beta customers"
                  caption="Jira customers onboarded to use the Beta, with a Slack channel and exit interview."
                />
                <Stat
                  value="6.9"
                  label="SEQ, add tools"
                  caption="Adding security tools to the site scored 6.9 against a 5.5 target. Configure and link scored 5.2 and 4.9."
                />
                <Stat
                  value="5"
                  label="Partners"
                  caption="Snyk, Mend, Lacework, StackHawk, and JFrog."
                />
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

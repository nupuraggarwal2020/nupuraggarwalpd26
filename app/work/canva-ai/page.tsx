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

const cs = mainCases.find((c) => c.slug === "canva-ai")!;
const next = mainCases.find((c) => c.slug === "security-in-jira")!;

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
        />
      ) : null}
    </article>
  );
}

export default function CanvaAiCaseStudy() {
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
            src="/work/canva-ai/hero.png"
            alt="ChatGPT creating on-brand Chopify Burger social posts via Canva"
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
                    I was design lead on Canva&apos;s AI Assistant
                    integrations. The goal was getting Canva into ChatGPT,
                    Claude and Gemini so people could start
                    creative work where they already were, not only inside
                    our editor.
                  </p>
                  <p>
                    Search was moving quickly toward assistants, and we
                    needed flows that felt at home on each host without
                    watering down what Canva is supposed to feel like. Data
                    showed a big assistant audience but little overlap with
                    people using our older plugin.
                  </p>
                </Prose>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-6 md:grid-cols-4">
                  {[
                    ["Role", "Design lead"],
                    ["Team", "15 people"],
                    ["Timeline", "About 6 months"],
                    ["Status", "Live Feb 2026"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="meta text-night-ink/40">{k}</dt>
                      <dd className="mt-1.5 text-sm text-night-ink/85">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="max-w-[640px]">
                  <Collapse title="What I owned">
                    End-to-end UX for creating and editing with AI inside
                    external assistants. Design strategy across Ecosystem,
                    GenAI, and Editing Platform when opinions didn&apos;t all
                    match on day one. Research-backed concepts, prototypes,
                    and specs that had to line up with real API constraints,
                    not wishful thinking. Core team was PM, eng lead,
                    research, data, and TPM, with 15+ engineers around that.
                  </Collapse>
                </div>
              </div>
            </section>

            <Section id="problem" title="The problem">
              <Prose>
                <p>
                  Our existing CanvaGPT integration, while successful in
                  driving a significant part of our CanvaAI usage, was
                  failing to meet user expectations for AI-assisted design.
                  ChatGPT rose from 1% to 5% of user searches on the
                  internet. People expected a conversation. They got a
                  one-off output.
                </p>
              </Prose>
              <ul className="flex max-w-[640px] flex-col gap-3">
                {[
                  [
                    "Conversational expectation gap.",
                    "Users expected back-and-forth iteration like traditional LLMs, but CanvaGPT only provided one-off design outputs.",
                  ],
                  [
                    "Context switching friction.",
                    "Users had to manually discover and install CanvaGPT, breaking their natural workflow.",
                  ],
                  [
                    "Limited design control.",
                    "Users couldn't customize designs within the AI interface, forcing premature handoffs to Canva.",
                  ],
                  [
                    "Brand consistency challenges.",
                    "No ability to apply brand guidelines or maintain visual consistency across AI-generated designs.",
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
              <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3">
                {[
                  [
                    "0.7%",
                    "user overlap between ChatGPT and Canva users. A massive untapped audience already comfortable with AI-powered workflows.",
                  ],
                  [
                    "38%",
                    "of queries resulted in actual AI-generated designs. The majority defaulted to template suggestions.",
                  ],
                  [
                    "99.6%",
                    "click-through rate for presentations when the right content appeared.",
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
              <div className="overflow-hidden rounded-3xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="meta text-night-ink/40">
                    <tr className="border-b border-white/10">
                      <th className="px-5 py-3 font-normal">Design type</th>
                      <th className="px-5 py-3 font-normal">Prompts</th>
                      <th className="px-5 py-3 font-normal">Click-through</th>
                      <th className="px-5 py-3 font-normal">Completion</th>
                    </tr>
                  </thead>
                  <tbody className="text-night-ink/75">
                    {[
                      ["Presentations", "15%", "99.6%", "9%"],
                      ["Social media", "15%", "90%", "9%"],
                      ["Logos", "11.1%", "42%", "5%"],
                    ].map((row) => (
                      <tr key={row[0]} className="border-b border-white/5 last:border-0">
                        {row.map((cell) => (
                          <td key={cell} className="px-5 py-3">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Prose>
                <p>
                  These insights informed our strategy to embed Canva
                  natively within AI assistant workflows, prioritizing
                  presentations and social media: the use cases with highest
                  engagement and completion rates. 75% of marketers now use
                  AI assistants for social media content creation, a 103%
                  year-over-year increase.
                </p>
              </Prose>
            </Section>

            <Section id="research" title="Research">
              <Prose>
                <p>
                  I conducted 5 user interviews (60 mins each), analysis
                  of existing CanvaGPT feedback, and a review of Canva AI
                  usage patterns. I partnered with our Research Lead on a
                  2-week diary study across Pro, Team, and Enterprise
                  tiers. Users wanted the assistant to get them 70% of the
                  way before finishing in Canva.
                </p>
              </Prose>
              <blockquote
                className="max-w-[640px] border-l-2 pl-6"
                style={{ borderColor: cs.tone }}
              >
                <p className="display text-xl leading-snug text-night-ink md:text-2xl">
                  CanvaGPT users want a creative brainstorming partner, but
                  get a broken document generator instead.
                </p>
                <footer className="meta mt-3 text-faint">
                  2-week diary study
                </footer>
              </blockquote>
              <div className="flex max-w-[720px] flex-col gap-3">
                <Collapse eyebrow="01" title="What users needed">
                  Access to existing Canva context, quality matching
                  alternatives, time-saving workflows, and honest
                  communication about capabilities. Less than 1% of ChatGPT
                  users knew the Canva integration existed. No access to
                  users&apos; existing Canva assets meant starting from
                  scratch every time.
                </Collapse>
                <Collapse eyebrow="02" title="What was breaking">
                  Oversimplified prompts, an isolated experience, false task
                  completion claims, and premature Canva handoffs. Bottom
                  line: fix prompt processing and context access, or risk
                  losing users to competitors who better understand their
                  intent.
                </Collapse>
                <Collapse eyebrow="03" title="Journey mapping workshop">
                  I facilitated a cross-functional journey mapping workshop
                  focused on a small business marketer creating
                  multi-platform content while maintaining brand
                  consistency. We asked where it breaks, what would make it
                  magical, and where AI should help versus human control. We
                  identified eight distinct stages, each with pain points:
                  at Intent, users didn&apos;t know ChatGPT could help with
                  design. During Discovery, manual plugin search created
                  friction. At Context, users couldn&apos;t reference their
                  brand or previous designs. Generation produced generic
                  templates. Select lacked preview capabilities. Iterate
                  interpreted refinement requests as new design requests.
                  Refine in Canva lost all conversation history. Publish
                  required manual uploads to each platform.
                </Collapse>
                <Collapse eyebrow="04" title="What we prioritised">
                  We&apos;re prioritising the right use cases. Brand Kit
                  integration and resizing designs in multiple formats are
                  strongly validated by user behaviour. Working with data
                  analyst Chhaya, I developed a prioritization framework
                  balancing user impact, technical feasibility, and business
                  value. Tier 1 for MVP: auto-sizing social posts (mentioned
                  in 40% of interviews), brand kit application (critical for
                  SMBs, reducing time-to-design by 60%), and tone and
                  localization changes.
                </Collapse>
              </div>
            </Section>

            <Section id="decisions" title="Decisions made">
              <Prose>
                <p>
                  We decided to embed Canva natively in assistant workflows,
                  prioritizing presentations and social media: the use cases
                  with highest engagement and completion rates.
                </p>
                <p>
                  The capabilities we designed were auto-resize, brand kit
                  application, tone and localization, and a handoff that
                  keeps conversation context.
                </p>
              </Prose>
              <div className="flex flex-col gap-16">
                <Decision
                  index="01"
                  title="Auto-resize social posts"
                  fig={1}
                  figCaption="Multi-platform resize from one conversation."
                  src="/work/canva-ai/resize.png"
                  alt="Auto-resize social posts"
                >
                  <p>
                    Research showed social media managers maintain 5-7
                    platforms, each requiring different formats. My solution
                    transformed this hours-long process into a natural
                    conversation: &ldquo;Create an Instagram post for my
                    coffee shop&apos;s summer sale&rdquo; followed by
                    &ldquo;Now I need this for Stories and LinkedIn
                    too.&rdquo;
                  </p>
                  <p>
                    This wasn&apos;t simple cropping. Our intelligent
                    resizing technology maintained visual hierarchy across
                    different aspect ratios. A batch preview system
                    presented multiple format variations within
                    ChatGPT&apos;s text-heavy interface using a compact grid
                    view with highlighted differences.
                  </p>
                </Decision>

                <Decision
                  index="02"
                  title="Brand kit application"
                  fig={2}
                  figCaption="Brand kit applied from conversation context."
                  src="/work/canva-ai/brand-kit.png"
                  alt="Apply Brand Kit in Canva"
                >
                  <p>
                    SMB owners were spending 30% of design time manually
                    applying brand elements. The system recognizes the
                    user&apos;s business context from conversation, accesses
                    their Canva brand assets (colors, fonts, logos), and
                    applies brand elements while maintaining design quality.
                  </p>
                  <p>
                    For new users, I designed a streamlined creation flow
                    within the AI conversation, generating a basic kit with
                    complementary fonts, color palette, and placeholder logo
                    space. Users could adjust brand intensity through
                    natural language.
                  </p>
                </Decision>

                <Decision
                  index="03"
                  title="Tone and localization"
                >
                  <p>
                    When users requested &ldquo;make this presentation more
                    playful,&rdquo; the system orchestrated multiple
                    changes: switching to rounded fonts, warming colors,
                    adding illustrated elements, and rewriting copy.
                    Localization considered cultural color associations,
                    reading patterns, space requirements for different
                    languages, and locally relevant imagery.
                  </p>
                </Decision>

                <Decision
                  index="04"
                  title="Handoff to Canva"
                  fig={3}
                  figCaption="Landing in Canva with conversation context attached."
                  src="/work/canva-ai/handoff.png"
                  alt="ChatGPT to Canva editor handoff"
                >
                  <p>
                    One of the most critical design challenges was
                    determining optimal handoff points between AI assistance
                    and human control. When landing from ChatGPT, pass
                    conversation context to continue seamlessly and show the
                    prompt sent from ChatGPT to Canva AI.
                  </p>
                  <p>
                    A single design lands in the editor. Multiple designs
                    land in Sheets view. A social media campaign lands in
                    Grow. The sunscreen campaign prototype covered bulk
                    creation in Canva Sheets and context passing between
                    platforms.
                  </p>
                </Decision>
              </div>
              <div className="max-w-[720px]">
                <Collapse title="AI and human control">
                  AI-optimal: template selection, basic text and image
                  placement, format conversion. Human-optimal: advanced
                  typography, custom illustrations, complex layouts. Hybrid:
                  brand application, tone adjustments, content localization.
                  Users had high comfort with resizing, basic brand
                  application, and format conversion. Medium comfort with
                  content tone changes, image selection, and layout
                  suggestions. Low comfort with final design decisions,
                  complex brand interpretations, and publication.
                </Collapse>
              </div>
            </Section>

            <Section id="process" title="Process">
              <Prose>
                <p>
                  I worked with product and eng leads across Ecosystem,
                  GenAI, Editing, and Growth, something like eight teams and
                  15+ engineers, on a rough six-month runway to the big
                  launch milestones.
                </p>
              </Prose>
              <div className="flex max-w-[720px] flex-col gap-3">
                <Collapse eyebrow="01" title="Design principles">
                  By June 30, I synthesized our findings into draft core
                  design principles: seamless context-aware transitions,
                  optimize for speed to value, build a scalable design
                  system, progressive disclosure, meet core needs and align
                  to user intent, achieve parity with Canva AI, show the
                  value of Canva, and build lasting relationships. Later on,
                  we combined them with the product principles to have 4
                  principles that help us with decision making.
                </Collapse>
                <Collapse eyebrow="02" title="Workshops">
                  I designed and facilitated a vision alignment workshop and
                  a use case prioritization workshop to build consensus
                  across teams. Engineering partners sat in Ecosystem,
                  GenAI, Editing Platform, Ripple, and DMS. Product partners
                  sat in T&E, Media Platform, and User Platform.
                </Collapse>
                <Collapse eyebrow="03" title="Prototypes">
                  I led the creation of comprehensive prototypes covering 3
                  distinct user flows. The brand application prototype
                  demonstrated intelligent application of guidelines. The
                  multi-format resize prototype showed content
                  prioritization across different aspect ratios. Specs had
                  to line up with real API constraints, not wishful
                  thinking. I vibe-coded high-fidelity interactive
                  prototypes and ran tests with 16 users to validate the
                  interaction patterns before we committed them to the
                  roadmap. I also partnered directly with OpenAI product
                  and partnerships teams, influencing Canva&apos;s native
                  ChatGPT connector and shipping the Deep Research
                  connector.
                </Collapse>
                <Collapse eyebrow="04" title="How we stayed aligned">
                  Monday Async Snapshots: visual updates of weekly focus
                  areas, required decisions, and achievements. Weekly Live
                  Project Syncs: working sessions to resolve blockers and
                  make technical decisions. Fortnightly Design Syncs: deep
                  dives into design explorations and user insights.
                  Leadership Pulse updates: three-bullet summaries for
                  executives.
                </Collapse>
              </div>
            </Section>

            <Section id="outcome" title="Outcome">
              <CaseCarousel
                caption="What shipped, examples from ChatGPT."
                tint={cs.tint}
                tone={cs.tone}
                slides={[
                  {
                    src: "/work/canva-ai/outcome-1.png",
                    alt: "ChatGPT conversation with a Canva sales pitch deck draft",
                  },
                  {
                    src: "/work/canva-ai/outcome-2.png",
                    alt: "Canva apply brand kit modal",
                  },
                  {
                    src: "/work/canva-ai/outcome-3.png",
                    alt: "Canva styles picker on a presentation outline",
                  },
                  {
                    src: "/work/canva-ai/outcome-4.png",
                    alt: "ChatGPT with a generated Canva design",
                  },
                  {
                    src: "/work/canva-ai/outcome-5.png",
                    alt: "Canva editor with a generated presentation slide",
                  },
                ]}
              />
              <Prose>
                <p>
                  What shipped: AI-first flows for people using assistants.
                  Integration patterns and API calls other teams could
                  borrow. Enough alignment between GenAI and platform
                  engineering that we could actually move under a really
                  tight timeline.
                </p>
              </Prose>
              <div className="grid gap-4 sm:grid-cols-2">
                <OutcomeCard eyebrow="Live" title="Shipped in three assistants">
                  Cross-platform integration with ChatGPT, Claude and Gemini
                  by February 2026.
                </OutcomeCard>
                <OutcomeCard eyebrow="MCP" title="Concept to MVP in 5 weeks">
                  MCP concept to MVP in 5 weeks.
                </OutcomeCard>
                <OutcomeCard eyebrow="System" title="A scalable design system">
                  Modular patterns adaptable to different AI interfaces, so
                  other teams could borrow the integration patterns.
                </OutcomeCard>
                <OutcomeCard eyebrow="Handoff" title="Context preserved">
                  We preserved full context across platform transitions.
                </OutcomeCard>
              </div>
            </Section>

            <Section id="impact" title="Impact">
              <div className="grid gap-4 sm:grid-cols-2">
                <Stat
                  value="1 to 3"
                  label="Iterations possible"
                  caption="Steps possible with different features unlocking multiturn interactions."
                />
                <Stat
                  value="8"
                  label="APIs"
                  caption="Eight new Canva APIs shaped directly by design requirements."
                />
                <Stat
                  value="32%"
                  label="MoM MAU"
                  caption="Monthly active users of the Canva app in ChatGPT grew 32% month on month in the nine months after launch."
                />
                <Stat
                  value="+14%"
                  label="Click-through"
                  caption="Click-through from assistant to Canva rose 14%. Iteration depth went from one cycle to three before handoff."
                />
              </div>
              <div className="flex max-w-[720px] flex-col gap-3">
                <Collapse title="Challenges and lessons">
                  Balancing Canva&apos;s brand expression within ChatGPT and
                  Claude&apos;s interface constraints required creative
                  compromise. I treated the project as a series of
                  integrated experiments with regular integration points,
                  allowing teams to maintain momentum even when dependencies
                  were blocked. Early and frequent engineering collaboration
                  was essential for managing API complexity while
                  maintaining user experience quality. I developed an
                  &ldquo;MVP magic&rdquo; framework: delivering the minimum
                  viable capability that still felt magical to users.
                </Collapse>
                <Collapse title="What this changed for me">
                  The most critical design decisions weren&apos;t about
                  individual features, but about the transition points
                  between AI assistance and human control. This project
                  shifted my perspective from feature-focused design to
                  ecosystem-focused design thinking. Design for workflows,
                  not features. Users don&apos;t want another tool, they
                  want their existing workflows enhanced.
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

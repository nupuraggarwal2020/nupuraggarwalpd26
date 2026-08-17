export const email = "nupur.aggarwal92@gmail.com";
export const linkedin = "https://linkedin.com/in/nupuraggarwal92";
export const instagram = "https://www.instagram.com/nupurrrrs/";

export type CaseStudy = {
  slug: string;
  label: string;
  year: string;
  heading: string;
  subheading: string;
  proof: string[];
  role: string;
  /** Soft tint for the visual area */
  tint: string;
  /** Stronger tone for panels inside the visual area */
  tone: string;
};

export const mainCases: CaseStudy[] = [
  {
    slug: "canva-ai",
    label: "Canva AI",
    year: "2025",
    heading: "From single prompt to on-brand design",
    subheading:
      "Designing for Canva's generative AI inside ChatGPT, Claude and Gemini. People generate, edit and apply brand kits without leaving the conversation.",
    proof: [
      "Live in ChatGPT, Claude and Gemini",
      "32% MoM MAU after launch",
      "MCP concept to MVP in 5 weeks",
    ],
    role: "Senior Product Designer · Canva · 2025-2026",
    tint: "#eef4d9",
    tone: "#b8d94e",
  },
  {
    slug: "security-in-jira",
    label: "Security in Jira",
    year: "2023",
    heading: "Giving security work a home in Jira",
    subheading:
      "Researched and shipped a new surface where developers and security tools track vulnerabilities together, from scan to fix.",
    proof: ["0 → 1 surface", "Research-led", "Scan to fix in one place"],
    role: "Senior Product Designer · Atlassian · 2023",
    tint: "#e4eefb",
    tone: "#6fa8e8",
  },
  {
    slug: "smart-devops",
    label: "Smart DevOps",
    year: "2022",
    heading: "Bringing code visibility to the Jira board",
    subheading:
      "Three shipped experiences that cut context switching for millions of developers who use Jira: code review swimlanes, smart hover cards, and a unified index of development work.",
    proof: [
      "3 shipped experiences",
      "+4% interaction lift in week one",
      "Full keyboard and screen-reader support",
    ],
    role: "Product Designer II · Atlassian · 2022",
    tint: "#ece7fb",
    tone: "#9b83e8",
  },
  {
    slug: "pipelines-vision",
    label: "Bitbucket Pipelines",
    year: "2021",
    heading: "Setting a multi-year direction for CI/CD in Bitbucket",
    subheading:
      "A two-week sprint to a validated vision, design principles, and a prioritised multi-year roadmap for CI/CD.",
    proof: [
      "2-week sprint",
      "40% time-to-first-build",
      "18-month roadmap",
      "10M+ developers",
    ],
    role: "Product Designer · Atlassian · 2021",
    tint: "#fdeadd",
    tone: "#f0964e",
  },
];

export type MoreProject = {
  slug: string;
  heading: string;
  subheading: string;
  role: string;
  tone: string;
  comingSoon?: boolean;
};

export const moreProjects: MoreProject[] = [
  {
    slug: "archetypes",
    heading: "One shared language for Canva's developer ecosystem",
    subheading:
      "Research-built behavioural archetypes now used across design, research, product and marketing.",
    role: "Senior Product Designer · Canva · 2024",
    tone: "#b8d94e",
    comingSoon: true,
  },
  {
    slug: "runners",
    heading: "Multi-platform design for Bitbucket Pipelines runners",
    subheading:
      "Crawl, walk, run: a phased design of self-hosted CI/CD from Linux to Windows and macOS.",
    role: "Product Designer · Atlassian · 2020",
    tone: "#6fa8e8",
    comingSoon: true,
  },
  {
    slug: "azure-test-plans",
    heading: "Redesigning Azure Test Plans",
    subheading:
      "A complete redesign of Microsoft's test management suite that lifted daily active users by 25%.",
    role: "Product Designer · Microsoft · 2018",
    tone: "#9b83e8",
    comingSoon: true,
  },
];

export function getCase(slug: string) {
  return (
    mainCases.find((c) => c.slug === slug) ??
    moreProjects.find((c) => c.slug === slug)
  );
}

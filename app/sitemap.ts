import type { MetadataRoute } from "next";
import { mainCases } from "@/lib/content";
import { siteUrl } from "@/lib/site";

const BASE = siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  /* Only the finished case studies: the "coming soon" projects stay out
     until they have real content. */
  const cases = mainCases.map((c) => ({
    url: `${BASE}/work/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/playground`, changeFrequency: "monthly", priority: 0.5 },
    ...cases,
  ];
}

import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { POLICIES } from "@/data/content";
import { CITIES } from "@/data/areas";

// Bump when page content changes, so crawlers see a real lastModified instead of "now" on every request.
const UPDATED = new Date("2026-10-02");

const PAGES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/plans", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/taxi-service", priority: 0.9, changeFrequency: "monthly" },
  ...CITIES.map((c) => ({ path: `/taxi-service/${c.slug}`, priority: c.top ? 0.8 : 0.7, changeFrequency: "monthly" as const })),
  ...POLICIES.map((p) => ({ path: `/policies/${p.slug}`, priority: 0.3, changeFrequency: "yearly" as const })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: `${SITE.url}${p.path}`, lastModified: UPDATED, changeFrequency: p.changeFrequency, priority: p.priority }));
}

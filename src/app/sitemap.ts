import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projectSlug } from "@/lib/portfolio";
import { getPortfolioData } from "@/lib/server/portfolio";

export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getPortfolioData();
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: site.url + "/resume", changeFrequency: "monthly", priority: 0.7 },
    ...data.projects.map(project => ({ url: site.url + "/projects/" + projectSlug(project), changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}

import type { MetadataRoute } from "next";
import { getPostSlugs, getProjectSlugs } from "@/sanity/lib/content";
import { siteUrl } from "@/sanity/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, postSlugs] = await Promise.all([getProjectSlugs(), getPostSlugs()]);

  const staticRoutes = ["", "/about", "/projects", "/blog", "/contact"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = postSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}

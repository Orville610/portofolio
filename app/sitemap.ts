import type { MetadataRoute } from "next";
import { getPostSlugs, getProjectSlugs } from "@/sanity/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, postSlugs] = await Promise.all([getProjectSlugs(), getPostSlugs()]);

  const staticRoutes = ["", "/about", "/projects", "/blog", "/contact"].map((route) => ({
    url: `http://localhost:3000${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projectSlugs.map((slug) => ({
    url: `http://localhost:3000/projects/${slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = postSlugs.map((slug) => ({
    url: `http://localhost:3000/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}

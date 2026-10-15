import "server-only";
import { z } from "zod";
import { projectSlug } from "@/lib/portfolio";

const text = z.string().trim().min(1).max(4000);
const optionalText = z.string().trim().max(4000).optional();
const resourceUrl = z.union([z.literal(""), z.url().refine(value => new URL(value).protocol === "https:" && !new URL(value).username && !new URL(value).password, "Use an HTTPS URL")]).optional();
const projectSchema = z.object({
  slug: z.union([z.literal(""), z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(100)]).optional(),
  filename: text.max(100),
  title: text.max(160),
  description: text,
  tags: z.array(text.max(80)).max(30),
  githubUrl: resourceUrl,
  liveUrl: resourceUrl,
  imageUrl: resourceUrl,
  imageAlt: optionalText,
  category: text.max(80),
  problem: optionalText,
  approach: optionalText,
  outcome: optionalText,
});
export const portfolioSchema = z.object({
  settings: z.object({ email: z.email().max(254), profileImageUrl: resourceUrl, resumeUrl: resourceUrl }),
  achievement: z.object({ title: text.max(200), year: text.max(40), organization: text.max(200), description: text, proofUrl: resourceUrl }).nullable().optional(),
  hero: z.object({ firstName: text.max(100), lastName: text.max(100), title: text.max(160), description: text }),
  skills: z.array(text.max(100)).max(60),
  experience: z.array(z.object({ year: text.max(40), role: text.max(160), organization: text.max(200), description: text, iconName: text.max(50) })).max(50),
  projects: z.array(projectSchema).max(50),
  certifications: z.array(z.object({ title: text.max(200), desc: text, issuer: optionalText, issuedAt: optionalText, credentialUrl: resourceUrl })).max(50),
}).superRefine((data, context) => {
  const slugs = new Set<string>();
  data.projects.forEach((project, index) => {
    const slug = projectSlug(project);
    if (!slug || slugs.has(slug)) context.addIssue({ code: "custom", path: ["projects", index, "title"], message: "Use a unique project title or slug" });
    slugs.add(slug);
  });
});

import type { Metadata } from "next";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProjects, getSiteSettings } from "@/sanity/lib/content";
import { buildMetadata } from "@/sanity/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: "Projects",
    description: settings.seo.defaultDescription,
    path: "/projects",
  });
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Projects"
        title="A curated list of portfolio projects"
        description="Gunakan document `project` di Sanity Studio untuk mengatur slug, tech stack, ringkasan, dan status featured."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

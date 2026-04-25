import { BackgroundDecorations } from "@/components/BackgroundDecorations";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getProjects } from "@/sanity/queries";

export const metadata = {
  title: "Projects | Orville Giovanni",
  description: "Modern project grid with categories, technology stack, and featured work.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featuredCount = projects.filter((project) => project.featured).length;

  return (
    <section className="relative overflow-hidden py-20">
      <BackgroundDecorations words={["Projects", "Portfolio"]} />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="Projects"
            title="Modern builds with clear purpose."
            description="A collection of frontend, portfolio, and web app concepts with concise project details and editable CMS content."
          />
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-5">
            <p className="font-mono text-4xl font-black text-orange">{featuredCount}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-muted">
              Featured
            </p>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard index={index} key={project._id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

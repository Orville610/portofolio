import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { imageUrl } from "@/sanity/image";
import { getProjectBySlug, getProjects } from "@/sanity/queries";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return {
    title: project ? `${project.title} | Project` : "Project Detail",
    description: project?.summary ?? "Project detail page.",
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const cover = imageUrl(project.coverImage, "/images/project-dashboard.svg", {
    width: 1400,
    height: 900,
  });

  return (
    <section className="py-16">
      <Container>
        <Link className="inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-orange" href="/projects">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Projects
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.38fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-orange">
              {project.category}
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] text-white sm:text-7xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{project.summary}</p>
          </div>
          <aside className="rounded-[2rem] border border-white/[0.08] bg-surface/75 p-6">
            <p className="font-mono text-sm text-muted">Year</p>
            <p className="mt-1 text-2xl font-black text-white">{project.year}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-bold text-white/80" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </aside>
        </div>
        <div className="relative mt-12 overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-card">
          <Image
            src={cover}
            alt={`${project.title} cover`}
            width={1400}
            height={900}
            priority
            className="aspect-[1.65] object-cover"
          />
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.7fr_0.3fr]">
          <article className="rounded-[2rem] border border-white/[0.08] bg-surface/75 p-7 sm:p-9">
            <h2 className="text-3xl font-black text-white">Project Overview</h2>
            <p className="mt-5 leading-8 text-muted">{project.description}</p>
          </article>
          <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.035] p-7">
            <h2 className="text-2xl font-black text-white">Links</h2>
            <div className="mt-6 grid gap-3">
              <Button href={project.liveUrl || "#"} className="w-full">
                Live Demo
                <ExternalLink className="ml-2 size-4" aria-hidden="true" />
              </Button>
              <Button href={project.githubUrl || "#"} className="w-full" variant="secondary">
                GitHub
                <GitBranch className="ml-2 size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

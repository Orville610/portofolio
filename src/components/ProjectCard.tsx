import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { imageUrl } from "@/sanity/image";
import type { Project } from "@/sanity/types";

const projectPlaceholders = [
  "/images/project-dashboard.svg",
  "/images/project-portfolio.svg",
  "/images/project-storefront.svg",
  "/images/project-campus.svg",
];

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const fallback = projectPlaceholders[index % projectPlaceholders.length];
  const cover = imageUrl(project.coverImage, fallback, { width: 980, height: 680 });

  return (
    <Link
      className="group overflow-hidden rounded-[2rem] border border-white/[0.08] bg-surface/75 transition duration-300 hover:-translate-y-1 hover:border-orange/[0.45] hover:shadow-[0_0_55px_rgba(255,106,61,0.13)]"
      href={`/projects/${project.slug}`}
    >
      <div className="relative aspect-[1.35] overflow-hidden bg-card">
        <Image
          src={cover}
          alt={`${project.title} cover`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-charcoal/75 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-orange backdrop-blur">
          {project.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-muted">{project.year}</p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">
              {project.title}
            </h3>
          </div>
          <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted transition group-hover:border-orange group-hover:text-orange">
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-4 line-clamp-2 leading-7 text-muted">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-bold text-white/80"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

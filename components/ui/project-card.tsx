import Link from "next/link";
import type { Project } from "@/sanity/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_-50px_rgba(15,23,42,0.55)]">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {project.year}
        </p>
        {project.featured ? (
          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Featured
          </span>
        ) : null}
      </div>
      <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
        <Link href={`/projects/${project.slug}`}>{project.title}</Link>
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{project.excerpt}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.slice(0, 4).map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {item}
          </span>
        ))}
      </div>
      <Link
        href={`/projects/${project.slug}`}
        className="mt-6 inline-flex text-sm font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 transition group-hover:decoration-slate-950"
      >
        Read case study
      </Link>
    </article>
  );
}

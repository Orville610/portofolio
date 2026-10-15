"use client";

import Link from "next/link";
import Image from "next/image";
import BrandIcon from "./BrandIcon";
import { useState } from "react";
import { ArrowUpRight, ExternalLink, Folder, Terminal } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { externalUrl, projectSlug } from "@/lib/portfolio";
import SpotlightCard from "./reactbits/SpotlightCard";

export default function Projects() {
  const { portfolioData: { projects } } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...new Set(projects.map(project => project.category))];
  const category = categories.includes(activeCategory) ? activeCategory : "All";
  const visible = category === "All" ? projects : projects.filter(project => project.category === category);
  return (
    <section id="projects" className="py-6 md:py-10" aria-labelledby="projects-title">
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <h2 id="projects-title" className="flex items-center gap-3 font-headline-md text-2xl font-bold tracking-tight md:text-3xl"><Terminal className="h-6 w-6 shrink-0 text-primary-text" aria-hidden="true" />Featured Projects</h2>
        <div className="flex flex-wrap gap-2" aria-label="Project filters">
          {categories.map(item => <button type="button" key={item} onClick={() => setActiveCategory(item)} aria-label={`Filter projects by ${item}`} aria-pressed={category === item} className={`min-h-11 rounded-full border px-4 text-xs font-semibold transition-colors ${category === item ? "border-primary bg-primary text-on-primary" : "border-outline-variant bg-surface-container-low text-on-surface-variant hover:border-primary-text"}`}>{item}</button>)}
        </div>
      </div>
      <p className="sr-only" role="status">{visible.length} projects shown</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map(project => {
          const github = externalUrl(project.githubUrl);
          const live = externalUrl(project.liveUrl);
          const href = "/projects/" + projectSlug(project);
          return (
            <SpotlightCard key={projectSlug(project)} className="flex h-full flex-col">
              <div className="flex min-h-14 items-center justify-between gap-2 border-b border-outline-variant px-4 py-2">
                <div className="flex min-w-0 items-center gap-2 text-xs text-on-surface-variant">
                  <Folder className="h-4 w-4 shrink-0 text-primary-text" aria-hidden="true" /><span className="break-all font-code-sm">{project.filename}</span>
                </div>
                <div className="flex shrink-0">
                  {github && <a href={github} aria-label={`View GitHub repository for ${project.title}`} className="inline-flex h-11 w-11 items-center justify-center text-on-surface-variant hover:text-primary-text"><BrandIcon name="GitHub" className="h-5 w-5" /></a>}
                  {live && <a href={live} aria-label={`View live demo for ${project.title}`} className="inline-flex h-11 w-11 items-center justify-center text-on-surface-variant hover:text-primary-text"><ExternalLink className="h-5 w-5" aria-hidden="true" /></a>}
                </div>
              </div>
              {externalUrl(project.imageUrl) && <Link href={href} className="relative block aspect-video overflow-hidden border-b border-outline-variant"><Image src={externalUrl(project.imageUrl)!} alt={project.imageAlt || project.title} fill unoptimized sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 90vw" className="object-cover" /></Link>}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-primary-text"><Link href={href} className="hover:underline">{project.title}</Link></h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-on-surface-variant">{project.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="rounded-md border border-outline-variant px-2 py-1 text-xs text-on-surface-variant">{tag}</span>)}</div>
                <Link href={href} className="inline-flex min-h-11 items-center gap-2 border-t border-outline-variant/50 pt-3 text-sm font-semibold text-primary-text" aria-label={`Read project overview for ${project.title}`}>Project overview<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
      {visible.length === 0 && <p className="py-8 text-on-surface-variant">No projects in this category yet.</p>}
    </section>
  );
}

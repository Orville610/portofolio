import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPortfolioData } from "@/lib/server/portfolio";
import { externalUrl, projectSlug } from "@/lib/portfolio";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
async function getProject(params: Props["params"]) {
  const { slug } = await params;
  const data = await getPortfolioData();
  return data.projects.find(project => projectSlug(project) === slug);
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params);
  if (!project) return { title: "Project not found", robots: { index: false } };
  const path = "/projects/" + projectSlug(project);
  return { title: project.title, description: project.description, alternates: { canonical: path }, openGraph: { title: project.title + " | " + site.name, description: project.description, url: path, images: ["/opengraph-image"] } };
}
export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params);
  if (!project) notFound();
  const github = externalUrl(project.githubUrl);
  const demo = externalUrl(project.liveUrl);
  return <>
    <Header resumeUrl={(await getPortfolioData()).settings.resumeUrl} />
    <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-4xl space-y-8 px-5 py-8 outline-none md:py-12">
      <Link href="/#projects" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary-text">← All projects</Link>
      <div className="space-y-4"><p className="font-code-sm text-sm text-primary-text">{project.category} / {project.filename}</p><h1 className="font-headline-md text-3xl font-bold leading-tight md:text-4xl">{project.title}</h1><p className="text-lg leading-relaxed text-on-surface-variant">{project.description}</p></div>
      {externalUrl(project.imageUrl) && <div className="relative aspect-video overflow-hidden rounded-lg border border-outline-variant"><Image src={externalUrl(project.imageUrl)!} alt={project.imageAlt || project.title} fill unoptimized sizes="(min-width: 896px) 856px, 95vw" className="object-contain" /></div>}
      {project.problem && <section><h2 className="mb-3 text-xl font-bold">The goal</h2><p className="leading-relaxed text-on-surface-variant">{project.problem}</p></section>}
      {project.approach && <section><h2 className="mb-3 text-xl font-bold">My approach</h2><p className="whitespace-pre-line leading-relaxed text-on-surface-variant">{project.approach}</p></section>}
      {project.outcome && <section><h2 className="mb-3 text-xl font-bold">The result</h2><p className="leading-relaxed text-on-surface-variant">{project.outcome}</p></section>}
      <section><h2 className="mb-4 text-xl font-bold">Tools used</h2><ul className="flex flex-wrap gap-3">{project.tags.map(tag => <li key={tag} className="rounded border border-outline-variant px-3 py-2 text-sm">{tag}</li>)}</ul></section>
      <div className="flex flex-wrap gap-3">{github && <a href={github} className="inline-flex min-h-11 items-center rounded bg-primary px-4 text-sm font-semibold text-on-primary">View repository ↗</a>}{demo && <a href={demo} className="inline-flex min-h-11 items-center rounded border border-outline-variant px-4 text-sm">View demo ↗</a>}<Link href="/#contact" className="inline-flex min-h-11 items-center rounded border border-outline-variant px-4 text-sm">Discuss this project</Link></div>
    </main>
    <Footer />
  </>;
}

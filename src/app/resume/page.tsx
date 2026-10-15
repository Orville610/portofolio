import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrintResume from "@/components/PrintResume";
import { getPortfolioData } from "@/lib/server/portfolio";
import { externalUrl, projectSlug } from "@/lib/portfolio";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Resume", description: site.description, alternates: { canonical: "/resume" },
  openGraph: { title: site.name + " — Resume", url: "/resume", description: site.description, images: ["/opengraph-image"] },
};
export default async function ResumePage() {
  const data = await getPortfolioData();
  return <>
    <Header resumeUrl={data.settings.resumeUrl} />
    <main id="main-content" tabIndex={-1} className="resume-sheet mx-auto w-full max-w-4xl space-y-8 px-5 py-8 outline-none md:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden"><Link href="/" className="inline-flex min-h-11 items-center text-primary-text">← Portfolio</Link><PrintResume /></div>
      <header className="space-y-3 border-b border-outline-variant pb-6">
        <h1 className="font-headline-md text-3xl font-bold">{data.hero.firstName} {data.hero.lastName}</h1>
        <p className="text-xl text-primary-text">{data.hero.title}</p>
        <p className="text-sm text-on-surface-variant">Makassar, Indonesia · <a href={`mailto:${data.settings.email}`}>{data.settings.email}</a></p>
        <p className="break-words text-sm"><a href={site.github} className="text-primary-text">GitHub</a> · <a href={site.linkedin} className="text-primary-text">LinkedIn</a> · <a href={site.url} className="text-primary-text">{site.url}</a></p>
      </header>
      <section><h2 className="mb-3 text-xl font-bold">Profile</h2><p className="leading-relaxed text-on-surface-variant">{data.hero.description}</p></section>
      <section><h2 className="mb-3 text-xl font-bold">Technical skills</h2><p className="leading-relaxed text-on-surface-variant">{data.skills.join(" · ")}</p></section>
      <section className="space-y-5"><h2 className="text-xl font-bold">Selected projects</h2>{data.projects.map(project => <article key={projectSlug(project)}>
        <h3 className="font-semibold"><Link href={"/projects/" + projectSlug(project)}>{project.title}</Link></h3>
        <p className="my-1 text-sm text-primary-text">{project.tags.join(" · ")}</p><p className="text-sm leading-relaxed text-on-surface-variant">{project.description}</p>
        {externalUrl(project.githubUrl) && <a href={externalUrl(project.githubUrl)} className="text-sm text-primary-text">Repository ↗</a>}
      </article>)}</section>
      <section className="space-y-5"><h2 className="text-xl font-bold">Experience &amp; leadership</h2>{data.experience.map((item, index) => <article key={item.organization + index}><h3 className="font-semibold">{item.role} — {item.organization}</h3><p className="my-1 text-sm text-primary-text">{item.year}</p><p className="text-sm leading-relaxed text-on-surface-variant">{item.description}</p></article>)}</section>
      <section className="space-y-3"><h2 className="text-xl font-bold">Learning &amp; certifications</h2>{data.certifications.map((cert, index) => <article key={cert.title + index}><h3 className="font-semibold">{cert.title}</h3><p className="text-sm text-on-surface-variant">{cert.desc}</p>{cert.issuedAt && <p className="text-sm">{cert.issuedAt}</p>}{externalUrl(cert.credentialUrl) && <a href={externalUrl(cert.credentialUrl)} className="text-sm text-primary-text">Verify credential ↗</a>}</article>)}</section>
    </main>
    <Footer />
  </>;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableTextContent } from "@/components/ui/portable-text-content";
import { getProjectBySlug, getProjectSlugs, getSiteSettings } from "@/sanity/lib/content";
import { buildMetadata } from "@/sanity/lib/metadata";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProjectBySlug(slug),
    getSiteSettings(),
  ]);

  if (!project) {
    return buildMetadata({
      title: "Project not found",
      description: settings.seo.defaultDescription,
      path: `/projects/${slug}`,
    });
  }

  return buildMetadata({
    title: project.title,
    description: project.excerpt,
    path: `/projects/${slug}`,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
          Project
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
          {project.title}
        </h1>
        <p className="text-lg leading-8 text-slate-600">{project.excerpt}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-base font-semibold text-slate-950">Overview</h2>
          <dl className="mt-5 space-y-4 text-sm text-slate-600">
            <div>
              <dt className="font-medium text-slate-500">Year</dt>
              <dd className="mt-1 text-slate-950">{project.year}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Role</dt>
              <dd className="mt-1 text-slate-950">{project.role}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.techStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-col gap-3">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Live demo
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Repository
              </a>
            ) : null}
          </div>
        </aside>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)]">
          <PortableTextContent value={project.body} />
        </div>
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableTextContent } from "@/components/ui/portable-text-content";
import { getPostBySlug, getPostSlugs, getSiteSettings } from "@/sanity/lib/content";
import { buildMetadata } from "@/sanity/lib/metadata";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSiteSettings()]);

  if (!post) {
    return buildMetadata({
      title: "Post not found",
      description: settings.seo.defaultDescription,
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
          {new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(post.publishedAt))}
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
          {post.title}
        </h1>
        <p className="text-lg leading-8 text-slate-600">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)] sm:p-8">
        <PortableTextContent value={post.body} />
      </div>
    </article>
  );
}

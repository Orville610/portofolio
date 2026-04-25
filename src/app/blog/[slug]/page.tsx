import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { imageUrl } from "@/sanity/image";
import { getPostBySlug, getPosts } from "@/sanity/queries";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 text-3xl font-black tracking-[-0.03em] text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-2xl font-black text-white">{children}</h3>
    ),
    normal: ({ children }) => <p className="mt-5 leading-8 text-muted">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        className="font-bold text-orange underline decoration-orange/40 underline-offset-4"
        href={value?.href}
        rel="noreferrer"
        target="_blank"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-3 pl-6 text-muted">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-3 pl-6 text-muted">{children}</ol>
    ),
  },
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: post ? `${post.title} | Blog` : "Blog Detail",
    description: post?.excerpt ?? "Blog detail page.",
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const cover = imageUrl(post.coverImage, "/images/project-portfolio.svg", {
    width: 1400,
    height: 900,
  });

  return (
    <article className="py-16">
      <Container className="max-w-5xl">
        <Link className="inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-orange" href="/blog">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Blog
        </Link>
        <header className="mt-8">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-orange">
            {post.category}
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] text-white sm:text-7xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
            <span className="flex items-center gap-2">
              <CalendarDays className="size-4 text-orange" aria-hidden="true" />
              {new Date(post.publishedAt).toLocaleDateString("en", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-orange" aria-hidden="true" />
              {post.readingTime}
            </span>
          </div>
        </header>
        <div className="relative mt-10 overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-card">
          <Image
            src={cover}
            alt={`${post.title} cover`}
            width={1400}
            height={900}
            priority
            className="aspect-[1.7] object-cover"
          />
        </div>
        <div className="mt-10 rounded-[2rem] border border-white/[0.08] bg-surface/75 p-7 sm:p-10">
          {post.body?.length ? (
            <PortableText components={portableTextComponents} value={post.body} />
          ) : (
            <p className="leading-8 text-muted">
              This article is ready for rich text content from Sanity Studio.
            </p>
          )}
        </div>
      </Container>
    </article>
  );
}

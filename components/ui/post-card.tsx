import Link from "next/link";
import type { Post } from "@/sanity/lib/types";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)]">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
        {new Intl.DateTimeFormat("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(new Date(post.publishedAt))}
      </p>
      <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-6 inline-flex text-sm font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-950"
      >
        Read article
      </Link>
    </article>
  );
}

import { CalendarDays, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BackgroundDecorations } from "@/components/BackgroundDecorations";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { imageUrl } from "@/sanity/image";
import { getPosts } from "@/sanity/queries";

export const metadata = {
  title: "Blog | Orville Giovanni",
  description: "Articles and notes from Orville Giovanni.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="relative overflow-hidden py-20">
      <BackgroundDecorations words={["Blog", "Notes"]} />
      <Container className="relative">
        <SectionHeading
          eyebrow="Blog"
          title="Writing about frontend, design, and CMS workflows."
          description="Short articles and learning notes that document how I think through modern web interfaces."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => {
            const cover = imageUrl(
              post.coverImage,
              index % 2 === 0 ? "/images/project-portfolio.svg" : "/images/project-dashboard.svg",
              { width: 1000, height: 640 },
            );

            return (
              <Link
                className="group overflow-hidden rounded-[2rem] border border-white/[0.08] bg-surface/75 transition duration-300 hover:-translate-y-1 hover:border-orange/[0.45]"
                href={`/blog/${post.slug}`}
                key={post._id}
              >
                <div className="relative aspect-[1.65] overflow-hidden bg-card">
                  <Image
                    src={cover}
                    alt={`${post.title} cover`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-orange">
                    {post.category}
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white">
                    {post.title}
                  </h2>
                  <p className="mt-4 leading-8 text-muted">{post.excerpt}</p>
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
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

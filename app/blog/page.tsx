import type { Metadata } from "next";
import { PostCard } from "@/components/ui/post-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPosts, getSiteSettings } from "@/sanity/lib/content";
import { buildMetadata } from "@/sanity/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: "Blog",
    description: settings.seo.defaultDescription,
    path: "/blog",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Articles"
        title="Thoughts on design, code, and career growth"
        description="Document `post` di Sanity Studio mendukung slug, excerpt, published date, tags, dan isi artikel berbasis Portable Text."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { SiteIntroStats } from "@/components/ui/site-intro-stats";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { PostCard } from "@/components/ui/post-card";
import {
  getFeaturedProjects,
  getProfile,
  getRecentPosts,
  getSiteSettings,
} from "@/sanity/lib/content";

export const revalidate = 60;

export default async function HomePage() {
  const [profile, siteSettings, featuredProjects, recentPosts] = await Promise.all([
    getProfile(),
    getSiteSettings(),
    getFeaturedProjects(),
    getRecentPosts(),
  ]);

  return (
    <div className="space-y-20 pb-8">
      <section className="grid gap-10 rounded-[2rem] border border-white/60 bg-white/80 px-6 py-10 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur md:grid-cols-[1.5fr_0.9fr] md:px-10 md:py-14">
        <div className="space-y-6">
          <p className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
            {siteSettings.tagline}
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {profile.headline}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              {profile.shortBio}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              Contact me
            </Link>
          </div>
        </div>
        <SiteIntroStats
          skillsCount={profile.skills.length}
          experienceCount={profile.experience.length}
          featuredCount={featuredProjects.length}
        />
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Featured work"
            title="Selected projects that show process and execution"
            description="Pin project unggulan dari Sanity Studio untuk menonjolkan case study utama di homepage."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
        <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
          <SectionHeading
            eyebrow="About"
            title="Short bio"
            description={profile.bio}
          />
          <div className="flex flex-wrap gap-2">
            {profile.skills.slice(0, 6).map((skill) => (
              <span
                key={skill.slug}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700"
              >
                {skill.name}
              </span>
            ))}
          </div>
          <Link
            href="/about"
            className="inline-flex text-sm font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-950"
          >
            Read full profile
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Writing"
          title="Recent posts"
          description="Artikel terbaru dirender statis dan direvalidasi otomatis, cocok untuk blog portfolio yang ringan."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-10 text-white md:px-10">
        <SectionHeading
          eyebrow="Contact"
          title="Open for selected freelance, internships, or collaborations"
          description={siteSettings.contactIntro}
          invert
        />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={`mailto:${siteSettings.email}`}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            {siteSettings.email}
          </a>
          <a
            href={siteSettings.socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
          >
            GitHub profile
          </a>
        </div>
      </section>
    </div>
  );
}

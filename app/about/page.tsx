import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProfile, getSiteSettings } from "@/sanity/lib/content";
import { buildMetadata } from "@/sanity/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: "About",
    description: settings.seo.defaultDescription,
    path: "/about",
  });
}

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <div className="space-y-12">
      <section className="max-w-3xl space-y-5">
        <SectionHeading
          eyebrow="About"
          title={profile.name}
          description={profile.bio}
        />
        <p className="text-base leading-8 text-slate-600">{profile.longBio}</p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-950">Skills</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {profile.skills.map((skill) => (
              <span
                key={skill.slug}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-950">Experience</h2>
          <div className="space-y-4">
            {profile.experience.map((item) => (
              <article
                key={item.slug}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.5)]"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">{item.role}</h3>
                    <p className="text-sm text-slate-600">{item.company}</p>
                  </div>
                  <p className="text-sm font-medium text-slate-500">{item.period}</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProfile, getSiteSettings } from "@/sanity/lib/content";
import { buildMetadata } from "@/sanity/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: "Contact",
    description: settings.contactIntro,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const [profile, siteSettings] = await Promise.all([getProfile(), getSiteSettings()]);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="space-y-4">
        <SectionHeading
          eyebrow="Contact"
          title="Reach out for work, collaboration, or a quick intro"
          description={siteSettings.contactIntro}
        />
        <p className="text-base leading-8 text-slate-600">{profile.shortBio}</p>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)]">
        <dl className="space-y-5 text-sm text-slate-600">
          <div>
            <dt className="font-medium uppercase tracking-[0.18em] text-slate-500">Email</dt>
            <dd className="mt-2 text-base font-semibold text-slate-950">
              <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>
            </dd>
          </div>
          <div>
            <dt className="font-medium uppercase tracking-[0.18em] text-slate-500">Location</dt>
            <dd className="mt-2 text-base text-slate-950">{siteSettings.location}</dd>
          </div>
          <div>
            <dt className="font-medium uppercase tracking-[0.18em] text-slate-500">Social</dt>
            <dd className="mt-2 flex flex-wrap gap-3">
              <a
                href={siteSettings.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                GitHub
              </a>
              <a
                href={siteSettings.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                LinkedIn
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

import { Briefcase, GraduationCap, MapPin } from "lucide-react";

import { BackgroundDecorations } from "@/components/BackgroundDecorations";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillBadge } from "@/components/SkillBadge";
import {
  getEducation,
  getExperiences,
  getProfile,
  getSkills,
} from "@/sanity/queries";

export const metadata = {
  title: "About | Orville Giovanni",
  description: "Bio, education, experience, and skills for Orville Giovanni.",
};

export default async function AboutPage() {
  const [profile, education, experiences, skills] = await Promise.all([
    getProfile(),
    getEducation(),
    getExperiences(),
    getSkills(),
  ]);

  return (
    <section className="relative overflow-hidden py-20">
      <BackgroundDecorations words={["About", "Profile"]} />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="About"
              title="A frontend-focused informatics student."
              description={profile.shortBio}
            />
            <p className="mt-6 leading-8 text-muted">{profile.bio}</p>
            <div className="mt-8 grid gap-3 text-sm text-muted">
              <p className="flex items-center gap-3">
                <MapPin className="size-5 text-orange" aria-hidden="true" />
                {profile.location}
              </p>
              <p className="flex items-center gap-3">
                <Briefcase className="size-5 text-orange" aria-hidden="true" />
                {profile.role}
              </p>
            </div>
            <div className="mt-8">
              <Button href={profile.cvUrl || "#"}>Download CV</Button>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-white/[0.08] bg-surface/75 p-6">
              <div className="mb-5 flex items-center gap-3">
                <GraduationCap className="size-6 text-orange" aria-hidden="true" />
                <h2 className="text-2xl font-black text-white">Education</h2>
              </div>
              <div className="grid gap-5">
                {education.map((item) => (
                  <article key={item._id} className="border-l border-orange/40 pl-5">
                    <p className="font-mono text-sm text-orange">{item.period}</p>
                    <h3 className="mt-2 text-xl font-black text-white">{item.degree}</h3>
                    <p className="mt-1 font-bold text-white/80">{item.institution}</p>
                    <p className="mt-3 leading-7 text-muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/[0.08] bg-surface/75 p-6">
              <div className="mb-5 flex items-center gap-3">
                <Briefcase className="size-6 text-orange" aria-hidden="true" />
                <h2 className="text-2xl font-black text-white">Experience</h2>
              </div>
              <div className="grid gap-5">
                {experiences.map((item) => (
                  <article key={item._id} className="border-l border-purple-glow/50 pl-5">
                    <p className="font-mono text-sm text-orange">{item.period}</p>
                    <h3 className="mt-2 text-xl font-black text-white">{item.role}</h3>
                    <p className="mt-1 font-bold text-white/80">{item.company}</p>
                    <p className="mt-3 leading-7 text-muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Skills & Tools"
            title="A practical stack for modern interfaces."
            align="center"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => (
              <SkillBadge key={skill._id} skill={skill} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

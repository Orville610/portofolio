import { AboutPreview } from "@/components/AboutPreview";
import { ContactCTA } from "@/components/ContactCTA";
import { Container } from "@/components/Container";
import { HeroSection } from "@/components/HeroSection";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { SkillBadge } from "@/components/SkillBadge";
import { StatItem } from "@/components/StatItem";
import {
  getFeaturedProjects,
  getProfile,
  getServices,
  getSkills,
  getSocialLinks,
  getStats,
} from "@/sanity/queries";

export default async function Home() {
  const [profile, services, featuredProjects, skills, stats, socialLinks] =
    await Promise.all([
      getProfile(),
      getServices(),
      getFeaturedProjects(),
      getSkills(),
      getStats(),
      getSocialLinks(),
    ]);

  return (
    <>
      <HeroSection profile={profile} socialLinks={socialLinks} />

      <section className="relative py-20" id="services">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Services"
              title="Focused services for modern web presence."
              description="Clean design, reliable implementation, and CMS-ready content systems for personal brands and digital products."
            />
          </div>
          <div className="grid gap-4">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20" id="about">
        <Container>
          <AboutPreview profile={profile} />
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatItem key={stat._id} stat={stat} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20" id="projects">
        <Container>
          <div className="mb-10">
            <SectionHeading
              eyebrow="Featured Projects"
              title="Selected work with sharp visual systems."
              description="A curated set of interface and frontend projects built around clarity, speed, and memorable visual direction."
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard index={index} key={project._id} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading
              eyebrow="Skills"
              title="Tools I use to move from idea to interface."
              description="The current stack focuses on frontend development, responsive design, and content editing workflows."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => (
                <SkillBadge key={skill._id} skill={skill} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="pb-24 pt-10">
        <ContactCTA />
      </Container>
    </>
  );
}

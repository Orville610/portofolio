import { ArrowRight } from "lucide-react";

import { BackgroundDecorations } from "@/components/BackgroundDecorations";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DynamicIcon } from "@/components/DynamicIcon";
import { SectionHeading } from "@/components/SectionHeading";
import { getServices } from "@/sanity/queries";

export const metadata = {
  title: "Services | Orville Giovanni",
  description: "Website design, UI/UX design, frontend development, and web app development services.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <section className="relative overflow-hidden py-20">
      <BackgroundDecorations words={["Services", "Build"]} />
      <Container className="relative">
        <SectionHeading
          eyebrow="Services"
          title="Design and development services with a premium finish."
          description="Each service is shaped for a clean portfolio, startup website, or web app interface that needs to look credible and work well."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article
              className="group rounded-[2rem] border border-white/[0.08] bg-surface/75 p-7 transition duration-300 hover:-translate-y-1 hover:border-orange/[0.45] hover:shadow-[0_0_55px_rgba(255,106,61,0.13)]"
              key={service._id}
            >
              <div className="flex items-start justify-between gap-5">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-orange/10 text-orange">
                  <DynamicIcon className="size-6" name={service.icon} />
                </span>
                <span className="flex size-10 items-center justify-center rounded-full border border-white/10 text-muted transition group-hover:border-orange group-hover:text-orange">
                  <ArrowRight className="size-5" aria-hidden="true" />
                </span>
              </div>
              <h2 className="mt-8 text-3xl font-black tracking-[-0.04em] text-white">
                {service.title}
              </h2>
              <p className="mt-4 leading-8 text-muted">{service.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-[2rem] border border-white/[0.08] bg-white/[0.035] p-8 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-orange">Workflow</p>
              <h2 className="mt-3 text-3xl font-black text-white">Brief, structure, design direction, then build.</h2>
              <p className="mt-3 leading-8 text-muted">
                I keep the process lean: clarify the goal, create a visual direction, build reusable sections, then prepare the site for content updates.
              </p>
            </div>
            <Button href="/contact">Discuss a Project</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

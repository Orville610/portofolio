import { GitBranch, Globe, Mail, MapPin, Phone, Send } from "lucide-react";

import { BackgroundDecorations } from "@/components/BackgroundDecorations";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { getProfile, getSocialLinks } from "@/sanity/queries";

export const metadata = {
  title: "Contact | Orville Giovanni",
  description: "Contact information and form UI for Orville Giovanni.",
};

export default async function ContactPage() {
  const [profile, socialLinks] = await Promise.all([getProfile(), getSocialLinks()]);

  return (
    <section className="relative overflow-hidden py-20">
      <BackgroundDecorations words={["Contact", "Hello"]} />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Tell me what you want to build next."
              description="The form is UI-only for now. Use the email or social links for real contact until backend email is connected."
            />
            <div className="mt-10 grid gap-4">
              <a className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 text-muted transition hover:border-orange hover:text-white" href={`mailto:${profile.email}`}>
                <Mail className="size-5 text-orange" aria-hidden="true" />
                {profile.email}
              </a>
              <p className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 text-muted">
                <Phone className="size-5 text-orange" aria-hidden="true" />
                {profile.phone}
              </p>
              <p className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 text-muted">
                <MapPin className="size-5 text-orange" aria-hidden="true" />
                {profile.location}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon =
                  social.icon === "linkedin" ? Globe : social.icon === "github" ? GitBranch : Mail;

                return (
                  <a
                    className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm font-bold text-muted transition hover:border-orange hover:text-orange"
                    href={social.url}
                    key={social._id}
                    rel="noreferrer"
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </div>

          <form className="rounded-[2rem] border border-white/[0.08] bg-surface/80 p-6 shadow-[0_0_80px_rgba(124,58,237,0.08)] sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-white">
                Name
                <input
                  className="min-h-13 rounded-2xl border border-white/[0.08] bg-charcoal px-4 text-white outline-none transition placeholder:text-muted focus:border-orange"
                  placeholder="Your name"
                  type="text"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-white">
                Email
                <input
                  className="min-h-13 rounded-2xl border border-white/[0.08] bg-charcoal px-4 text-white outline-none transition placeholder:text-muted focus:border-orange"
                  placeholder="you@example.com"
                  type="email"
                />
              </label>
            </div>
            <label className="mt-5 grid gap-2 text-sm font-bold text-white">
              Subject
              <input
                className="min-h-13 rounded-2xl border border-white/[0.08] bg-charcoal px-4 text-white outline-none transition placeholder:text-muted focus:border-orange"
                placeholder="Portfolio website, web app, or UI design"
                type="text"
              />
            </label>
            <label className="mt-5 grid gap-2 text-sm font-bold text-white">
              Message
              <textarea
                className="min-h-40 resize-none rounded-2xl border border-white/[0.08] bg-charcoal px-4 py-4 text-white outline-none transition placeholder:text-muted focus:border-orange"
                placeholder="Share your goal, timeline, and any reference direction."
              />
            </label>
            <Button className="mt-6 w-full" href="#">
              Send Message
              <Send className="ml-2 size-4" aria-hidden="true" />
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { BackgroundDecorations } from "./BackgroundDecorations";
import { Button } from "./Button";
import { Container } from "./Container";
import { DynamicIcon } from "./DynamicIcon";
import { imageUrl } from "@/sanity/image";
import type { Profile, SocialLink } from "@/sanity/types";

type HeroSectionProps = {
  profile: Profile;
  socialLinks: SocialLink[];
};

export function HeroSection({ profile, socialLinks }: HeroSectionProps) {
  const profileImage = imageUrl(profile.profileImage, "/images/profile-placeholder.svg", {
    width: 900,
    height: 1100,
  });

  return (
    <section className="relative isolate overflow-hidden">
      <BackgroundDecorations />
      <Container className="relative grid min-h-[calc(100vh-96px)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-orange/25 bg-orange/10 px-4 py-2 text-xs font-black uppercase tracking-[0.35em] text-orange">
            {profile.introLabel}
          </p>
          <h1 className="max-w-4xl text-6xl font-black leading-[0.92] tracking-[-0.07em] text-white sm:text-7xl lg:text-8xl">
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-bold text-white/[0.85] sm:text-2xl">
            {profile.subtitle}
          </p>
          <p className="mt-5 max-w-2xl leading-8 text-muted">{profile.shortBio}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/projects">
              View Portfolio
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Me
            </Button>
          </div>
          <div className="mt-9 flex items-center gap-4">
            <span className="text-xs font-black uppercase tracking-[0.28em] text-muted">
              Social
            </span>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  className="flex size-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-muted transition hover:-translate-y-0.5 hover:border-orange hover:text-orange"
                  href={social.url}
                  key={social._id}
                  rel="noreferrer"
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  aria-label={social.label}
                >
                  <DynamicIcon className="size-5" name={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-orange/25 via-purple-glow/20 to-blue-glow/25 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="relative overflow-hidden rounded-[2rem] bg-card">
              <Image
                src={profileImage}
                alt={profile.profileImage?.alt ?? `${profile.name} profile placeholder`}
                width={900}
                height={1100}
                priority
                className="aspect-[0.82] object-cover"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-charcoal/[0.70] p-4 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-orange">
                  Available for projects
                </p>
                <p className="mt-2 text-lg font-black text-white">Frontend, UI, and CMS builds</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-5 top-10 hidden rounded-2xl border border-white/10 bg-surface/80 px-5 py-4 shadow-2xl backdrop-blur sm:block">
            <p className="font-mono text-3xl font-black text-orange">12+</p>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Projects</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

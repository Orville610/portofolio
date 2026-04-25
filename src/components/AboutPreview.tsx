import Image from "next/image";

import { Button } from "./Button";
import { SectionHeading } from "./SectionHeading";
import { imageUrl } from "@/sanity/image";
import type { Profile } from "@/sanity/types";

type AboutPreviewProps = {
  profile: Profile;
};

export function AboutPreview({ profile }: AboutPreviewProps) {
  const aboutImage = imageUrl(profile.aboutImage, "/images/about-placeholder.svg", {
    width: 900,
    height: 900,
  });

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative">
        <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-orange/20 via-purple-glow/[0.15] to-blue-glow/20 blur-2xl" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card">
          <Image
            src={aboutImage}
            alt={profile.aboutImage?.alt ?? `${profile.name} workspace placeholder`}
            width={900}
            height={900}
            className="aspect-square object-cover"
          />
        </div>
      </div>
      <div>
        <SectionHeading
          eyebrow="About Me"
          title="Building clean digital products with a developer mindset."
          description={profile.shortBio}
        />
        <p className="mt-6 leading-8 text-muted">{profile.bio}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/about">More About Me</Button>
          <Button href={profile.cvUrl || "#"} variant="secondary">
            Download CV
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { FolderOpen, Mail } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { externalUrl } from "@/lib/portfolio";

export default function Hero() {
  const { portfolioData: { hero, settings } } = usePortfolio();
  const photo = externalUrl(settings.profileImageUrl);
  return (
    <section aria-label="Introduction" className="relative py-2 md:py-8">
      <div className="grid items-center gap-5 md:grid-cols-12 md:gap-12">
        <div className="relative order-1 mx-auto h-36 w-36 md:order-2 md:col-span-5 md:h-auto md:w-full md:aspect-square sm:h-48 sm:w-48">
          <div className="absolute -inset-3 rounded-full bg-primary/10 blur-2xl" aria-hidden="true" />
          <div className="group relative h-full w-full overflow-hidden rounded-[60%_40%_30%_70%/60%_30%_70%_40%] border border-outline-variant bg-surface-container-low">
            <Image
              src={photo || "/profile.webp"}
              unoptimized={Boolean(photo)}
              alt={hero.firstName + " " + hero.lastName}
              fill
              sizes="(min-width: 1280px) 440px, (min-width: 768px) 40vw, (min-width: 640px) 192px, 144px"
              loading="eager"
              fetchPriority="high"
              className="object-cover object-[center_15%] grayscale transition-[filter,transform] duration-300 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
        </div>
        <div className="relative order-2 flex min-w-0 flex-col items-center gap-4 text-center md:order-1 md:col-span-7 md:items-start md:gap-6 md:text-left">
          <p className="rounded-full border border-secondary/30 bg-secondary-container/20 px-3 py-1 font-code-sm text-xs text-on-secondary-container">WEB / LINUX / CLOUD</p>
          <div className="space-y-2">
            <h1 className="font-headline-lg text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-5xl lg:text-6xl">
              <span className="block text-primary-text">{hero.firstName}</span>
              <span className="block">{hero.lastName}</span>
            </h1>
            <p className="font-headline-md text-base font-semibold text-on-surface-variant md:text-xl">
              <span className="mr-2 text-secondary" aria-hidden="true">&gt;</span>{hero.title}
            </p>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-on-surface-variant md:text-lg">{hero.description}</p>
          <div className="flex w-full gap-3 md:w-auto">
            <a href="#projects" className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-semibold text-on-primary hover:bg-primary/90 md:px-6">
              <FolderOpen className="h-4 w-4" aria-hidden="true" />View Projects
            </a>
            <a href="#contact" className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border border-outline-variant bg-background px-3 text-sm font-semibold text-on-surface hover:bg-surface-container md:px-6">
              <Mail className="h-4 w-4" aria-hidden="true" />Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

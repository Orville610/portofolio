import Link from "next/link";

import { Container } from "./Container";
import { DynamicIcon } from "./DynamicIcon";
import type { SiteSettings, SocialLink } from "@/sanity/types";

type FooterProps = {
  settings: SiteSettings;
  socialLinks: SocialLink[];
};

export function Footer({ settings, socialLinks }: FooterProps) {
  return (
    <footer className="border-t border-white/[0.08] bg-charcoal">
      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Link className="text-xl font-black tracking-[-0.03em] text-white" href="/">
              Orville Giovanni
            </Link>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
              {settings.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                className="flex size-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.035] text-muted transition hover:border-orange hover:text-orange"
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
        <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-white/[0.08] pt-6 text-sm text-muted">
          <p>© 2026 Orville Giovanni. Built with Next.js and Sanity.</p>
          <p>{settings.location}</p>
        </div>
      </Container>
    </footer>
  );
}

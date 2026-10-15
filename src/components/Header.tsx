"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Terminal, X } from "lucide-react";
import { useOptionalPortfolio } from "@/context/PortfolioContext";
import { externalUrl } from "@/lib/portfolio";

const links = [
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certs", href: "#certs" },
  { name: "Contact", href: "#contact" },
];

export default function Header({ resumeUrl }: { resumeUrl?: string }) {
  const context = useOptionalPortfolio();
  const resumeHref = externalUrl(context?.portfolioData.settings.resumeUrl || resumeUrl) || "/resume";
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const hrefFor = (href: string) => pathname === "/" ? href : "/" + href;
  function closeMenu() {
    if (detailsRef.current) detailsRef.current.open = false;
    setIsOpen(false);
  }
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !detailsRef.current?.contains(event.target)) closeMenu();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && detailsRef.current?.open) {
        closeMenu();
        summaryRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/50 bg-background/95 backdrop-blur-md print:hidden">
      <div className="container mx-auto flex h-14 max-w-max-width items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex min-h-11 items-center gap-2 font-headline-md text-xl font-bold text-primary-text" aria-label="Rville home">
          <Terminal className="h-7 w-7" aria-hidden="true" />
          <span>Rville</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm md:flex">
          {links.map(link => <a key={link.href} href={hrefFor(link.href)} className="inline-flex min-h-11 items-center font-label-md text-on-surface-variant hover:text-primary-text">{link.name}</a>)}
        </nav>
        <Link href={resumeHref} className="hidden min-h-11 items-center rounded-md bg-primary px-4 text-sm font-semibold text-on-primary hover:bg-primary/90 md:inline-flex">Resume</Link>
        <details ref={detailsRef} className="md:hidden" onToggle={event => setIsOpen(event.currentTarget.open)}>
          <summary
            ref={summaryRef}
            aria-label={isOpen ? "Close main navigation menu" : "Open main navigation menu"}
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md text-on-surface [&::-webkit-details-marker]:hidden"
          >{isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</summary>
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute inset-x-0 top-full border-b border-outline-variant bg-background px-6 py-4 shadow-xl">
            {links.map(link => <a key={link.href} href={hrefFor(link.href)} onClick={closeMenu} className="flex min-h-12 items-center border-b border-outline-variant/40 font-label-md text-on-surface-variant hover:text-primary-text">{link.name}</a>)}
            <Link href={resumeHref} onClick={closeMenu} className="mt-4 flex min-h-11 items-center justify-center rounded-md bg-primary font-semibold text-on-primary">Resume</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

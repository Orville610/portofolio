import Link from "next/link";

import { Button } from "./Button";
import { Container } from "./Container";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-charcoal/[0.72] backdrop-blur-xl">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <Link className="group flex items-center gap-3" href="/">
            <span className="grid size-11 place-items-center rounded-2xl border border-orange/[0.35] bg-orange/10 font-black text-orange transition group-hover:bg-orange group-hover:text-white">
              OG
            </span>
            <span>
              <span className="block text-sm font-black uppercase tracking-[0.2em] text-white">
                Orville
              </span>
              <span className="block text-xs text-muted">Frontend Portfolio</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                className="text-sm font-bold text-muted transition hover:text-white"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button href="/contact" className="hidden min-h-10 px-5 lg:inline-flex">
            Hire Me
          </Button>
        </div>
        <nav className="mt-4 flex gap-3 overflow-x-auto pb-1 lg:hidden">
          {navItems.map((item) => (
            <Link
              className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-2 text-xs font-bold text-muted"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}

import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/studio", label: "Studio" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-[color:rgba(248,250,252,0.84)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="text-sm font-extrabold uppercase tracking-[0.26em] text-slate-950">
          Portfolio
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

import BrandIcon from "./BrandIcon";
import { site } from "@/lib/site";

const socials = [{ title: "GitHub", href: site.github }, { title: "LinkedIn", href: site.linkedin }, { title: "Instagram", href: site.instagram }] as const;
export default function Footer() {
  return <footer className="mt-10 w-full border-t border-outline-variant bg-background print:hidden">
    <div className="container mx-auto flex max-w-max-width flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-8">
      <p className="font-headline-md font-bold">RVILLE</p>
      <p className="text-center font-code-sm text-xs text-on-surface-variant">© {new Date().getFullYear()} {site.name}</p>
      <nav aria-label="Social links" className="flex gap-2">{socials.map(({ title, href }) => <a key={title} href={href} target="_blank" rel="noopener noreferrer" aria-label={title} className="flex h-11 w-11 items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:text-primary-text"><BrandIcon name={title} className="h-5 w-5" /></a>)}</nav>
    </div>
  </footer>;
}

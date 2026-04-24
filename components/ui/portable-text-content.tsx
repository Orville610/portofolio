import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@/sanity/lib/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-bold tracking-tight text-slate-950">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold tracking-tight text-slate-950">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mt-4 text-base leading-8 text-slate-600">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">{children}</ul>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-slate-950 underline decoration-slate-300 underline-offset-4"
      >
        {children}
      </a>
    ),
  },
};

export function PortableTextContent({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}

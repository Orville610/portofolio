"use client";

import { usePortfolio } from "@/context/PortfolioContext";

export default function Marquee() {
  const { portfolioData: { skills } } = usePortfolio();
  return <section id="skills" className="py-6 md:py-10" aria-labelledby="skills-title">
    <h2 id="skills-title" className="mb-6 font-headline-md text-2xl font-bold md:text-3xl">Tools I work with</h2>
    <ul className="flex flex-wrap gap-3">{skills.map(skill => <li key={skill} className="rounded-md border border-outline-variant bg-surface-container-low/60 px-3 py-2 font-code-sm text-sm text-on-surface-variant"><span className="mr-2 text-primary-text" aria-hidden="true">$</span>{skill}</li>)}</ul>
  </section>;
}

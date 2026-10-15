"use client";

import { Briefcase, ClipboardList, GitBranch, Users } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import SpotlightCard from "./reactbits/SpotlightCard";

const icons = { Users, GitBranch, ClipboardList, Briefcase };
export default function Experience() {
  const { portfolioData: { experience } } = usePortfolio();
  return (
    <section id="experience" className="py-6 md:py-10" aria-labelledby="experience-title">
      <h2 id="experience-title" className="mb-8 flex items-center gap-3 font-headline-md text-2xl font-bold tracking-tight md:text-3xl"><Briefcase className="h-6 w-6 shrink-0 text-primary-text" aria-hidden="true" />Experience &amp; Leadership</h2>
      <ol className="space-y-6 border-l border-outline-variant pl-5 md:pl-8">
        {experience.map((item, index) => {
          const Icon = icons[item.iconName as keyof typeof icons] || Briefcase;
          return <li key={item.organization + index} className="relative">
            <SpotlightCard className="p-5 md:p-6">
              <div className="mb-3 flex items-center gap-3"><Icon className="h-5 w-5 shrink-0 text-primary-text" aria-hidden="true" /><span className="font-code-sm text-xs font-semibold text-primary-text">{item.year}</span></div>
              <h3 className="text-lg font-semibold">{item.role}</h3>
              <p className="mb-3 mt-1 text-sm font-medium text-on-surface-variant">{item.organization}</p>
              <p className="text-sm leading-relaxed text-on-surface-variant">{item.description}</p>
            </SpotlightCard>
          </li>;
        })}
      </ol>
    </section>
  );
}

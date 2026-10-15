"use client";

import { Trophy } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { externalUrl } from "@/lib/portfolio";
import SpotlightCard from "./reactbits/SpotlightCard";

export default function Achievement() {
  const { portfolioData: { achievement } } = usePortfolio();
  if (!achievement) return null;
  return <section aria-labelledby="achievement-title">
    <SpotlightCard className="flex flex-col gap-4 border-secondary/35 p-5 md:flex-row md:items-start md:p-6">
      <Trophy className="h-8 w-8 shrink-0 text-secondary" aria-hidden="true" />
      <div>
        <p className="mb-2 font-code-sm text-xs font-semibold text-on-secondary-container">{achievement.organization} · {achievement.year}</p>
        <h2 id="achievement-title" className="text-xl font-semibold">{achievement.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{achievement.description}</p>
        {externalUrl(achievement.proofUrl) && <a href={externalUrl(achievement.proofUrl)} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary-text">View achievement ↗</a>}
      </div>
    </SpotlightCard>
  </section>;
}

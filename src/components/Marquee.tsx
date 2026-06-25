"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Marquee() {
  const { portfolioData } = usePortfolio();
  const { skills } = portfolioData;

  return (
    <section className="border-y border-outline-variant py-4 bg-transparent overflow-hidden relative w-full my-6">
      {/* Left/Right fading gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling container */}
      <div className="flex w-max">
        {/* First Group */}
        <div className="marquee-content gap-8 font-code-sm text-sm text-on-surface-variant whitespace-nowrap pr-8">
          {skills.map((skill, index) => (
            <span key={`group1-${index}`} className="flex items-center gap-2">
              <span className="text-primary font-semibold select-none">$</span>
              {skill}
            </span>
          ))}
        </div>
        {/* Duplicate Group for Seamless Looping */}
        <div className="marquee-content gap-8 font-code-sm text-sm text-on-surface-variant whitespace-nowrap pr-8" aria-hidden="true">
          {skills.map((skill, index) => (
            <span key={`group2-${index}`} className="flex items-center gap-2">
              <span className="text-primary font-semibold select-none">$</span>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

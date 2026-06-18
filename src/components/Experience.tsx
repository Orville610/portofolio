"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, GitBranch, ClipboardList, Briefcase } from "lucide-react";

interface ExperienceItem {
  year: string;
  role: string;
  organization: string;
  description: string;
  icon: React.ReactNode;
}

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      year: "2025",
      role: "Leader",
      organization: "Cloud Computing Community",
      description:
        "Spearheading initiatives to educate peers on modern infrastructure, orchestrating workshops on Docker, Linux administration, and self-hosted deployments.",
      icon: <Users className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors duration-300" />,
    },
    {
      year: "2025",
      role: "Coordinator",
      organization: "Christosel",
      description:
        "Managing team logistics and overseeing technical event operations to ensure seamless execution of community gatherings and digital integrations.",
      icon: <GitBranch className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors duration-300" />,
    },
    {
      year: "2024 - 2025",
      role: "Board Member",
      organization: "OSIS",
      description:
        "Contributed to student council governance, developing leadership and organizational skills while integrating technical solutions into administrative tasks.",
      icon: <ClipboardList className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors duration-300" />,
    },
  ];

  return (
    <section id="experience" className="py-12 relative">
      {/* Header */}
      <div className="mb-12">
        <h2 className="font-headline-md text-3xl font-bold tracking-tight text-on-surface flex items-center gap-3">
          <Briefcase className="text-primary w-7 h-7" />
          Experience &amp; Leadership
        </h2>
      </div>

      {/* Timeline container */}
      <div className="relative before:absolute before:inset-0 before:left-5 before:md:left-1/2 before:-translate-x-px before:h-full before:w-px before:bg-outline-variant/60">
        {experiences.map((exp, index) => {
          const isOdd = index % 2 !== 0;
          return (
            <div
              key={index}
              className={`relative flex items-start md:items-center justify-between md:justify-normal group mb-12 ${
                isOdd ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline marker node */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant bg-background group-hover:border-primary shrink-0 z-10 transition-colors duration-300 absolute left-5 md:left-1/2 -translate-x-1/2">
                {exp.icon}
              </div>

              {/* Timeline card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`w-[calc(100%-3rem)] ml-12 md:ml-0 md:w-[calc(50%-2.5rem)] rounded-xl border border-outline-variant bg-surface-container-low/40 text-on-surface shadow-sm p-6 hover:border-primary hover-glow-primary-md`}
              >
                <div className="font-code-sm text-xs font-semibold text-primary mb-1">
                  {exp.year}
                </div>
                <h3 className="font-headline-md font-semibold tracking-tight text-lg mb-1">
                  {exp.role}
                </h3>
                <div className="font-label-md text-sm text-muted-foreground text-on-surface-variant mb-3">
                  {exp.organization}
                </div>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

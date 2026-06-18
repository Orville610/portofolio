"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Folder, Terminal } from "lucide-react";

interface ProjectItem {
  filename: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function Projects() {
  const projects: ProjectItem[] = [
    {
      filename: "infra.sh",
      title: "Self-Hosted Cloud Infrastructure",
      description:
        "Designed and deployed a robust home-lab environment utilizing Docker and CasaOS on Armbian Linux. Implemented Nextcloud for secure, private data storage and sync across devices.",
      tags: ["Docker", "CasaOS", "Armbian"],
      githubUrl: "#",
    },
    {
      filename: "network.conf",
      title: "Distributed Database Networking",
      description:
        "Engineered a secure, zero-trust mesh network using Tailscale to link geographically distributed MariaDB instances, ensuring high availability and encrypted internal traffic without exposing ports.",
      tags: ["Tailscale", "MariaDB", "ZeroTier"],
      githubUrl: "#",
    },
    {
      filename: "index.php",
      title: "Exarabia Product Innovation",
      description:
        "Developed a full-stack web application focusing on clean UI/UX principles to showcase product innovations. Integrated backend PHP logic with a responsive, modern frontend.",
      tags: ["PHP", "HTML/CSS", "UI/UX"],
      githubUrl: "#",
      liveUrl: "#",
    },
  ];

  return (
    <section id="projects" className="py-12">
      {/* Header */}
      <div className="mb-12">
        <h2 className="font-headline-md text-3xl font-bold tracking-tight text-on-surface flex items-center gap-3">
          <Terminal className="text-primary w-7 h-7" />
          Featured Projects
        </h2>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-xl border border-outline-variant bg-surface-container-low/40 text-on-surface shadow-sm flex flex-col hover:border-primary hover-glow-primary-sm transition-colors duration-300 overflow-hidden group h-full"
          >
            {/* Terminal Card Header */}
            <div className="px-4 py-3 border-b border-outline-variant bg-surface-container/30 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-error/70 group-hover:bg-error" />
                <div className="w-3 h-3 rounded-full bg-tertiary-container/70 group-hover:bg-tertiary-container" />
                <div className="w-3 h-3 rounded-full bg-secondary-container/70 group-hover:bg-secondary-container" />
                <span className="font-code-sm text-xs text-on-surface-variant ml-2 flex items-center gap-1">
                  <Folder className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary" />
                  {project.filename}
                </span>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className="text-on-surface-variant hover:text-primary transition-colors duration-200"
                    title="View GitHub Repository"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="text-on-surface-variant hover:text-secondary transition-colors duration-200"
                    title="View Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-label-md text-lg font-semibold tracking-tight text-primary mb-3 group-hover:text-primary-fixed-dim transition-colors">
                {project.title}
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              {/* Tags / Badges */}
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-outline-variant/30">
                {project.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="inline-flex items-center rounded-md border border-outline-variant/60 px-2.5 py-0.5 text-xs font-semibold text-on-surface-variant bg-surface-container/20 group-hover:border-primary/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

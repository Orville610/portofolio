"use client";

import React from "react";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function Achievement() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full my-8"
    >
      <div className="rounded-xl border border-secondary/30 bg-surface-container/35 text-on-surface glow-secondary-sm p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden backdrop-blur-sm group hover:border-secondary/55 transition-all duration-300">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-xl pointer-events-none group-hover:bg-secondary/15 transition-all" />
        
        <div className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/35 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
          <Trophy className="h-6 w-6 text-secondary animate-pulse" />
        </div>
        
        <div>
          <div className="font-code-sm text-xs font-semibold text-secondary mb-1 tracking-wider select-none">
            ACHIEVEMENT_UNLOCKED
          </div>
          <h3 className="font-headline-md text-xl font-semibold tracking-tight text-on-surface mb-2">
            National Finalist - Cloud Computing
          </h3>
          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
            Recognized by the Ministry of Education, 2024. Competed nationwide designing resilient and scalable cloud architectures under strict constraints.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, BadgeCheck, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

import { usePortfolio } from "@/context/PortfolioContext";

export default function CertsContact() {
  const { portfolioData } = usePortfolio();
  const certifications = portfolioData.certifications;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("orville@rville.site");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 overflow-hidden" id="certs">
      {/* Certifications Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-start"
      >
        <div className="flex flex-col space-y-4 mb-8">
          <h2 className="font-headline-md text-3xl font-bold tracking-tight text-on-surface flex items-center gap-3">
            <BadgeCheck className="text-primary w-7 h-7" />
            Certifications
          </h2>
        </div>
        <ul className="space-y-6">
          {certifications.map((cert, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="flex items-start gap-3 group"
            >
              <span className="font-code-sm text-primary mt-1 font-bold select-none">&gt;</span>
              <div>
                <h3 className="font-label-md text-base font-semibold text-on-surface group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant text-muted-foreground mt-1 leading-relaxed">
                  {cert.desc}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Sleek Initiate Connection Form Panel */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -4 }}
        className="rounded-xl border border-outline-variant bg-surface-container-low/50 text-on-surface shadow-sm p-6 transition-all duration-300 hover:border-primary/50"
        id="contact"
      >
        <div className="flex flex-col space-y-1.5 mb-4">
          <h2 className="font-headline-md text-2xl font-semibold leading-none tracking-tight text-on-surface">
            Initiate Connection
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant text-muted-foreground leading-relaxed">
            Looking to collaborate on infrastructure projects or discuss self-hosting solutions? Ping me.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          {/* Email Row */}
          <div className="grid gap-2">
            <label className="font-label-md text-sm font-medium leading-none text-on-surface font-semibold" htmlFor="email">
              Email address
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full rounded-md border border-outline-variant bg-background p-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-primary focus-within:border-primary text-on-surface-variant transition-all duration-300">
              <div className="flex items-center gap-2 flex-grow min-w-0">
                <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="font-code-sm truncate select-all">orville@rville.site</span>
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-outline-variant/30 pt-2 sm:pt-0 sm:border-0 sm:ml-auto">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center rounded-md text-xs font-medium bg-surface-container-low hover:bg-surface-container hover:text-on-surface h-8 px-3 transition-colors border border-outline-variant flex-grow sm:flex-grow-0"
                  title="Copy Email"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-secondary mr-1.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy
                    </>
                  )}
                </button>
                <a
                  className="inline-flex items-center justify-center rounded-md text-xs font-medium bg-primary text-on-primary hover:bg-primary/90 h-8 px-3 transition-colors flex-grow sm:flex-grow-0"
                  href="mailto:orville@rville.site"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>

          {/* WhatsApp Row (Temporarily Hidden)
          <div className="grid gap-2">
            <label className="font-label-md text-sm font-medium leading-none text-on-surface font-semibold" htmlFor="whatsapp">
              WhatsApp
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full rounded-md border border-outline-variant bg-background p-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-primary focus-within:border-primary text-on-surface-variant transition-all duration-300">
              <div className="flex items-center gap-2 flex-grow min-w-0">
                <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="font-code-sm truncate">Direct Message</span>
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-outline-variant/30 pt-2 sm:pt-0 sm:border-0 sm:ml-auto">
                <a
                  className="inline-flex items-center justify-center rounded-md text-xs font-medium bg-primary text-on-primary hover:bg-primary/90 h-8 px-4 transition-colors flex-grow sm:flex-grow-0"
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message
                </a>
              </div>
            </div>
          </div>
          */}
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, ExternalLink, Award, Send, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function CertsContact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("orvillegiovanni@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const certifications = [
    {
      title: "Digiup Telkom Indonesia",
      desc: "Advanced Cloud Infrastructure & Networking",
    },
    {
      title: "Public Speaking & Leadership Workshops",
      desc: "Communication and Team Management Certification",
    },
  ];

  // SVG Paths for Brand Icons
  const githubIcon = (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );

  const linkedinIcon = (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  const whatsappIcon = (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );

  const contactMethods = [
    {
      name: "Email",
      val: "orvillegiovanni@gmail.com",
      icon: <Mail className="w-6 h-6 text-primary" />,
      action: (
        <div className="flex gap-2">
          <button
            onClick={handleCopyEmail}
            className="p-2 rounded-md border border-outline-variant hover:border-primary hover:bg-primary/5 text-on-surface-variant hover:text-primary transition-all duration-300"
            title="Copy Email"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-secondary" /> : <Copy className="w-4 h-4" />}
          </button>
          <a
            href="mailto:orvillegiovanni@gmail.com"
            className="p-2 rounded-md border border-outline-variant hover:border-primary hover:bg-primary/5 text-on-surface-variant hover:text-primary transition-all duration-300"
            title="Send Email"
          >
            <Send className="w-4 h-4" />
          </a>
        </div>
      ),
    },
    {
      name: "WhatsApp",
      val: "Direct Message",
      icon: <span className="text-secondary">{whatsappIcon}</span>,
      action: (
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md border border-outline-variant hover:border-secondary hover:bg-secondary/5 text-on-surface-variant hover:text-secondary transition-all duration-300"
          title="Open WhatsApp Chat"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      ),
    },
    {
      name: "GitHub",
      val: "@OrvilleGiovanni",
      icon: <span className="text-primary">{githubIcon}</span>,
      action: (
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md border border-outline-variant hover:border-primary hover:bg-primary/5 text-on-surface-variant hover:text-primary transition-all duration-300"
          title="Visit GitHub"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      ),
    },
    {
      name: "LinkedIn",
      val: "Connect on LinkedIn",
      icon: <span className="text-primary">{linkedinIcon}</span>,
      action: (
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md border border-outline-variant hover:border-primary hover:bg-primary/5 text-on-surface-variant hover:text-primary transition-all duration-300"
          title="Visit LinkedIn"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      ),
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12" id="certs">
      {/* Certifications Panel */}
      <div className="flex flex-col justify-start">
        <div className="flex flex-col space-y-4 mb-8">
          <h2 className="font-headline-md text-3xl font-bold tracking-tight text-on-surface flex items-center gap-3">
            <BadgeCheck className="text-primary w-7 h-7" />
            Certifications
          </h2>
        </div>
        <ul className="space-y-6">
          {certifications.map((cert, index) => (
            <li key={index} className="flex items-start gap-4 group">
              <div className="mt-1 p-1.5 rounded-md bg-primary/10 text-primary shrink-0 group-hover:scale-110 transition-transform duration-200">
                <Award className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="font-label-md text-base font-semibold text-on-surface group-hover:text-primary transition-colors">
                  {cert.title}
                </div>
                <div className="font-body-md text-sm text-on-surface-variant text-muted-foreground mt-1 leading-relaxed">
                  {cert.desc}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Grid of Contact Cards - Replaces long texts with interactive icon panels */}
      <div className="rounded-xl border border-outline-variant bg-surface-container-low/40 text-on-surface shadow-sm p-6" id="contact">
        <div className="flex flex-col space-y-1.5 mb-6">
          <h3 className="font-headline-md text-2xl font-semibold leading-none tracking-tight text-on-surface">
            Initiate Connection
          </h3>
          <p className="font-body-md text-sm text-on-surface-variant text-muted-foreground leading-relaxed mt-1">
            Looking to collaborate on infrastructure, docker deployments, or self-hosted systems? Connect via:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg border border-outline-variant/60 bg-surface/50 flex flex-col justify-between items-start gap-4 hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-surface-container-high/40">
                  {method.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold font-code-sm text-on-surface-variant">
                    {method.name}
                  </div>
                  <div className="text-sm text-on-surface font-body-md font-medium truncate max-w-[120px] sm:max-w-[140px]" title={method.val}>
                    {method.val}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end">
                {method.action}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, BadgeCheck, MessageSquare } from "lucide-react";

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
            <li key={index} className="flex items-start gap-3 group">
              <span className="font-code-sm text-primary mt-1 font-bold select-none">&gt;</span>
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

      {/* Sleek Initiate Connection Form Panel */}
      <div className="rounded-xl border border-outline-variant bg-surface-container-low/50 text-on-surface shadow-sm p-6" id="contact">
        <div className="flex flex-col space-y-1.5 mb-4">
          <h3 className="font-headline-md text-2xl font-semibold leading-none tracking-tight text-on-surface">
            Initiate Connection
          </h3>
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
            <div className="flex items-center gap-3 w-full rounded-md border border-outline-variant bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-primary focus-within:border-primary text-on-surface-variant transition-all duration-300">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="font-code-sm truncate">orvillegiovanni@gmail.com</span>
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center rounded-md text-xs font-medium hover:bg-surface-container hover:text-on-surface h-8 px-2.5 transition-colors border border-transparent hover:border-outline-variant"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-secondary" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  className="inline-flex items-center justify-center rounded-md text-xs font-medium hover:bg-surface-container hover:text-on-surface h-8 px-3 transition-colors"
                  href="mailto:orvillegiovanni@gmail.com"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>

          {/* WhatsApp Row */}
          <div className="grid gap-2">
            <label className="font-label-md text-sm font-medium leading-none text-on-surface font-semibold" htmlFor="whatsapp">
              WhatsApp
            </label>
            <div className="flex items-center gap-3 w-full rounded-md border border-outline-variant bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-primary focus-within:border-primary text-on-surface-variant transition-all duration-300">
              <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="font-code-sm truncate">Direct Message</span>
              <a
                className="ml-auto inline-flex items-center justify-center rounded-md text-xs font-medium hover:bg-surface-container hover:text-on-surface h-8 px-3 transition-colors border border-transparent hover:border-outline-variant"
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Check, Copy, Mail } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { externalUrl } from "@/lib/portfolio";
import SpotlightCard from "./reactbits/SpotlightCard";

export default function CertsContact() {
  const { portfolioData: { certifications, settings } } = usePortfolio();
  const [copyState, setCopyState] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (resetRef.current) clearTimeout(resetRef.current); }, []);
  async function copyEmail() {
    if (resetRef.current) clearTimeout(resetRef.current);
    setCopyState("copying");
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(settings.email);
      setCopyState("copied");
      resetRef.current = setTimeout(() => setCopyState("idle"), 2500);
    } catch { setCopyState("error"); }
  }
  return (
    <section id="certs" className="grid grid-cols-1 gap-10 py-6 md:grid-cols-2 md:py-10" aria-labelledby="certs-title">
      <div>
        <h2 id="certs-title" className="mb-6 flex items-center gap-3 font-headline-md text-2xl font-bold tracking-tight md:text-3xl"><BadgeCheck className="h-6 w-6 shrink-0 text-primary-text" aria-hidden="true" />Learning &amp; Certifications</h2>
        <ul className="space-y-6">
          {certifications.map((cert, index) => <li key={cert.title + index}>
            <h3 className="font-semibold">{cert.title}</h3>
            {(cert.issuer || cert.issuedAt) && <p className="mt-1 text-xs text-primary-text">{[cert.issuer, cert.issuedAt].filter(Boolean).join(" · ")}</p>}
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{cert.desc}</p>
            {externalUrl(cert.credentialUrl) && <a href={externalUrl(cert.credentialUrl)} className="inline-flex min-h-11 items-center text-sm font-medium text-primary-text" aria-label={`View credential for ${cert.title}`}>View credential ↗</a>}
          </li>)}
        </ul>
      </div>
      <div id="contact">
        <SpotlightCard className="p-5 md:p-6">
          <h2 className="font-headline-md text-2xl font-semibold">Let’s connect</h2>
          <p className="mb-6 mt-3 text-sm leading-relaxed text-on-surface-variant">Have a web development, Linux, or self-hosting project in mind? Get in touch.</p>
          <p className="mb-2 text-sm font-semibold">Email address</p>
          <div className="rounded-md border border-outline-variant bg-background p-3">
            <div className="flex min-w-0 items-center gap-2 text-sm"><Mail className="h-4 w-4 shrink-0 text-on-surface-variant" aria-hidden="true" /><span className="break-all select-all">{settings.email}</span></div>
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => void copyEmail()} disabled={copyState === "copying"} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border border-outline-variant bg-surface-container-low px-3 text-sm font-semibold disabled:opacity-60">
                {copyState === "copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                {copyState === "copied" ? "Copied" : copyState === "copying" ? "Copying…" : "Copy"}
              </button>
              <a href={`mailto:${settings.email}`} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md bg-primary px-3 text-sm font-semibold text-on-primary hover:bg-primary/90">Send Email</a>
            </div>
          </div>
          <p className="mt-3 min-h-5 text-sm text-on-surface-variant" role="status">{copyState === "error" ? "Could not copy. Select the address above or use Send Email." : copyState === "copied" ? "Email address copied." : ""}</p>
        </SpotlightCard>
      </div>
    </section>
  );
}

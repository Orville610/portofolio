"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

const Terminal = dynamic(() => import("./Terminal"), { ssr: false, loading: () => <p role="status" className="p-5 text-sm text-on-surface-variant">Loading terminal…</p> });
const AdminPanel = dynamic(() => import("./AdminPanel"), { ssr: false });

export function TerminalTools() {
  const [open, setOpen] = useState(false);
  return <details className="rounded-xl border border-outline-variant bg-surface-container-low/40 print:hidden" onToggle={event => setOpen(event.currentTarget.open)}>
    <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 p-4 font-label-md font-semibold text-on-surface [&::-webkit-details-marker]:hidden"><TerminalIcon className="h-5 w-5 text-primary-text" aria-hidden="true" />Explore the interactive terminal<span className="ml-auto text-primary-text" aria-hidden="true">{open ? "−" : "+"}</span></summary>
    {open && <Terminal />}
    <noscript><p className="p-4 text-sm">The terminal needs JavaScript. You can explore the projects and contact links above.</p></noscript>
  </details>;
}
export function AdminTools() {
  const { isAdmin, showAdminPanel } = usePortfolio();
  return isAdmin && showAdminPanel ? <AdminPanel /> : null;
}

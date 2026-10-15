"use client";

import { Printer } from "lucide-react";
export default function PrintResume() {
  return <button type="button" onClick={() => window.print()} className="inline-flex min-h-11 items-center gap-2 rounded bg-primary px-4 text-sm font-semibold text-on-primary print:hidden"><Printer className="h-4 w-4" aria-hidden="true" />Print / Save as PDF</button>;
}

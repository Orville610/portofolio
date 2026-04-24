"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { hasSanityEnv } from "@/sanity/env";

export default function StudioPage() {
  if (!hasSanityEnv) {
    return (
      <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-amber-200 bg-amber-50 p-8 text-slate-800">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          Sanity setup required
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">Studio belum aktif</h1>
        <p className="mt-4 leading-8 text-slate-700">
          Isi <code className="rounded bg-white px-2 py-1">NEXT_PUBLIC_SANITY_PROJECT_ID</code>{" "}
          dan <code className="rounded bg-white px-2 py-1">NEXT_PUBLIC_SANITY_DATASET</code>{" "}
          di <code className="rounded bg-white px-2 py-1">.env.local</code>, lalu restart server.
        </p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}

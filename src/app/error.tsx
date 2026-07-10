"use client";

import React, { useEffect } from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";
import Link from "next/link";
import ShaderBackground from "@/components/ShaderBackground";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error caught:", error);
  }, [error]);

  return (
    <>
      <ShaderBackground />
      <main className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-lg rounded-xl border border-outline-variant bg-surface-container-lowest/80 text-on-surface shadow-lg overflow-hidden terminal-glow-hover transition-all duration-300">
          
          {/* Header Bar */}
          <div className="px-4 py-3 border-b border-outline-variant bg-surface-container/40 flex items-center gap-2 select-none">
            <div className="w-3 h-3 rounded-full bg-error" />
            <div className="w-3 h-3 rounded-full bg-tertiary-container" />
            <div className="w-3 h-3 rounded-full bg-secondary-container" />
            <span className="font-code-sm text-xs text-on-surface-variant ml-2 flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-error animate-bounce" />
              rville-cloud: ~ (system_critical_failure)
            </span>
          </div>

          {/* Body Content */}
          <div className="p-6 font-mono text-sm leading-relaxed text-on-surface-variant space-y-4">
            <div className="text-error font-bold select-none">&gt;_ SYSTEM FAULT DIAGNOSTIC</div>
            <div>
              <span className="text-primary font-bold">STATUS:</span> 500 INTERNAL_ERROR
              <br />
              <span className="text-primary font-bold">EXCEPTION:</span> Runtime execution boundary interrupted.
            </div>
            
            <div className="border-t border-outline-variant/30 pt-4 font-mono text-xs text-error/80 leading-loose bg-error-container/10 p-3 rounded-md">
              {error.message || "An unexpected error occurred within the virtual node environment."}
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-low/40 flex justify-end gap-3">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-outline-variant bg-background hover:bg-surface-container hover:text-on-surface h-10 px-4 py-2 font-label-md gap-2 duration-300 cursor-pointer text-on-surface"
            >
              <RefreshCw className="w-4 h-4" />
              Retry Node
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-on-primary hover:bg-primary/95 h-10 px-4 py-2 hover-glow-primary-lg font-label-md duration-300 cursor-pointer"
            >
              Return Home
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}

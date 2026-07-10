"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ShaderBackground from "@/components/ShaderBackground";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    console.error("Runtime error caught:", error);
  }, [error]);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <>
      <ShaderBackground />
      <main className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-xl rounded-xl border border-outline-variant bg-surface-container-lowest/85 text-on-surface shadow-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(229,9,20,0.15)]">

          {/* Terminal Title Bar */}
          <div className="px-4 py-3 border-b border-outline-variant bg-surface-container/50 flex items-center gap-2 select-none">
            <div className="w-3 h-3 rounded-full bg-error animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-error animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-3 h-3 rounded-full bg-error animate-pulse" style={{ animationDelay: "0.4s" }} />
            <span className="font-code-sm text-xs text-on-surface-variant ml-2 flex items-center gap-1.5 tracking-wider">
              <svg className="w-3.5 h-3.5 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              rville-cloud — KERNEL_PANIC
            </span>
          </div>

          {/* Body */}
          <div className="p-6 font-mono text-sm leading-relaxed text-on-surface-variant space-y-5">

            <pre className="text-error text-xs leading-tight select-none opacity-90">{`
  ┌──────────────────────────────────┐
  │  ███████╗██████╗ ██████╗        │
  │  ██╔════╝██╔══██╗██╔══██╗       │
  │  █████╗  ██████╔╝██████╔╝       │
  │  ██╔══╝  ██╔══██╗██╔══██╗       │
  │  ███████╗██║  ██║██║  ██║       │
  │  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝       │
  └──────────────────────────────────┘`}</pre>

            <div className="text-error font-bold select-none text-base">
              &gt;_ SYSTEM FAULT — CRITICAL
            </div>

            <div className="space-y-1.5">
              <div>
                <span className="text-primary font-bold">STATUS: </span>
                <span className="text-error">500 INTERNAL_ERROR</span>
              </div>
              <div>
                <span className="text-primary font-bold">EXCEPTION: </span>
                <span>Runtime execution boundary interrupted.</span>
              </div>
            </div>

            {/* Error Message Box */}
            <div className="border border-error/30 rounded-lg p-4 font-mono text-xs leading-loose bg-error-container/10 space-y-1">
              <div className="text-error/60 select-none">--- BEGIN STACK TRACE ---</div>
              <div className="text-error/90 break-all">
                {error.message || "An unexpected error occurred within the virtual node environment."}
              </div>
              {error.digest && (
                <div className="text-on-surface-variant/40 pt-1">
                  digest: {error.digest}
                </div>
              )}
              <div className="text-error/60 select-none">--- END STACK TRACE ---</div>
            </div>

            {/* Simulated terminal line */}
            <div className="font-mono text-xs text-on-surface-variant/50">
              rville@rville-cloud:~$ <span className="text-on-surface-variant/40">systemctl restart node.service</span>
              <span className={`ml-0.5 ${cursorVisible ? "opacity-100" : "opacity-0"}`}>▌</span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-low/40 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant/50 font-mono">signal: SIGSEGV</span>
            <div className="flex gap-3">
              <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium border border-outline-variant bg-surface-container hover:bg-surface-container-high h-10 px-5 py-2 font-label-md gap-2 transition-all duration-300 cursor-pointer text-on-surface"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                Retry
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-primary text-on-primary hover:bg-primary/90 h-10 px-5 py-2 hover-glow-primary-lg font-label-md gap-2 transition-all duration-300 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                cd ~
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}

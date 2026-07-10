"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ShaderBackground from "@/components/ShaderBackground";

const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~";

function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let frame = 0;
    const totalFrames = text.length * 3;
    const interval = setInterval(() => {
      frame++;
      const progress = Math.min(Math.floor(frame / 3), text.length);
      let result = text.slice(0, progress);
      if (progress < text.length) {
        result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      setDisplayed(result);
      if (frame >= totalFrames) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayed}</span>;
}

export default function NotFound() {
  const [cursorVisible, setCursorVisible] = useState(true);

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
            <div className="w-3 h-3 rounded-full bg-tertiary-container" />
            <div className="w-3 h-3 rounded-full bg-secondary-container" />
            <span className="font-code-sm text-xs text-on-surface-variant ml-2 flex items-center gap-1.5 tracking-wider">
              <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              rville-cloud — system_error
            </span>
          </div>

          {/* Body */}
          <div className="p-6 font-mono text-sm leading-relaxed text-on-surface-variant space-y-5">
            {/* ASCII Error Block */}
            <pre className="text-primary text-xs leading-tight select-none opacity-80">{`
  ┌──────────────────────────────────┐
  │  ██╗  ██╗ ██████╗  ██╗  ██╗     │
  │  ██║  ██║██╔═████╗ ██║  ██║     │
  │  ███████║██║██╔██║ ███████║     │
  │  ╚════██║████╔╝██║ ╚════██║     │
  │       ██║╚██████╔╝      ██║     │
  │       ╚═╝ ╚═════╝       ╚═╝     │
  └──────────────────────────────────┘`}</pre>

            <div className="text-secondary font-bold select-none text-base">
              <GlitchText text=">_ NODE_NOT_FOUND" />
            </div>

            <div className="space-y-1.5">
              <div>
                <span className="text-primary font-bold">STATUS: </span>
                <span className="text-error">404</span>
              </div>
              <div>
                <span className="text-primary font-bold">CAUSE: </span>
                <span>Requested path does not match any registered route.</span>
              </div>
            </div>

            {/* Simulated curl output */}
            <div className="border border-outline-variant/30 rounded-lg p-4 font-mono text-xs text-on-surface-variant/70 leading-loose bg-surface-container/30 space-y-0.5">
              <div className="text-on-surface-variant/50">
                rville@rville-cloud:~$ <span className="text-on-surface">curl -sI $REQUEST_URI</span>
              </div>
              <div className="text-error">HTTP/2 404 Not Found</div>
              <div>server: NextjsTurbopack/16.x</div>
              <div>x-powered-by: rville-cloud</div>
              <div>content-type: text/html; charset=utf-8</div>
              <div className="pt-1 text-on-surface-variant/50">
                rville@rville-cloud:~$ <span className={cursorVisible ? "opacity-100" : "opacity-0"}>▌</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-low/40 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant/50 font-mono">exit code: 1</span>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-primary text-on-primary hover:bg-primary/90 h-10 px-5 py-2 hover-glow-primary-lg font-label-md gap-2 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              cd ~
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}

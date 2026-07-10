import React from "react";
import Link from "next/link";
import { Terminal as TerminalIcon, Home } from "lucide-react";
import ShaderBackground from "@/components/ShaderBackground";

export default function NotFound() {
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
              <TerminalIcon className="w-3.5 h-3.5 text-primary" />
              rville-cloud: ~ (system_error_404)
            </span>
          </div>

          {/* Body Content */}
          <div className="p-6 font-mono text-sm leading-relaxed text-on-surface-variant space-y-4">
            <div className="text-secondary font-bold select-none">&gt;_ SYSTEM DIAGNOSTIC</div>
            <div>
              <span className="text-primary font-bold">STATUS:</span> ERROR_404
              <br />
              <span className="text-primary font-bold">MESSAGE:</span> Node or path not registered in local routing tables.
            </div>
            
            <div className="border-t border-outline-variant/30 pt-4 font-mono text-xs text-on-surface-variant/70 leading-loose">
              rville-cloud:~$ curl -I https://rville.site/requested-node
              <br />
              <span className="text-error">HTTP/1.1 404 Not Found</span>
              <br />
              Server: NextjsTurbopack/1.0
              <br />
              Status: RESOURCE_NOT_FOUND
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-low/40 flex justify-end">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-on-primary hover:bg-primary/95 h-10 px-4 py-2 hover-glow-primary-lg font-label-md gap-2 duration-300 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}

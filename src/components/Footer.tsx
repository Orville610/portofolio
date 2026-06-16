"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant bg-background mt-24">
      <div className="container flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-6 max-w-max-width mx-auto gap-4">
        {/* Footer Brand Logo */}
        <div className="font-headline-md text-lg font-bold tracking-tight text-on-surface">
          RVILLE
        </div>

        {/* Footer Status / Copyright */}
        <div className="font-code-sm text-xs md:text-sm text-on-surface-variant text-muted-foreground select-none">
          &copy; {new Date().getFullYear()} RVILLE | CLOUD_INFRA_V1.0
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <a
            className="p-2 rounded-full border border-outline-variant/60 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            className="p-2 rounded-full border border-outline-variant/60 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            className="p-2 rounded-full border border-outline-variant/60 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter / X"
            aria-label="Twitter / X"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

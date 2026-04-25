import { ArrowRight } from "lucide-react";

import { Button } from "./Button";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-surface via-card to-charcoal p-8 shadow-[0_0_90px_rgba(124,58,237,0.12)] sm:p-10 lg:p-14">
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-orange/[0.15] blur-[90px]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-glow/20 blur-[110px]" />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-orange">Contact</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            Have a portfolio, website, or app idea to shape?
          </h2>
          <p className="mt-5 max-w-2xl leading-8 text-muted">
            Send the brief, goal, or rough idea. I can help turn it into a clean interface and a reliable frontend build.
          </p>
        </div>
        <Button href="/contact" className="w-full sm:w-auto">
          Start a Conversation
          <ArrowRight className="ml-2 size-4" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}

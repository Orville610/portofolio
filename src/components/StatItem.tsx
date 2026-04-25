import type { Stat } from "@/sanity/types";

type StatItemProps = {
  stat: Stat;
};

export function StatItem({ stat }: StatItemProps) {
  return (
    <div className="rounded-[1.6rem] border border-white/[0.08] bg-white/[0.035] p-6">
      <p className="font-mono text-5xl font-black tracking-[-0.08em] text-orange sm:text-6xl">
        {stat.value}
        <span className="text-3xl">{stat.suffix}</span>
      </p>
      <p className="mt-3 text-sm font-bold uppercase tracking-[0.22em] text-muted">
        {stat.label}
      </p>
    </div>
  );
}

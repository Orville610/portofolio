type SiteIntroStatsProps = {
  skillsCount: number;
  experienceCount: number;
  featuredCount: number;
};

export function SiteIntroStats({
  skillsCount,
  experienceCount,
  featuredCount,
}: SiteIntroStatsProps) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 text-slate-50">
      <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Quick snapshot</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-1">
        <div>
          <p className="text-3xl font-bold">{skillsCount}+</p>
          <p className="mt-1 text-sm text-slate-300">Skills & tools listed</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{experienceCount}</p>
          <p className="mt-1 text-sm text-slate-300">Highlighted experience entries</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{featuredCount}</p>
          <p className="mt-1 text-sm text-slate-300">Featured projects on homepage</p>
        </div>
      </div>
    </div>
  );
}

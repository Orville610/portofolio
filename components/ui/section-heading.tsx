type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  invert?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  invert = false,
}: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <p
        className={`text-sm font-semibold uppercase tracking-[0.22em] ${
          invert ? "text-slate-300" : "text-slate-500"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl ${
          invert ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`max-w-2xl text-base leading-8 ${invert ? "text-slate-300" : "text-slate-600"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

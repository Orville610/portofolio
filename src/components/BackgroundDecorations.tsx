import { cn } from "@/lib/utils";

type BackgroundDecorationsProps = {
  words?: string[];
  className?: string;
};

export function BackgroundDecorations({
  words = ["Creative", "Portfolio"],
  className,
}: BackgroundDecorationsProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-purple-glow/25 blur-[110px]" />
      <div className="absolute right-[-8%] top-36 h-80 w-80 rounded-full bg-blue-glow/20 blur-[120px]" />
      <div className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-orange/10 blur-[100px]" />
      <p className="outline-word absolute -left-4 top-28 rotate-[-4deg] text-[18vw] leading-none opacity-50">
        {words[0]}
      </p>
      <p className="outline-word absolute bottom-8 right-[-2rem] text-[15vw] leading-none opacity-40">
        {words[1]}
      </p>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[length:34px_34px] opacity-25" />
    </div>
  );
}

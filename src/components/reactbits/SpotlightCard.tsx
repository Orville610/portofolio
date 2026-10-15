import type { CSSProperties, HTMLAttributes } from "react";

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
}
export default function SpotlightCard({ children, className = "", spotlightColor = "rgba(229, 9, 20, 0.12)", style, ...props }: SpotlightCardProps) {
  return <div className={`spotlight-card relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low/60 ${className}`} style={{ "--spotlight-color": spotlightColor, ...style } as CSSProperties} {...props}>
    <div className="relative z-10 flex h-full flex-1 flex-col">{children}</div>
  </div>;
}

import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "border-orange bg-orange text-white shadow-[0_0_35px_rgba(255,106,61,0.25)] hover:-translate-y-0.5 hover:bg-orange-bright hover:shadow-[0_0_45px_rgba(255,106,61,0.36)]",
  secondary:
    "border-white/[0.12] bg-white/[0.04] text-white hover:-translate-y-0.5 hover:border-orange/[0.45] hover:bg-white/[0.07]",
  ghost:
    "border-transparent bg-transparent text-muted hover:text-white hover:bg-white/[0.06]",
};

export function Button({
  children,
  href,
  className,
  variant = "primary",
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center rounded-full border px-6 text-sm font-bold tracking-wide transition duration-300",
    variants[variant],
    className,
  );

  if (!href) {
    return <button className={classes}>{children}</button>;
  }

  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a className={classes} href={href} rel="noreferrer" target={href.startsWith("http") ? "_blank" : undefined}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}

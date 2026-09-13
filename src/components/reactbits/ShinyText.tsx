"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block relative overflow-hidden ${
        disabled
          ? ""
          : "bg-clip-text text-transparent bg-[linear-gradient(110deg,#e1e2e5,45%,#ffffff,55%,#e1e2e5)] bg-[length:250%_100%] animate-shine"
      } ${className}`}
      style={{
        animationDuration: disabled ? undefined : animationDuration,
      }}
    >
      {text}
    </span>
  );
}

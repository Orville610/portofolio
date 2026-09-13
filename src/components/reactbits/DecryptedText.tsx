"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover" | "both";
}

export default function DecryptedText({
  text,
  speed = 45,
  maxIterations = 12,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+0123456789",
  className = "",
  parentClassName = "",
  encryptedClassName = "text-primary/70 font-mono",
  animateOn = "view",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((c) => c !== " ")
      : characters.split("");
  }, [text, useOriginalCharsOnly, characters]);

  const triggerAnimation = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const length = text.length;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";

            let isResolved = false;
            if (sequential) {
              if (revealDirection === "start") {
                isResolved = index < Math.floor((iteration / maxIterations) * length);
              } else if (revealDirection === "end") {
                isResolved = index >= length - Math.floor((iteration / maxIterations) * length);
              } else {
                const center = Math.floor(length / 2);
                const progress = Math.floor((iteration / maxIterations) * (length / 2));
                isResolved = Math.abs(index - center) <= progress;
              }
            } else {
              isResolved = iteration >= maxIterations;
            }

            if (isResolved || iteration >= maxIterations) {
              return char;
            }

            return availableChars[Math.floor(Math.random() * availableChars.length)];
          })
          .join("");
      });

      iteration++;

      if (iteration > maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === "view" || animateOn === "both") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimatedRef.current) {
              hasAnimatedRef.current = true;
              triggerAnimation();
            }
          });
        },
        { threshold: 0.1 }
      );

      const el = containerRef.current;
      if (el) observer.observe(el);

      return () => {
        if (el) observer.unobserve(el);
      };
    }
  }, [animateOn, text]);

  const handleMouseEnter = () => {
    if (animateOn === "hover") {
      setIsHovering(true);
      triggerAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (animateOn === "hover") {
      setIsHovering(false);
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block select-none cursor-default ${parentClassName}`}
    >
      <span className={className}>
        {displayText.split("").map((char, i) => {
          const isEncrypted = isScrambling && char !== text[i] && char !== " ";
          return (
            <span
              key={i}
              className={isEncrypted ? encryptedClassName : ""}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}

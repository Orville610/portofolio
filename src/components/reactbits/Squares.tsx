"use client";

import { useEffect, useRef } from "react";

interface SquaresProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}
export default function Squares({ direction = "diagonal", speed = 0.35, borderColor = "rgba(255,255,255,0.04)", squareSize = 45, hoverFillColor = "rgba(229,9,20,0.12)", className = "" }: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = matchMedia("(pointer: coarse), (max-width: 767px)");
    let width = 0, height = 0, frame = 0, last = 0, offset = 0;
    let mouseX = -1000, mouseY = -1000;
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const xOffset = ["diagonal", "left", "right"].includes(direction) ? offset : 0;
      const yOffset = ["diagonal", "up", "down"].includes(direction) ? offset : 0;
      if (mouseX >= 0 && mouseY >= 0 && !coarse.matches) {
        context.fillStyle = hoverFillColor;
        context.fillRect(Math.floor((mouseX - xOffset) / squareSize) * squareSize + xOffset, Math.floor((mouseY - yOffset) / squareSize) * squareSize + yOffset, squareSize, squareSize);
      }
      context.beginPath();
      for (let x = xOffset - squareSize; x <= width; x += squareSize) { context.moveTo(x, 0); context.lineTo(x, height); }
      for (let y = yOffset - squareSize; y <= height; y += squareSize) { context.moveTo(0, y); context.lineTo(width, y); }
      context.strokeStyle = borderColor;
      context.lineWidth = 1;
      context.stroke();
    };
    const animate = (time: number) => {
      if (document.hidden || reduced.matches || coarse.matches) { frame = 0; return; }
      if (time - last >= 1000 / 30) {
        offset = (offset + speed * (["right", "down"].includes(direction) ? 1 : -1) + squareSize) % squareSize;
        draw();
        last = time;
      }
      frame = requestAnimationFrame(animate);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      draw();
      if (!document.hidden && !reduced.matches && !coarse.matches) frame = requestAnimationFrame(animate);
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      restart();
    };
    const pointer = (event: PointerEvent) => { mouseX = event.clientX; mouseY = event.clientY; };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("visibilitychange", restart);
    reduced.addEventListener("change", restart);
    coarse.addEventListener("change", restart);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointer);
      document.removeEventListener("visibilitychange", restart);
      reduced.removeEventListener("change", restart);
      coarse.removeEventListener("change", restart);
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor]);
  return <div className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
    <canvas ref={canvasRef} className="block h-full w-full" />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
  </div>;
}

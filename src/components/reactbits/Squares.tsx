"use client";

import React, { useRef, useEffect } from "react";

interface SquaresProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

export default function Squares({
  direction = "diagonal",
  speed = 0.4,
  borderColor = "rgba(255, 255, 255, 0.05)",
  squareSize = 40,
  hoverFillColor = "rgba(229, 9, 20, 0.15)",
  className = "",
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridOffset = { x: 0, y: 0 };
    let mousePosition = { x: -1000, y: -1000 };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mousePosition = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Update grid offset based on direction
      switch (direction) {
        case "diagonal":
          gridOffset.x = (gridOffset.x - speed + squareSize) % squareSize;
          gridOffset.y = (gridOffset.y - speed + squareSize) % squareSize;
          break;
        case "up":
          gridOffset.y = (gridOffset.y - speed + squareSize) % squareSize;
          break;
        case "down":
          gridOffset.y = (gridOffset.y + speed) % squareSize;
          break;
        case "left":
          gridOffset.x = (gridOffset.x - speed + squareSize) % squareSize;
          break;
        case "right":
          gridOffset.x = (gridOffset.x + speed) % squareSize;
          break;
      }

      const numCols = Math.ceil(width / squareSize) + 2;
      const numRows = Math.ceil(height / squareSize) + 2;

      const startX = Math.floor(gridOffset.x) - squareSize;
      const startY = Math.floor(gridOffset.y) - squareSize;

      // Draw squares
      for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
          const sqX = startX + i * squareSize;
          const sqY = startY + j * squareSize;

          // Check if mouse is inside this square
          const isHovered =
            mousePosition.x >= sqX &&
            mousePosition.x < sqX + squareSize &&
            mousePosition.y >= sqY &&
            mousePosition.y < sqY + squareSize;

          // Distance for subtle radial neighbor glow
          const centerX = sqX + squareSize / 2;
          const centerY = sqY + squareSize / 2;
          const dist = Math.hypot(mousePosition.x - centerX, mousePosition.y - centerY);

          if (isHovered) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(sqX, sqY, squareSize, squareSize);
          } else if (dist < squareSize * 2.2) {
            // Neighbor glow
            const alpha = Math.max(0, 1 - dist / (squareSize * 2.2)) * 0.08;
            ctx.fillStyle = `rgba(229, 9, 20, ${alpha})`;
            ctx.fillRect(sqX, sqY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.strokeRect(sqX, sqY, squareSize, squareSize);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor]);

  return (
    <div className={`fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle vignette for contrast and depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(229,9,20,0.08),rgba(255,255,255,0))] pointer-events-none" />
    </div>
  );
}

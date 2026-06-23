"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderOpen, Mail } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(window.navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoContainerRef.current) return;
    const rect = photoContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    photoContainerRef.current.style.setProperty("--mouse-x", `${x}px`);
    photoContainerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="relative min-h-[50vh] flex items-center py-10 w-full">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      {/* Responsive Layout Container */}
      <div className="flex flex-col items-center md:grid md:grid-cols-12 md:gap-12 md:items-center w-full relative z-10">
        
        {/* Photo Column - Appears first (top) on mobile, second (right) on desktop */}
        <motion.div
          ref={photoContainerRef}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="order-1 md:order-2 md:col-span-5 relative group w-72 h-72 sm:w-96 sm:h-96 md:w-full md:h-auto md:aspect-square mx-auto mb-8 md:mb-0 cursor-crosshair"
        >
          {/* Glowing backdrop layer (subtle static glow + dynamic mouse-tracking glow) */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div
            className="absolute -inset-4 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(220px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--primary-rgb), 0.35), transparent 75%)`,
            }}
          />

          {/* Organic frame shape container */}
          <div className="relative w-full h-full rounded-[60%_40%_30%_70%/60%_30%_70%_40%] border border-outline-variant/50 bg-surface-container-low shadow-2xl z-0 overflow-visible">
            {/* Border highlights following mouse */}
            <div
              className="absolute inset-0 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30"
              style={{
                border: "2px solid transparent",
                backgroundImage: `linear-gradient(rgba(var(--primary-rgb), 0.1), rgba(var(--primary-rgb), 0.1)), radial-gradient(180px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--primary-rgb), 0.8), transparent 70%)`,
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            />

            {/* Base Clipped Image (within the organic container boundary) */}
            <div className="absolute inset-0 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] overflow-hidden z-10">
              <Image
                alt="Orville Giovanni Sambono - Software Engineer Portfolio Profile Picture"
                className="absolute inset-0 w-full h-full object-cover object-[center_15%] grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                src="/profile.webp"
                width={576}
                height={1024}
                priority
              />
              
              {/* Dynamic Spotlight Overlay on Face */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 mix-blend-screen"
                style={{
                  background: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--primary-rgb), 0.7), transparent 85%)`,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bio Content Column - Appears second (bottom) on mobile, first (left) on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="order-2 md:order-1 md:col-span-7 flex flex-col items-center md:items-start gap-6 z-30 relative -mt-8 md:mt-0 bg-background/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 sm:p-8 md:p-0 rounded-2xl md:rounded-none border border-outline-variant/50 md:border-0 shadow-2xl md:shadow-none w-[95%] md:w-full max-w-2xl md:max-w-none text-center md:text-left"
        >
          {/* Online Status Badge */}
          <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold gap-2 font-code-sm transition-all duration-300 ${
            isOnline 
              ? "border-emerald-500/30 text-emerald-400 bg-emerald-950/20" 
              : "border-red-500/30 text-red-400 bg-red-950/20"
          }`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isOnline ? "bg-emerald-400" : "bg-red-400"
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isOnline ? "bg-emerald-500" : "bg-red-500"
              }`}></span>
            </span>
            <span>SYS.STATUS: {isOnline ? "ONLINE" : "OFFLINE"}</span>
          </div>

          {/* Hero Name / Header */}
          <div className="space-y-4 w-full">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-tight font-extrabold uppercase leading-none">
              <span className="text-primary block mb-2">Orville Giovanni</span> Sambono
            </h1>

            {/* Typing CLI Subtitle */}
            <h2 className="font-headline-md text-lg md:text-2xl text-on-surface-variant text-muted-foreground mt-4 flex items-center justify-center md:justify-start gap-1 font-mono font-bold">
              <span className="text-secondary select-none">&gt;</span>
              <span>Software Engineer</span>
              <span className="w-[10px] h-[20px] md:h-[24px] bg-secondary animate-pulse ml-1" />
            </h2>
          </div>

          {/* Bio Description */}
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-[42rem] leading-relaxed text-muted-foreground">
            A fresh Software Engineering graduate based in Makassar, passionate about
            self-hosted infrastructure, advanced networking, and web development.
            Engineering robust solutions from bare metal to the cloud.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-2 w-full sm:w-auto">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-on-primary hover:bg-primary/90 h-12 px-6 py-2 hover-glow-primary-lg font-label-md gap-2 w-full sm:w-auto"
            >
              <FolderOpen className="h-5 w-5" />
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-outline-variant bg-background hover:bg-surface-container hover:text-on-surface h-12 px-6 py-2 font-label-md gap-2 w-full sm:w-auto"
            >
              <Mail className="h-5 w-5" />
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

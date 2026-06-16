"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Certs", href: "#certs" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-outline-variant bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container flex h-14 max-w-max-width mx-auto items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <a
          href="#"
          className="font-headline-md text-xl font-bold text-on-surface tracking-tight flex items-center space-x-2 group"
        >
          <Terminal className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-primary font-bold">Rville</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-primary text-on-surface-variant font-label-md relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Resume / CTA Button */}
        <div className="hidden md:flex items-center space-x-2">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-on-primary hover:bg-primary/90 h-9 px-4 py-2 hover-glow-primary-lg font-label-md duration-300"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="inline-flex items-center justify-center p-2 rounded-md text-on-surface-variant hover:text-primary hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Terminal className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-outline-variant bg-background/95 backdrop-blur-md"
          >
            <div className="flex flex-col space-y-4 px-6 py-6 font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="transition-colors hover:text-primary text-on-surface-variant font-label-md py-2 border-b border-outline-variant/35"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-on-primary hover:bg-primary/90 h-10 w-full font-label-md glow-primary-md mt-2"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

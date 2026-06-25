import React from "react";
import ShaderBackground from "@/components/ShaderBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Terminal from "@/components/Terminal";
import Achievement from "@/components/Achievement";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import CertsContact from "@/components/CertsContact";
import Footer from "@/components/Footer";
import BootWrapper from "@/components/BootWrapper";
import { PortfolioProvider } from "@/context/PortfolioContext";
import AdminPanel from "@/components/AdminPanel";

export default function Home() {
  return (
    <PortfolioProvider>
      {/* Interactive WebGL Shader Backdrop */}
      <ShaderBackground />

      {/* Sticky Header Nav */}
      <Header />
      
      {/* Main Container */}
      <main className="container max-w-max-width mx-auto px-4 md:px-8 py-10 md:py-20 space-y-24 flex-grow">
        <BootWrapper>
          {/* Intro Hero banner */}
          <Hero />

          {/* Continuous Tech Stack Marquee */}
          <Marquee />

          {/* Interactive Terminal CLI Emulator */}
          <Terminal />

          {/* Highlighted Cloud Computing Achievement */}
          <Achievement />

          {/* Work & Community Experience Timeline */}
          <Experience />

          {/* Project Showcases */}
          <Projects />

          {/* Credentials, Certs & Connect Form */}
          <CertsContact />
        </BootWrapper>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Admin Panel Sliding Drawer */}
      <AdminPanel />
    </PortfolioProvider>
  );
}

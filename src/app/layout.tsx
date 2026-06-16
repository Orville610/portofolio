import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orville Giovanni Sambono | Portfolio",
  description:
    "Portfolio of Orville Giovanni Sambono, a Software Engineer & Linux & Cloud Enthusiast. Engineering robust solutions from bare metal to the cloud, self-hosted environments, and distributed networking.",
  keywords: [
    "Orville Giovanni Sambono",
    "Software Engineer",
    "Cloud Computing",
    "Linux Enthusiast",
    "Makassar Developer",
    "Self-Hosted",
    "Tailscale",
    "Docker",
    "Armbian",
  ],
  authors: [{ name: "Orville Giovanni Sambono" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Preconnect links to speed up font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-background text-on-surface font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

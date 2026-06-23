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
  title: "Orville Giovanni Sambono | Software Engineer & Linux/Cloud Specialist",
  description:
    "Portfolio of Orville Giovanni Sambono, a Software Engineer & Linux & Cloud Enthusiast in Makassar. Specialized in docker deployments, network engineering (Tailscale, zero-trust), and robust cloud/bare-metal infrastructure solutions.",
  keywords: [
    "Orville Giovanni Sambono",
    "Software Engineer Portfolio",
    "Cloud Computing Engineer",
    "Linux Administration",
    "Self-Hosted Homelab",
    "Tailscale Zero Trust Network",
    "Docker Containerization",
    "Armbian Linux Developer",
    "Makassar Web Developer",
    "Orville Rville Portfolio",
  ],
  authors: [{ name: "Orville Giovanni Sambono", url: "https://rville.site" }],
  creator: "Orville Giovanni Sambono",
  publisher: "Orville Giovanni Sambono",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rville.site",
    title: "Orville Giovanni Sambono | Software Engineer & Linux/Cloud Specialist",
    description: "Engineering robust solutions from bare metal to the cloud, self-hosted environments, and distributed networking.",
    siteName: "Orville Giovanni Sambono Portfolio",
    images: [
      {
        url: "https://rville.site/profile.jpg",
        width: 800,
        height: 800,
        alt: "Orville Giovanni Sambono Portfolio Profile Picture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orville Giovanni Sambono | Software & Network Engineer",
    description: "Engineering robust solutions from bare metal to the cloud, self-hosted environments, and distributed networking.",
    images: ["https://rville.site/profile.jpg"],
  },
  alternates: {
    canonical: "https://rville.site",
  },
};

import PWARegister from "@/components/PWARegister";

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
        {/* PWA Manifest and Theme Color */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f0f11" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-background text-on-surface font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col`}
      >
        <PWARegister />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

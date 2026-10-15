import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import PWARegister from "@/components/PWARegister";
import { site } from "@/lib/site";
import "./globals.css";

const title = site.name + " | " + site.title;
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | " + site.name },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: { type: "website", locale: "en_US", url: site.url, title, description: site.description, siteName: "Rville Portfolio", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name + " — Web, Linux & Cloud" }] },
  twitter: { card: "summary_large_image", title, description: site.description, images: ["/opengraph-image"] },
  alternates: { canonical: "/" },
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Rville" },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/icons/icon-192.png", type: "image/png" }], shortcut: "/favicon.ico", apple: "/icons/icon-192.png" },
};
export const viewport: Viewport = { themeColor: "#0f0f11", colorScheme: "dark" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="dark">
    <body className="flex min-h-screen flex-col bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
      <a href="#main-content" className="skip-link print:hidden">Skip to content</a>
      {children}
      <PWARegister />
      {process.env.VERCEL === "1" && <><SpeedInsights /><Analytics /></>}
    </body>
  </html>;
}

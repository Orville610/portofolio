import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Personal Portfolio Admin",
    template: "%s | Personal Portfolio Admin",
  },
  description:
    "Portfolio pribadi berbasis Next.js dan Sanity dengan halaman cepat, SEO-friendly, dan studio admin di /studio.",
  openGraph: {
    title: "Personal Portfolio Admin",
    description:
      "Portfolio pribadi berbasis Next.js dan Sanity dengan admin panel embedded.",
    type: "website",
    url: "http://localhost:3000",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Portfolio Admin",
    description:
      "Portfolio pribadi berbasis Next.js dan Sanity dengan admin panel embedded.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text)]">
        <div className="relative flex min-h-screen flex-col">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(11,92,255,0.18),transparent_58%)]" />
          <SiteHeader />
          <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-16 pt-8 sm:px-8 lg:px-10">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

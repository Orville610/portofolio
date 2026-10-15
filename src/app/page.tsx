import type { Metadata } from "next";
import { site } from "@/lib/site";
import { externalUrl } from "@/lib/portfolio";
import ShaderBackground from "@/components/ShaderBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Achievement from "@/components/Achievement";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import CertsContact from "@/components/CertsContact";
import Footer from "@/components/Footer";
import { AdminTools, TerminalTools } from "@/components/InteractiveTools";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { getPortfolioData } from "@/lib/server/portfolio";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getPortfolioData();
  const title = hero.firstName + " " + hero.lastName + " | " + hero.title;
  return { title: { absolute: title }, description: hero.description, alternates: { canonical: "/" }, openGraph: { title, description: hero.description, url: "/", images: ["/opengraph-image"] }, twitter: { title, description: hero.description, images: ["/opengraph-image"] } };
}

export default async function Home() {
  const initialData = await getPortfolioData();
  return <PortfolioProvider initialData={initialData}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "Person", name: initialData.hero.firstName + " " + initialData.hero.lastName,
      url: site.url, image: externalUrl(initialData.settings.profileImageUrl) || site.url + "/profile.webp", jobTitle: initialData.hero.title,
      email: initialData.settings.email, description: initialData.hero.description, sameAs: [site.github, site.linkedin, site.instagram],
      address: { "@type": "PostalAddress", addressLocality: "Makassar", addressCountry: "ID" }, knowsAbout: initialData.skills,
    }).replace(/</g, "\\u003c") }} />
    <ShaderBackground />
    <Header />
    <main id="main-content" tabIndex={-1} className="container mx-auto w-full max-w-max-width flex-grow space-y-10 px-4 py-6 outline-none md:space-y-16 md:px-8 md:py-12">
      <Hero />
      <Projects />
      <Achievement />
      <Experience />
      <Marquee />
      <CertsContact />
      <TerminalTools />
    </main>
    <Footer />
    <AdminTools />
  </PortfolioProvider>;
}

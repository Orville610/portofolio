import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminAccess from "@/components/AdminAccess";
import { AdminTools } from "@/components/InteractiveTools";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { getPortfolioData } from "@/lib/server/portfolio";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Portfolio admin",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin" },
};
export default async function AdminPage() {
  const initialData = await getPortfolioData();
  return <PortfolioProvider initialData={initialData}>
    <Header />
    <main id="main-content" tabIndex={-1} className="flex w-full flex-1 items-center px-4 py-12 outline-none"><AdminAccess /></main>
    <Footer />
    <AdminTools />
  </PortfolioProvider>;
}

"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { PortfolioData, SaveResult } from "@/lib/portfolio";
export type { HeroData, ExperienceData, ProjectData, CertificationData, PortfolioData } from "@/lib/portfolio";

interface PortfolioContextType {
  portfolioData: PortfolioData;
  isAdmin: boolean;
  showAdminPanel: boolean;
  setShowAdminPanel: (value: boolean) => void;
  login: (password: string) => Promise<SaveResult>;
  saveData: (data: PortfolioData) => Promise<SaveResult>;
  logout: () => Promise<SaveResult>;
}
const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);
export function PortfolioProvider({ children, initialData }: { children: ReactNode; initialData: PortfolioData }) {
  const [portfolioData, setPortfolioData] = useState(initialData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/auth", { cache: "no-store", signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then(result => { if (result && !controller.signal.aborted) setIsAdmin(result.authenticated === true); })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  const login = useCallback(async (password: string): Promise<SaveResult> => {
    try {
      const response = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const result = await response.json();
      if (!response.ok || result.success !== true) return { success: false, message: result.message || "Could not sign in." };
      setIsAdmin(true);
      return { success: true, message: "Signed in." };
    } catch { return { success: false, message: "Could not reach the sign-in service. Please try again." }; }
  }, []);
  const saveData = useCallback(async (data: PortfolioData): Promise<SaveResult> => {
    try {
      const response = await fetch("/api/portfolio", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok || result.success !== true) return { success: false, message: result.message || "Changes could not be saved. Your draft is still open.", requiresLogin: response.status === 401 };
      setPortfolioData(result.data);
      return { success: true, message: result.message };
    } catch { return { success: false, message: "Could not reach the server. Your draft is still open; please try again." }; }
  }, []);
  const logout = useCallback(async (): Promise<SaveResult> => {
    try {
      const response = await fetch("/api/auth", { method: "DELETE" });
      if (!response.ok) return { success: false, message: "Could not sign out. Please try again." };
      setIsAdmin(false); setShowAdminPanel(false);
      return { success: true, message: "Signed out." };
    } catch { return { success: false, message: "Could not sign out. Please try again." }; }
  }, []);
  const value = useMemo(() => ({ portfolioData, isAdmin, showAdminPanel, setShowAdminPanel, login, saveData, logout }), [portfolioData, isAdmin, showAdminPanel, login, saveData, logout]);
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used within a PortfolioProvider");
  return context;
}

export function useOptionalPortfolio() { return useContext(PortfolioContext); }

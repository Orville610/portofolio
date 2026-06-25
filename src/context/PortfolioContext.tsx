"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface HeroData {
  firstName: string;
  lastName: string;
  title: string;
  description: string;
}

export interface ExperienceData {
  year: string;
  role: string;
  organization: string;
  description: string;
  iconName: string;
}

export interface ProjectData {
  filename: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

export interface CertificationData {
  title: string;
  desc: string;
}

export interface PortfolioData {
  hero: HeroData;
  skills: string[];
  experience: ExperienceData[];
  projects: ProjectData[];
  certifications: CertificationData[];
}

interface PortfolioContextType {
  portfolioData: PortfolioData;
  updatePortfolioData: (data: PortfolioData) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  showAdminPanel: boolean;
  setShowAdminPanel: (show: boolean) => void;
  saveData: (data: PortfolioData) => Promise<{ success: boolean; message: string }>;
  isLoading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

import initialLocalData from "../data/portfolio.json";

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialLocalData as PortfolioData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("portfolio_data");
      if (storedData) {
        setPortfolioData(JSON.parse(storedData));
      }
    } catch (e) {
      console.error("Failed to load portfolio data from localStorage:", e);
    }
    setIsLoading(false);
  }, []);

  const updatePortfolioData = (newData: PortfolioData) => {
    setPortfolioData(newData);
    try {
      localStorage.setItem("portfolio_data", JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to save portfolio data to localStorage:", e);
    }
  };

  const saveData = async (newData: PortfolioData): Promise<{ success: boolean; message: string }> => {
    updatePortfolioData(newData);

    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!res.ok) {
        throw new Error("Failed to save data on server");
      }

      const result = await res.json();
      return {
        success: true,
        message: result.message || "Changes saved successfully!"
      };
    } catch (error: any) {
      console.warn("Server save error (expected in read-only production environments):", error);
      return {
        success: true,
        message: "Saved locally to browser storage (Server is read-only in production)."
      };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        updatePortfolioData,
        isAdmin,
        setIsAdmin,
        showAdminPanel,
        setShowAdminPanel,
        saveData,
        isLoading,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}

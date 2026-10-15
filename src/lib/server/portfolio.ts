import "server-only";
import { cache } from "react";
import initialData from "@/data/portfolio.json";
import { normalizePortfolio, type PortfolioData } from "@/lib/portfolio";
import { portfolioSchema } from "./schema";
import { redisCommand, storageConfigured } from "./redis";

export const PORTFOLIO_KEY = "portfolio_data";

export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  if (storageConfigured()) {
    try {
      const stored = await redisCommand<string | null>(["GET", PORTFOLIO_KEY], 1500);
      if (stored) {
        const legacyData = normalizePortfolio({ achievement: initialData.achievement, ...JSON.parse(stored) } as PortfolioData);
        return normalizePortfolio(portfolioSchema.parse(legacyData));
      }
    } catch {
      console.error("Portfolio storage unavailable; serving the repository content.");
    }
  }
  return normalizePortfolio(portfolioSchema.parse(normalizePortfolio(initialData)));
});

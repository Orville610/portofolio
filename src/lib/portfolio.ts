import { site } from "./site";

export interface HeroData {
  firstName: string;
  lastName: string;
  title: string;
  description: string;
}
export interface SettingsData {
  email: string;
  profileImageUrl?: string;
  resumeUrl?: string;
}
export interface AchievementData {
  title: string;
  year: string;
  organization: string;
  description: string;
  proofUrl?: string;
}
export interface ExperienceData {
  year: string;
  role: string;
  organization: string;
  description: string;
  iconName: string;
}
export interface ProjectData {
  slug?: string;
  filename: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  category: string;
  problem?: string;
  approach?: string;
  outcome?: string;
}
export interface CertificationData {
  title: string;
  desc: string;
  issuer?: string;
  issuedAt?: string;
  credentialUrl?: string;
}
export interface PortfolioData {
  hero: HeroData;
  settings: SettingsData;
  achievement?: AchievementData | null;
  skills: string[];
  experience: ExperienceData[];
  projects: ProjectData[];
  certifications: CertificationData[];
}
export interface SaveResult {
  requiresLogin?: boolean;
  success: boolean;
  message: string;
}

export function externalUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function projectSlug(project: ProjectData): string {
  return project.slug || project.title.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Older Redis documents predate settings, photos, and achievement editing.
export function normalizePortfolio(data: Omit<PortfolioData, "settings"> & { settings?: SettingsData }): PortfolioData {
  return {
    ...data,
    settings: {
      email: data.settings?.email || site.email,
      profileImageUrl: externalUrl(data.settings?.profileImageUrl),
      resumeUrl: externalUrl(data.settings?.resumeUrl),
    },
    achievement: data.achievement ? { ...data.achievement, proofUrl: externalUrl(data.achievement.proofUrl) } : data.achievement,
    projects: data.projects.map(project => ({
      ...project,
      slug: project.slug || undefined,
      githubUrl: externalUrl(project.githubUrl),
      liveUrl: externalUrl(project.liveUrl),
      imageUrl: externalUrl(project.imageUrl),
    })),
    certifications: data.certifications.map(cert => ({
      ...cert,
      credentialUrl: externalUrl(cert.credentialUrl),
    })),
  };
}

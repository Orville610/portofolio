import { sanityClient } from "./client";
import {
  fallbackPosts,
  fallbackProfile,
  fallbackProjects,
  fallbackSiteSettings,
} from "./fallback-data";
import {
  experienceQuery,
  featuredProjectsQuery,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
  profileQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsQuery,
  recentPostsQuery,
  siteSettingsQuery,
  skillsQuery,
} from "./queries";
import type { Experience, Post, Profile, Project, SiteSettings, Skill } from "./types";

const revalidate = 60;

async function fetchSanity<T>(query: string, params: Record<string, string> = {}) {
  if (!sanityClient) {
    return null;
  }

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate },
    });
  } catch {
    return null;
  }
}

export async function getProfile(): Promise<Profile> {
  const [profile, skills, experience] = await Promise.all([
    fetchSanity<Omit<Profile, "skills" | "experience"> | null>(profileQuery),
    fetchSanity<Skill[] | null>(skillsQuery),
    fetchSanity<Experience[] | null>(experienceQuery),
  ]);

  if (!profile) {
    return fallbackProfile;
  }

  return {
    ...fallbackProfile,
    ...profile,
    skills: skills?.length ? skills : fallbackProfile.skills,
    experience: experience?.length ? experience : fallbackProfile.experience,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await fetchSanity<SiteSettings | null>(siteSettingsQuery);

  return settings ? { ...fallbackSiteSettings, ...settings } : fallbackSiteSettings;
}

export async function getProjects(): Promise<Project[]> {
  const projects = await fetchSanity<Project[] | null>(projectsQuery);

  return projects?.length ? projects : fallbackProjects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await fetchSanity<Project[] | null>(featuredProjectsQuery);

  return projects?.length
    ? projects
    : fallbackProjects.filter((project) => project.featured).slice(0, 2);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = await fetchSanity<Project | null>(projectBySlugQuery, { slug });

  return project ?? fallbackProjects.find((item) => item.slug === slug) ?? null;
}

export async function getProjectSlugs(): Promise<string[]> {
  const slugs = await fetchSanity<string[] | null>(projectSlugsQuery);

  return slugs?.length ? slugs : fallbackProjects.map((project) => project.slug);
}

export async function getPosts(): Promise<Post[]> {
  const posts = await fetchSanity<Post[] | null>(postsQuery);

  return posts?.length ? posts : fallbackPosts;
}

export async function getRecentPosts(): Promise<Post[]> {
  const posts = await fetchSanity<Post[] | null>(recentPostsQuery);

  return posts?.length ? posts : fallbackPosts.slice(0, 3);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await fetchSanity<Post | null>(postBySlugQuery, { slug });

  return post ?? fallbackPosts.find((item) => item.slug === slug) ?? null;
}

export async function getPostSlugs(): Promise<string[]> {
  const slugs = await fetchSanity<string[] | null>(postSlugsQuery);

  return slugs?.length ? slugs : fallbackPosts.map((post) => post.slug);
}

import {
  fallbackEducation,
  fallbackExperiences,
  fallbackPosts,
  fallbackProfile,
  fallbackProjects,
  fallbackServices,
  fallbackSiteSettings,
  fallbackSkills,
  fallbackSocialLinks,
  fallbackStats,
} from "./fallback";
import { fetchSanity } from "./client";
import type {
  Education,
  Experience,
  Post,
  Profile,
  Project,
  Service,
  SiteSettings,
  Skill,
  SocialLink,
  Stat,
} from "./types";

const imageProjection = `{
  ...,
  asset->
}`;

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  description,
  contactEmail,
  location,
  availableForWork
}`;

const profileQuery = `*[_type == "profile"][0]{
  name,
  role,
  introLabel,
  headline,
  subtitle,
  shortBio,
  bio,
  profileImage ${imageProjection},
  aboutImage ${imageProjection},
  cvUrl,
  email,
  phone,
  location
}`;

const servicesQuery = `*[_type == "service"] | order(order asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  description,
  icon,
  order
}`;

const projectsQuery = `*[_type == "project"] | order(order asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  summary,
  description,
  coverImage ${imageProjection},
  techStack,
  featured,
  liveUrl,
  githubUrl,
  year,
  order
}`;

const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  category,
  summary,
  description,
  coverImage ${imageProjection},
  techStack,
  featured,
  liveUrl,
  githubUrl,
  year,
  order
}`;

const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  readingTime,
  publishedAt,
  coverImage ${imageProjection}
}`;

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  readingTime,
  publishedAt,
  coverImage ${imageProjection},
  body
}`;

const skillsQuery = `*[_type == "skill"] | order(order asc, name asc) {
  _id,
  name,
  icon,
  category,
  level,
  order
}`;

const experiencesQuery = `*[_type == "experience"] | order(order asc, _createdAt desc) {
  _id,
  role,
  company,
  period,
  description,
  order
}`;

const educationQuery = `*[_type == "education"] | order(order asc, _createdAt desc) {
  _id,
  institution,
  degree,
  period,
  description,
  order
}`;

const statsQuery = `*[_type == "stat"] | order(order asc, label asc) {
  _id,
  label,
  value,
  suffix,
  order
}`;

const socialLinksQuery = `*[_type == "socialLink"] | order(order asc, label asc) {
  _id,
  label,
  url,
  icon,
  order
}`;

function listOrFallback<T>(data: T[], fallback: T[]) {
  return data.length > 0 ? data : fallback;
}

export async function getSiteSettings() {
  return fetchSanity<SiteSettings>(siteSettingsQuery, {}, fallbackSiteSettings);
}

export async function getProfile() {
  return fetchSanity<Profile>(profileQuery, {}, fallbackProfile);
}

export async function getServices() {
  const data = await fetchSanity<Service[]>(servicesQuery, {}, fallbackServices);
  return listOrFallback(data, fallbackServices);
}

export async function getProjects() {
  const data = await fetchSanity<Project[]>(projectsQuery, {}, fallbackProjects);
  return listOrFallback(data, fallbackProjects);
}

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, 3);
}

export async function getProjectBySlug(slug: string) {
  const fallbackProject =
    fallbackProjects.find((project) => project.slug === slug) ?? null;
  return fetchSanity<Project | null>(
    projectBySlugQuery,
    { slug },
    fallbackProject,
  );
}

export async function getPosts() {
  const data = await fetchSanity<Post[]>(postsQuery, {}, fallbackPosts);
  return listOrFallback(data, fallbackPosts);
}

export async function getPostBySlug(slug: string) {
  const fallbackPost = fallbackPosts.find((post) => post.slug === slug) ?? null;
  return fetchSanity<Post | null>(postBySlugQuery, { slug }, fallbackPost);
}

export async function getSkills() {
  const data = await fetchSanity<Skill[]>(skillsQuery, {}, fallbackSkills);
  return listOrFallback(data, fallbackSkills);
}

export async function getExperiences() {
  const data = await fetchSanity<Experience[]>(
    experiencesQuery,
    {},
    fallbackExperiences,
  );
  return listOrFallback(data, fallbackExperiences);
}

export async function getEducation() {
  const data = await fetchSanity<Education[]>(
    educationQuery,
    {},
    fallbackEducation,
  );
  return listOrFallback(data, fallbackEducation);
}

export async function getStats() {
  const data = await fetchSanity<Stat[]>(statsQuery, {}, fallbackStats);
  return listOrFallback(data, fallbackStats);
}

export async function getSocialLinks() {
  const data = await fetchSanity<SocialLink[]>(
    socialLinksQuery,
    {},
    fallbackSocialLinks,
  );
  return listOrFallback(data, fallbackSocialLinks);
}

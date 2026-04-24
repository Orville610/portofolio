import { groq } from "next-sanity";

export const profileQuery = groq`*[_type == "profile"][0]{
  _id,
  name,
  headline,
  shortBio,
  bio,
  longBio,
  email,
  location
}`;

export const skillsQuery = groq`*[_type == "skill"] | order(name asc){
  _id,
  name,
  "slug": slug.current
}`;

export const experienceQuery = groq`*[_type == "experience"] | order(orderRank asc, _createdAt desc){
  _id,
  role,
  company,
  period,
  summary,
  "slug": slug.current
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  _id,
  title,
  tagline,
  email,
  location,
  contactIntro,
  socialLinks,
  seo
}`;

export const projectsQuery = groq`*[_type == "project"] | order(featured desc, year desc, _createdAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  techStack,
  year,
  role,
  featured,
  demoUrl,
  repoUrl
}`;

export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(year desc, _createdAt desc)[0...2]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  techStack,
  year,
  role,
  featured,
  demoUrl,
  repoUrl
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  techStack,
  year,
  role,
  featured,
  demoUrl,
  repoUrl
}`;

export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)].slug.current`;

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  publishedAt,
  tags
}`;

export const recentPostsQuery = groq`*[_type == "post"] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  publishedAt,
  tags
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  publishedAt,
  tags
}`;

export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)].slug.current`;

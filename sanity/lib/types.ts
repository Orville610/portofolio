export type PortableTextBlock = {
  _type: string;
  _key?: string;
  style?: string;
  children?: Array<{
    _type: string;
    _key?: string;
    text?: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  listItem?: string;
  level?: number;
};

export type Skill = {
  _id?: string;
  name: string;
  slug: string;
};

export type Experience = {
  _id?: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  slug: string;
};

export type Profile = {
  _id?: string;
  name: string;
  headline: string;
  shortBio: string;
  bio: string;
  longBio: string;
  email: string;
  location: string;
  skills: Skill[];
  experience: Experience[];
};

export type Project = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  body: PortableTextBlock[];
  techStack: string[];
  year: string;
  role: string;
  featured: boolean;
  demoUrl?: string;
  repoUrl?: string;
};

export type Post = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  body: PortableTextBlock[];
  publishedAt: string;
  tags: string[];
};

export type SiteSettings = {
  _id?: string;
  title: string;
  tagline: string;
  email: string;
  location: string;
  contactIntro: string;
  socialLinks: {
    github: string;
    linkedin: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
  };
};

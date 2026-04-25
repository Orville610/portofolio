export type SanityImage = {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
  alt?: string;
};

export type PortableTextBlockLike = {
  _type: string;
  _key?: string;
  [key: string]: unknown;
};

export type SiteSettings = {
  title: string;
  description: string;
  contactEmail: string;
  location: string;
  availableForWork: boolean;
};

export type Profile = {
  name: string;
  role: string;
  introLabel: string;
  headline: string;
  subtitle: string;
  shortBio: string;
  bio: string;
  profileImage?: SanityImage;
  aboutImage?: SanityImage;
  cvUrl: string;
  email: string;
  phone: string;
  location: string;
};

export type Service = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  order: number;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  coverImage?: SanityImage;
  techStack: string[];
  featured: boolean;
  liveUrl: string;
  githubUrl: string;
  year: string;
  order: number;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  coverImage?: SanityImage;
  body?: PortableTextBlockLike[];
};

export type Skill = {
  _id: string;
  name: string;
  icon: string;
  category: string;
  level: string;
  order: number;
};

export type Experience = {
  _id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  order: number;
};

export type Education = {
  _id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
  order: number;
};

export type Stat = {
  _id: string;
  label: string;
  value: string;
  suffix: string;
  order: number;
};

export type SocialLink = {
  _id: string;
  label: string;
  url: string;
  icon: string;
  order: number;
};

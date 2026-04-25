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

export const fallbackSiteSettings: SiteSettings = {
  title: "Orville Giovanni Portfolio",
  description:
    "Personal portfolio for Orville Giovanni, an informatics student and frontend developer.",
  contactEmail: "orville@example.com",
  location: "Indonesia",
  availableForWork: true,
};

export const fallbackProfile: Profile = {
  name: "Orville Giovanni",
  role: "Informatics Student & Frontend Developer",
  introLabel: "INTRODUCING",
  headline: "I'm Orville Giovanni",
  subtitle: "Informatics Student & Frontend Developer",
  shortBio:
    "I build polished web interfaces with a focus on clarity, speed, and a strong product feel.",
  bio: "I am an informatics student who enjoys turning ideas into clean, responsive web experiences. My work blends frontend engineering, interface design, and a practical understanding of how digital products should feel for real users.",
  cvUrl: "#",
  email: "orville@example.com",
  phone: "+62 812 0000 0000",
  location: "Indonesia",
};

export const fallbackServices: Service[] = [
  {
    _id: "service-website-design",
    title: "Website Design",
    slug: "website-design",
    shortDescription: "Premium landing pages and portfolio visuals.",
    description:
      "Designing modern website concepts with strong hierarchy, responsive layouts, and a visual system that feels intentional from first scroll.",
    icon: "layout",
    order: 1,
  },
  {
    _id: "service-ui-ux-design",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    shortDescription: "User flows, wireframes, and refined interface systems.",
    description:
      "Creating focused user journeys, practical wireframes, and interface details that make products easier to understand and use.",
    icon: "pen",
    order: 2,
  },
  {
    _id: "service-frontend-development",
    title: "Frontend Development",
    slug: "frontend-development",
    shortDescription: "Responsive builds with Next.js and TypeScript.",
    description:
      "Building fast, accessible frontend experiences with reusable components, clean TypeScript, and production-ready styling.",
    icon: "code",
    order: 3,
  },
  {
    _id: "service-web-app-development",
    title: "Web App Development",
    slug: "web-app-development",
    shortDescription: "Interactive web apps with CMS-ready content.",
    description:
      "Developing practical dashboards, admin-ready websites, and content-driven applications that are prepared for deployment.",
    icon: "monitor",
    order: 4,
  },
];

export const fallbackProjects: Project[] = [
  {
    _id: "project-nova-dashboard",
    title: "Nova Analytics Dashboard",
    slug: "nova-analytics-dashboard",
    category: "Web App",
    summary: "A dark analytics interface for tracking product growth metrics.",
    description:
      "Nova Analytics is a concept dashboard with modular cards, chart-ready surfaces, and a sharp dark interface designed for founders and product teams.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity"],
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
    year: "2026",
    order: 1,
  },
  {
    _id: "project-lumen-portfolio",
    title: "Lumen Creative Portfolio",
    slug: "lumen-creative-portfolio",
    category: "Portfolio",
    summary: "A clean portfolio system with bold project storytelling.",
    description:
      "Lumen is a portfolio concept focused on editorial spacing, strong project covers, and a CMS-backed writing workflow.",
    techStack: ["Next.js", "Tailwind CSS", "Sanity"],
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
    year: "2026",
    order: 2,
  },
  {
    _id: "project-orbit-storefront",
    title: "Orbit Storefront",
    slug: "orbit-storefront",
    category: "Frontend",
    summary: "A futuristic storefront homepage for a digital product brand.",
    description:
      "Orbit Storefront explores premium product presentation with glass cards, high-contrast calls to action, and responsive content sections.",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
    year: "2025",
    order: 3,
  },
  {
    _id: "project-campus-connect",
    title: "Campus Connect",
    slug: "campus-connect",
    category: "UI/UX",
    summary: "A student activity platform concept with clean navigation.",
    description:
      "Campus Connect is a UI concept for managing student communities, events, and announcements through a simple responsive interface.",
    techStack: ["Figma", "React", "CSS"],
    featured: false,
    liveUrl: "#",
    githubUrl: "#",
    year: "2025",
    order: 4,
  },
];

export const fallbackSkills: Skill[] = [
  { _id: "skill-next", name: "Next.js", icon: "layers", category: "Frontend", level: "Advanced", order: 1 },
  { _id: "skill-ts", name: "TypeScript", icon: "braces", category: "Language", level: "Advanced", order: 2 },
  { _id: "skill-tailwind", name: "Tailwind CSS", icon: "sparkles", category: "Styling", level: "Advanced", order: 3 },
  { _id: "skill-react", name: "React", icon: "code", category: "Frontend", level: "Advanced", order: 4 },
  { _id: "skill-sanity", name: "Sanity CMS", icon: "database", category: "CMS", level: "Intermediate", order: 5 },
  { _id: "skill-figma", name: "Figma", icon: "figma", category: "Design", level: "Intermediate", order: 6 },
  { _id: "skill-git", name: "Git", icon: "github", category: "Workflow", level: "Intermediate", order: 7 },
  { _id: "skill-ui", name: "UI Systems", icon: "palette", category: "Design", level: "Intermediate", order: 8 },
];

export const fallbackExperiences: Experience[] = [
  {
    _id: "experience-freelance",
    role: "Frontend Developer",
    company: "Independent Projects",
    period: "2024 - Present",
    description:
      "Designing and building responsive portfolio, landing page, and dashboard concepts with modern frontend tools.",
    order: 1,
  },
  {
    _id: "experience-campus",
    role: "Project Contributor",
    company: "Campus Technology Projects",
    period: "2023 - Present",
    description:
      "Collaborating on academic and personal web projects, from interface planning to implementation and presentation.",
    order: 2,
  },
];

export const fallbackEducation: Education[] = [
  {
    _id: "education-informatics",
    institution: "University Program",
    degree: "Informatics Student",
    period: "2023 - Present",
    description:
      "Studying software development fundamentals, data structures, web engineering, and practical product thinking.",
    order: 1,
  },
];

export const fallbackStats: Stat[] = [
  { _id: "stat-projects", label: "Projects Done", value: "12", suffix: "+", order: 1 },
  { _id: "stat-experience", label: "Years Learning", value: "3", suffix: "+", order: 2 },
  { _id: "stat-reviews", label: "Peer Reviews", value: "18", suffix: "+", order: 3 },
  { _id: "stat-stack", label: "Core Tools", value: "8", suffix: "+", order: 4 },
];

export const fallbackSocialLinks: SocialLink[] = [
  { _id: "social-github", label: "GitHub", url: "https://github.com/", icon: "github", order: 1 },
  { _id: "social-linkedin", label: "LinkedIn", url: "https://linkedin.com/", icon: "linkedin", order: 2 },
  { _id: "social-email", label: "Email", url: "mailto:orville@example.com", icon: "mail", order: 3 },
];

export const fallbackPosts: Post[] = [
  {
    _id: "post-frontend-systems",
    title: "Designing Frontend Systems That Feel Premium",
    slug: "designing-frontend-systems",
    excerpt:
      "Notes on hierarchy, spacing, and component decisions that make developer portfolios feel more polished.",
    category: "Frontend",
    readingTime: "4 min read",
    publishedAt: "2026-02-12",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "A premium interface is not only about visual effects. It starts with hierarchy, spacing, and a clear reason for every section on the page.",
          },
        ],
      },
    ],
  },
  {
    _id: "post-sanity-workflow",
    title: "Why I Like CMS-Driven Portfolios",
    slug: "cms-driven-portfolios",
    excerpt:
      "A quick look at how Sanity helps keep project, article, and profile content editable without code changes.",
    category: "CMS",
    readingTime: "3 min read",
    publishedAt: "2026-01-24",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "A CMS-backed portfolio makes iteration faster because content updates do not require a deployment for every small copy or project change.",
          },
        ],
      },
    ],
  },
];

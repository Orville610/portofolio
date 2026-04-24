import type {
  Experience,
  PortableTextBlock,
  Post,
  Profile,
  Project,
  SiteSettings,
  Skill,
} from "./types";

const projectBody = (summary: string): PortableTextBlock[] => [
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: summary }],
  },
  {
    _type: "block",
    style: "h2",
    children: [{ _type: "span", text: "Highlights" }],
  },
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        text: "Semua konten ini hanya placeholder lokal. Setelah Studio aktif, buat dokumen project untuk mengganti judul, slug, isi, dan tautan demo.",
      },
    ],
  },
];

const postBody = (summary: string): PortableTextBlock[] => [
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: summary }],
  },
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        text: "Portable Text dari Sanity akan menggantikan blok ini begitu artikel asli dipublikasikan.",
      },
    ],
  },
];

export const fallbackSkills: Skill[] = [
  { name: "Next.js", slug: "nextjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind CSS", slug: "tailwind-css" },
  { name: "Sanity CMS", slug: "sanity-cms" },
  { name: "Figma", slug: "figma" },
  { name: "SEO", slug: "seo" },
];

export const fallbackExperience: Experience[] = [
  {
    role: "Freelance Web Developer",
    company: "Independent",
    period: "2024 - Present",
    summary:
      "Mengerjakan landing page, portfolio, dan dashboard ringan untuk klien UMKM dan personal brand.",
    slug: "freelance-web-developer",
  },
  {
    role: "Product Design Intern",
    company: "Example Studio",
    period: "2023 - 2024",
    summary:
      "Membantu wireframe, usability testing, dan handoff antarmuka untuk aplikasi web internal.",
    slug: "product-design-intern",
  },
];

export const fallbackProfile: Profile = {
  name: "Your Name",
  headline: "Developer and designer building clean digital experiences.",
  shortBio:
    "Saya membuat website, portfolio, dan interface yang cepat, rapi, dan mudah di-maintain.",
  bio: "Placeholder profile ini akan otomatis dipakai sebelum konten Sanity tersedia.",
  longBio:
    "Ganti data ini lewat Sanity Studio dengan cerita singkat tentang latar belakang, minat, dan jenis proyek yang ingin Anda tampilkan. Struktur halaman sudah disiapkan untuk kebutuhan developer, designer, maupun student portfolio.",
  email: "hello@example.com",
  location: "Makassar, Indonesia",
  skills: fallbackSkills,
  experience: fallbackExperience,
};

export const fallbackProjects: Project[] = [
  {
    title: "Studio Portfolio Refresh",
    slug: "studio-portfolio-refresh",
    excerpt:
      "Redesain portfolio personal dengan fokus pada performa, hierarchy konten, dan CMS editing flow.",
    body: projectBody(
      "Project ini menunjukkan bagaimana halaman statis, card layout, dan struktur konten dapat dikelola dari Sanity Studio tanpa perlu recode tiap update.",
    ),
    techStack: ["Next.js", "Sanity", "Tailwind CSS"],
    year: "2026",
    role: "Design + Frontend",
    featured: true,
    demoUrl: "https://example.com/demo",
    repoUrl: "https://github.com/example/repo",
  },
  {
    title: "Campus Event Microsite",
    slug: "campus-event-microsite",
    excerpt:
      "Microsite responsif untuk promosi event kampus dengan halaman pembicara, agenda, dan form CTA.",
    body: projectBody(
      "Contoh project kedua untuk memperlihatkan variasi jenis pekerjaan yang dapat dipresentasikan dari schema project yang sama.",
    ),
    techStack: ["TypeScript", "Tailwind CSS", "Vercel"],
    year: "2025",
    role: "Frontend Developer",
    featured: true,
    demoUrl: "https://example.com/event",
  },
  {
    title: "Student Case Study",
    slug: "student-case-study",
    excerpt:
      "Template case study sederhana untuk tugas akhir, capstone, atau eksperimen side project.",
    body: projectBody(
      "Gunakan ini sebagai baseline jika portfolio ditujukan untuk internship, scholarship, atau entry-level role.",
    ),
    techStack: ["React", "UI Design", "Content Strategy"],
    year: "2024",
    role: "Student Project",
    featured: false,
  },
];

export const fallbackPosts: Post[] = [
  {
    title: "How I structure a portfolio that is easy to update",
    slug: "easy-to-update-portfolio-structure",
    excerpt:
      "Catatan singkat tentang pemisahan konten, layout reusable, dan alasan memakai headless CMS.",
    body: postBody(
      "Portfolio seharusnya mudah dirawat. Dengan memindahkan data ke Sanity dan membiarkan Next.js menangani rendering, update jadi lebih cepat dan lebih aman.",
    ),
    publishedAt: "2026-03-10T00:00:00.000Z",
    tags: ["portfolio", "sanity"],
  },
  {
    title: "Designing a minimal homepage without making it empty",
    slug: "minimal-homepage-without-empty-feel",
    excerpt:
      "Beberapa prinsip sederhana untuk menjaga homepage tetap bersih tapi tetap punya arah visual.",
    body: postBody(
      "Minimal bukan berarti datar. Typography, spacing, contrast, dan CTA yang tegas biasanya cukup untuk membuat homepage terasa intentional.",
    ),
    publishedAt: "2026-02-18T00:00:00.000Z",
    tags: ["design", "ui"],
  },
  {
    title: "Static rendering for content-driven personal websites",
    slug: "static-rendering-for-personal-websites",
    excerpt: "Mengapa ISR cocok untuk portfolio dan blog yang update-nya tidak terlalu sering.",
    body: postBody(
      "Halaman statis memberi TTFB yang baik, SEO yang rapi, dan hosting yang lebih sederhana. ISR menutup celah saat konten berubah sesekali.",
    ),
    publishedAt: "2026-01-08T00:00:00.000Z",
    tags: ["nextjs", "seo"],
  },
];

export const fallbackSiteSettings: SiteSettings = {
  title: "Personal Portfolio Admin",
  tagline: "Next.js + Sanity portfolio",
  email: "hello@example.com",
  location: "Makassar, Indonesia",
  contactIntro:
    "Tambahkan email, lokasi, dan tautan sosial Anda dari Sanity Studio agar halaman contact dan CTA homepage ikut terbarui.",
  socialLinks: {
    github: "https://github.com/example",
    linkedin: "https://linkedin.com/in/example",
  },
  seo: {
    defaultTitle: "Personal Portfolio Admin",
    defaultDescription:
      "Portfolio pribadi modern dengan Next.js App Router, Tailwind CSS, dan embedded Sanity Studio.",
  },
};

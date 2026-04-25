# Personal Portfolio Admin

Portfolio modern premium untuk Orville Giovanni dengan Next.js App Router, TypeScript, Tailwind CSS, dan Sanity Studio di `/studio`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Sanity CMS + embedded Studio
- lucide-react icons
- npm
- Deploy-ready ke Vercel

## Halaman

- Home: hero split layout, services preview, about preview, stats, featured projects, skills, contact CTA.
- About: bio, education, experience, skills/tools, CV button.
- Services: Website Design, UI/UX Design, Frontend Development, Web App Development.
- Projects: grid project cards, category, tech stack, featured projects.
- Project Detail: cover image, description, tech stack, live demo, GitHub link.
- Blog: article listing.
- Blog Detail: rich text body dari Sanity.
- Contact: contact info, social links, form UI tanpa backend email.
- Studio: Sanity Studio di `/studio`.

## Struktur Penting

- `src/app` berisi route App Router.
- `src/components` berisi komponen UI reusable seperti Navbar, HeroSection, ProjectCard, ServiceCard, SkillBadge, dan ContactCTA.
- `src/sanity/schemas` berisi schema Sanity untuk siteSettings, profile, service, project, post, skill, experience, education, stat, dan socialLink.
- `src/sanity/queries.ts` berisi query dan fallback handling.
- `src/sanity/fallback.ts` berisi konten placeholder jika Sanity belum dikonfigurasi.
- `public/images` berisi placeholder image lokal.
- `sanity.config.ts` dan `sanity.cli.ts` berisi konfigurasi Studio.

## Environment

Buat `.env.local` dari `.env.local.example`.

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

Tidak ada token rahasia yang di-hardcode. Website tetap berjalan dengan fallback content jika env Sanity belum diisi.

## Menjalankan Lokal

```bash
npm install
npm run dev
```

URL:

- Website: `http://localhost:3000`
- Sanity Studio: `http://localhost:3000/studio`

## Verifikasi

Status terakhir:

- `npm run lint`: passed
- `npm run build`: passed

## Deploy ke Vercel

1. Buat project Sanity dan dataset, lalu isi env variables di Vercel.
2. Import repository/folder ini ke Vercel.
3. Pastikan framework preset adalah Next.js.
4. Tambahkan env variables yang sama dengan `.env.local.example`.
5. Deploy dari dashboard Vercel.
6. Tambahkan domain Vercel/deploy URL ke allowed CORS origin di Sanity Manage agar Studio dan frontend bisa mengakses project Sanity.

Project ini tidak melakukan deploy atau push Git otomatis.

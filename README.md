# Personal Portfolio Admin

Portfolio pribadi berbasis `Next.js App Router + TypeScript + Tailwind CSS + Sanity CMS`. Website publik dirender statis dengan revalidation, dan Sanity Studio di-embed pada route `/studio`.

## URL lokal

- Website: `http://localhost:3000`
- Admin Studio: `http://localhost:3000/studio`

## Environment variables

Copy file contoh lalu isi nilainya:

```bash
cp .env.local.example .env.local
```

Isi `.env.local` seperti ini:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
```

Penjelasan:

- `NEXT_PUBLIC_SITE_URL`: URL publik website. Lokal pakai `http://localhost:3000`, production ganti ke domain Vercel atau custom domain Anda.
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Project ID dari project Sanity Anda.
- `NEXT_PUBLIC_SANITY_DATASET`: Dataset Sanity, biasanya `production`.
- `NEXT_PUBLIC_SANITY_API_VERSION`: API date Sanity. Biarkan `2025-02-19` kecuali Anda memang ingin mengganti.

Jika environment Sanity belum diisi, website tetap tampil memakai placeholder lokal dan `/studio` akan menampilkan instruksi setup.

## Setup Sanity yang spesifik

1. Login ke Sanity di browser: `https://www.sanity.io/manage`
2. Buat project baru atau pakai project yang sudah ada.
3. Ambil `Project ID` dari project tersebut.
4. Pastikan Anda punya dataset `production`.
5. Isi `.env.local`:
   - `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID=<project-id-anda>`
   - `NEXT_PUBLIC_SANITY_DATASET=production`
   - `NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19`
6. Restart development server:

```bash
npm run dev
```

7. Buka `http://localhost:3000/studio`
8. Login dengan akun Sanity Anda.
9. Isi dokumen singleton:
   - `Profile`
   - `Site Settings`
10. Tambahkan dokumen koleksi:
   - `Project`
   - `Post`
   - `Skill`
   - `Experience`

Minimal konten yang sebaiknya Anda isi setelah login:

- `Profile`: nama, headline, short bio, bio, long bio, email, location
- `Site Settings`: title, tagline, email, location, contact intro, social links, SEO defaults
- `Project`: title, slug, excerpt, body, tech stack, year, role, featured, demo URL, repo URL
- `Post`: title, slug, excerpt, published date, tags, body
- `Skill`: nama skill
- `Experience`: role, company, period, summary

## Menjalankan project lokal

Install dependency bila belum ada:

```bash
npm install
```

Jalankan dev server:

```bash
npm run dev
```

Validasi:

```bash
npm run lint
npm run build
```

## Deploy ke Vercel untuk repo ini

Catatan:

- Saya tidak melakukan deploy otomatis.
- Instruksi ini ditujukan untuk repo GitHub `Orville610/portofolio`.
- Vercel mendukung import project langsung dari GitHub, lalu environment variables diisi dari dashboard project.

Langkah deploy:

1. Buka `https://vercel.com/new`
2. Login ke Vercel dengan akun yang terhubung ke GitHub Anda.
3. Import repository `Orville610/portofolio`
4. Saat Vercel mendeteksi framework:
   - framework preset: `Next.js`
   - root directory: gunakan folder project yang berisi `package.json`
5. Tambahkan Environment Variables di Vercel:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
6. Isi minimal nilai production:

```env
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
```

7. Klik `Deploy`
8. Setelah build selesai, buka URL production
9. Verifikasi route berikut:
   - `/`
   - `/about`
   - `/projects`
   - `/blog`
   - `/contact`
   - `/studio`
   - `/sitemap.xml`
   - `/robots.txt`

Sumber acuan Vercel:

- GitHub import dan project setup: `vercel.com` docs
- Environment variables untuk framework deployments: `vercel.com/docs/environment-variables/framework-environment-variables`

## Checklist setelah deploy

- Homepage tampil normal
- Metadata tidak lagi menunjuk ke `localhost`
- `/studio` bisa login
- `Profile` dan `Site Settings` sudah terisi
- Minimal 2 project dan 2 artikel sudah dipublish
- Halaman dinamis `/projects/[slug]` dan `/blog/[slug]` terbuka normal
- Jika memakai custom domain, update `NEXT_PUBLIC_SITE_URL` ke domain final lalu redeploy

## Struktur folder penting

- `app/`: route publik, metadata, sitemap, robots, dan route `/studio`
- `components/`: komponen layout dan card reusable
- `sanity.config.ts`: konfigurasi studio embedded
- `sanity/schemaTypes/`: schema dokumen Sanity
- `sanity/lib/`: env, query, metadata helper, content fetching, dan fallback placeholder
- `.env.local.example`: daftar environment variables yang perlu diisi

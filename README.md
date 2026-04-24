# Personal Portfolio Admin

Portfolio pribadi berbasis `Next.js App Router + TypeScript + Tailwind CSS + Sanity CMS`. Website publik dirender statis dengan revalidation, dan Sanity Studio di-embed pada route `/studio`.

## Local development

1. Copy environment example:

```bash
cp .env.local.example .env.local
```

2. Isi `.env.local` dengan nilai project Sanity Anda:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
```

3. Install dependencies jika belum:

```bash
npm install
```

4. Jalankan development server:

```bash
npm run dev
```

URL lokal:

- Website: `http://localhost:3000`
- Admin Studio: `http://localhost:3000/studio`

Jika environment Sanity belum diisi, website tetap tampil memakai placeholder lokal dan route `/studio` akan menampilkan instruksi setup.

## Cara mengisi Sanity

1. Buat project Sanity lewat dashboard atau CLI Anda sendiri.
2. Masukkan `projectId` dan `dataset` ke `.env.local`.
3. Restart server.
4. Buka `/studio`.
5. Isi dokumen singleton:
   - `Profile`
   - `Site Settings`
6. Tambahkan dokumen koleksi:
   - `Project`
   - `Post`
   - `Skill`
   - `Experience`

Schema sudah menyediakan field yang dibutuhkan untuk homepage, about, projects, blog, dan contact.

## Deploy ke Vercel

1. Push project ke repository Git Anda sendiri.
2. Import repository tersebut ke Vercel.
3. Tambahkan environment variables berikut di Project Settings:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
4. Jalankan deploy.

## Checklist setelah deploy

- Buka homepage dan cek metadata dasar.
- Pastikan `/studio` bisa login dan publish konten.
- Isi `Profile` dan `Site Settings`.
- Tambahkan minimal 2 project dan 2 artikel.
- Verifikasi halaman dinamis `/projects/[slug]` dan `/blog/[slug]`.
- Cek `sitemap.xml` dan `robots.txt`.

## Struktur folder penting

- `app/`: route publik, metadata, sitemap, robots, dan route `/studio`
- `components/`: komponen layout dan card reusable
- `sanity.config.ts`: konfigurasi studio embedded
- `sanity/schemaTypes/`: schema dokumen Sanity
- `sanity/lib/`: env, query, metadata helper, content fetching, dan fallback placeholder
- `.env.local.example`: daftar environment variables yang perlu diisi

## Validation scripts

- Lint: `npm run lint`
- Build: `npm run build`

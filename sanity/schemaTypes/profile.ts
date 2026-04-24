import { defineField, defineType } from "sanity";

export const profileType = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
      initialValue: "Your Name",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
      initialValue: "Developer and designer building clean digital experiences.",
    }),
    defineField({
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
      initialValue:
        "Saya membuat website, portfolio, dan interface yang cepat, rapi, dan mudah di-maintain.",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
      initialValue: "Placeholder profile ini akan otomatis dipakai sebelum konten Sanity tersedia.",
    }),
    defineField({
      name: "longBio",
      title: "Long Bio",
      type: "text",
      rows: 8,
      validation: (rule) => rule.required(),
      initialValue:
        "Ganti data ini lewat Sanity Studio dengan cerita singkat tentang latar belakang, minat, dan jenis proyek yang ingin Anda tampilkan.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required(),
      initialValue: "hello@example.com",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Makassar, Indonesia",
    }),
  ],
});

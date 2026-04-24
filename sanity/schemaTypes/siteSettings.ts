import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      validation: (rule) => rule.required(),
      initialValue: "Personal Portfolio Admin",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (rule) => rule.required(),
      initialValue: "Next.js + Sanity portfolio",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
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
    defineField({
      name: "contactIntro",
      title: "Contact Intro",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
      initialValue:
        "Tambahkan email, lokasi, dan tautan sosial Anda dari Sanity Studio agar halaman contact dan CTA homepage ikut terbarui.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "github", title: "GitHub", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Defaults",
      type: "object",
      fields: [
        defineField({
          name: "defaultTitle",
          title: "Default Title",
          type: "string",
          validation: (rule) => rule.required(),
          initialValue: "Personal Portfolio Admin",
        }),
        defineField({
          name: "defaultDescription",
          title: "Default Description",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required(),
          initialValue:
            "Portfolio pribadi modern dengan Next.js App Router, Tailwind CSS, dan embedded Sanity Studio.",
        }),
      ],
    }),
  ],
});

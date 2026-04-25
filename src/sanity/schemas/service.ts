import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: ["layout", "pen", "code", "monitor", "sparkles"],
      },
    }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 1 }),
  ],
  preview: {
    select: { title: "title", subtitle: "shortDescription" },
  },
});

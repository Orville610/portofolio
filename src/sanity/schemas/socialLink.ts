import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "url", title: "URL", type: "url" }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: ["github", "linkedin", "mail", "globe"] },
    }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 1 }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
  },
});

import { defineField, defineType } from "sanity";

export const skill = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: ["code", "braces", "sparkles", "database", "figma", "github", "palette", "layers"],
      },
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "level", title: "Level", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 1 }),
  ],
  preview: {
    select: { title: "name", subtitle: "category" },
  },
});

import { defineField, defineType } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "value", title: "Value", type: "string" }),
    defineField({ name: "suffix", title: "Suffix", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 1 }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});

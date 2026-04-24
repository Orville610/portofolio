import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["profile", "siteSettings"]);

export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "demo123",
  dataset: dataset || "production",
  apiVersion,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Profile")
              .id("profile")
              .child(S.document().schemaType("profile").documentId("profile")),
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings"),
              ),
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId() || ""),
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(({ action }) => action && singletonActions.has(action))
        : prev,
  },
});

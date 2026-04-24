import type { SchemaTypeDefinition } from "sanity";
import { experienceType } from "./experience";
import { postType } from "./post";
import { profileType } from "./profile";
import { projectType } from "./project";
import { siteSettingsType } from "./siteSettings";
import { skillType } from "./skill";

export const schemaTypes: SchemaTypeDefinition[] = [
  profileType,
  projectType,
  postType,
  skillType,
  experienceType,
  siteSettingsType,
];

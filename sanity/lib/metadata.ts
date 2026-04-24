import type { Metadata } from "next";
import { siteUrl } from "@/sanity/env";
import { fallbackSiteSettings } from "./fallback-data";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({
  title,
  description,
  path,
}: BuildMetadataInput): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: fallbackSiteSettings.title,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

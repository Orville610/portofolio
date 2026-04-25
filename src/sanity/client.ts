import { createClient, type SanityClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

let client: SanityClient | null = null;

export function isSanityConfigured() {
  return Boolean(projectId && dataset);
}

export function getSanityClient() {
  if (!isSanityConfigured()) {
    return null;
  }

  if (!client) {
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }

  return client;
}

export async function fetchSanity<T>(
  query: string,
  params: Record<string, string | number | boolean> = {},
  fallback: T,
) {
  const sanityClient = getSanityClient();

  if (!sanityClient) {
    return fallback;
  }

  try {
    const data = await sanityClient.fetch<T>(query, params);
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

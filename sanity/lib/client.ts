import { createClient } from "next-sanity";
import { apiVersion, dataset, hasSanityEnv, projectId } from "@/sanity/env";

export const sanityClient = hasSanityEnv
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

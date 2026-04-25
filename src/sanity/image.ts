import imageUrlBuilder from "@sanity/image-url";

import { getSanityClient } from "./client";

let builder: ReturnType<typeof imageUrlBuilder> | null = null;

function getBuilder() {
  const client = getSanityClient();

  if (!client) {
    return null;
  }

  if (!builder) {
    builder = imageUrlBuilder(client);
  }

  return builder;
}

export function imageUrl(
  source: unknown,
  fallback: string,
  options: { width?: number; height?: number } = {},
) {
  const sanityBuilder = getBuilder();

  if (!source || !sanityBuilder) {
    return fallback;
  }

  try {
    let urlBuilder = sanityBuilder.image(source);

    if (options.width) {
      urlBuilder = urlBuilder.width(options.width);
    }

    if (options.height) {
      urlBuilder = urlBuilder.height(options.height);
    }

    return urlBuilder.auto("format").fit("crop").url();
  } catch {
    return fallback;
  }
}

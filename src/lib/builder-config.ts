import { builder } from "@builder.io/sdk";

// Builder.io Configuration
export const BUILDER_CONFIG = {
  apiKey: import.meta.env.VITE_BUILDER_API_KEY,
  models: {
    page: "page",
    section: "section",
    data: "data"
  },
  preview: {
    enabled: import.meta.env.DEV,
    host: import.meta.env.VITE_APP_URL || "http://localhost:5173"
  }
} as const;

// Initialize Builder.io
export function initializeBuilder() {
  if (!BUILDER_CONFIG.apiKey) {
    console.warn(
      "Builder.io API key not found. Please set VITE_BUILDER_API_KEY in your environment variables."
    );
    return false;
  }

  builder.init(BUILDER_CONFIG.apiKey);
  builder.canTrack = !import.meta.env.DEV;

  return true;
}

// Fetch Builder.io content with robust preview and caching logic
export async function getBuilderContent(
  model: string,
  options: {
    url?: string;
    preview?: string | boolean;
    cachebust?: boolean;
    userAttributes?: Record<string, any>;
  } = {}
) {
  try {
    const content = await builder
      .get(model, {
        url: options.url || "/",
        preview:
          options.preview !== undefined
            ? (
                (typeof options.preview === "boolean" && options.preview === true) ||
                (typeof options.preview === "string" && options.preview === "true")
              )
            : (import.meta.env.DEV ? true : undefined),
        cachebust: options.cachebust ?? import.meta.env.DEV,
        userAttributes: options.userAttributes
      })
      .toPromise();

    return { content, error: null };
  } catch (error) {
    console.error(`Builder.io: Failed to fetch ${model} content:`, error);
    return { content: null, error: error as Error };
  }
}


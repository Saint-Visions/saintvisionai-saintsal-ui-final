// ✅ Use correct Builder SDK for React
import { builder } from "@builder.io/react";

export const BUILDER_CONFIG = {
  apiKey: import.meta.env.VITE_BUILDER_API_KEY || "",
  preview: {
    enabled: !!import.meta.env.VITE_BUILDER_PREVIEW_ENABLED
  }
};

/**
 * Initialize the Builder SDK with your API key
 */
export function initializeBuilder() {
  builder.init(BUILDER_CONFIG.apiKey);
  builder.canTrack = !import.meta.env.DEV;
}

/**
 * Fetch Builder.io content
 */
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

/**
 * Are we previewing this page in Builder’s preview mode?
 */
export const isPreviewMode = (params: URLSearchParams) =>
  params.get("builder.preview") === "true";

/**
 * Are we inside Builder’s visual editor?
 */
export const isEditingMode = (searchParams: URLSearchParams) =>
  typeof window !== "undefined" && (window as any).Builder?.editing === true;

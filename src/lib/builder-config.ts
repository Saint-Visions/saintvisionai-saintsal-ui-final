import { builder } from "@builder.io/sdk"

export async function getBuilderContent(
  model: string,
  options: {
    url?: string
    preview?: string
    cachebust?: boolean
    userAttributes?: Record<string, any>
  } = {}
) {
  try {
    const content = await builder
      .get(model, {
        url: options.url || '/',
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
      .toPromise()

    return { content, error: null }
  } catch (error) {
    console.error(`Builder.io: Failed to fetch ${model} content:`, error)
    return { content: null, error: error as Error }
  }
}

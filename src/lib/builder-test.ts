import { BUILDER_CONFIG, initializeBuilder } from "./builder-config";

/**
 * Test Builder.io integration health
 */
export function testBuilderIntegration() {
  console.log("🏗️ Testing Builder.io Integration...");

  const results = {
    apiKey: !!BUILDER_CONFIG.apiKey,
    initialized: false,
    componentsRegistered: false,
    ready: false
  };

  if (!BUILDER_CONFIG.apiKey) {
    console.error("❌ Builder.io API key not found");
    console.log("💡 Set VITE_BUILDER_API_KEY in your environment variables");
    return results;
  }
  console.log("✅ Builder.io API key found");

  try {
    results.initialized = initializeBuilder();
    if (results.initialized) {
      console.log("✅ Builder.io initialized successfully");
    } else {
      console.error("❌ Builder.io initialization failed");
      return results;
    }
  } catch (error) {
    console.error("❌ Builder.io initialization error:", error);
    return results;
  }

  try {
    if (typeof window !== "undefined" && (window as any).Builder) {
      console.log("✅ Builder.io SDK loaded");
      results.componentsRegistered = true;
    }
  } catch (error) {
    console.error("❌ SDK load check failed:", error);
  }

  results.ready =
    results.apiKey && results.initialized && results.componentsRegistered;

  if (results.ready) {
    console.log("🎉 Builder.io integration is ready!");
    console.log("📖 Visit /builder-demo for the integration guide");
    console.log("🏗️ Visit https://builder.io/content to create content");
  }

  return results;
}

/**
 * Get current integration status
 */
export function getBuilderStatus() {
  return {
    configured: !!BUILDER_CONFIG.apiKey,
    environment: import.meta.env.DEV ? "development" : "production",
    apiKey: BUILDER_CONFIG.apiKey
      ? `${BUILDER_CONFIG.apiKey.slice(0, 8)}...`
      : "not set",
    previewMode: BUILDER_CONFIG.preview.enabled
  };
}

// Auto-run only in dev
if (import.meta.env.DEV) {
  setTimeout(() => {
    testBuilderIntegration();
  }, 1000);
}

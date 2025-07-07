/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUILDER_API_KEY: string
  readonly VITE_APP_URL?: string
  DEV: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

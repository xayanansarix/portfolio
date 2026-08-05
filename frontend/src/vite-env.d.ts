/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRAPI_URL: string;
  readonly VITE_LEETCODE_USERNAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_URL: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_AUTH_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

<reference types="vite/client" />;

interface ImportMetaEnv {
  readonly VITE_REACT_APP_URL: RequestInfo | URL;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    readonly VITE_FRONTEND_URL: string;
    readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
/// <reference types="vite/client" />

// https://vite.dev/guide/env-and-mode.html#intellisense-for-typescript
interface ViteTypeOptions {
	strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
	readonly VITE_IN_GAME_SCREENSHOT_URL_PREFIX: string | undefined;
	readonly VITE_SPRITES_URL_PREFIX: string | undefined;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

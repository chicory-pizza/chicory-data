/* global process, __dirname */

import fs from 'node:fs';
import path from 'node:path';

import react from '@vitejs/plugin-react';
import {defineConfig, loadEnv} from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [react({})],
		resolve: {
			alias: {
				// https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2821326649
				'@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
			},
		},
		build: {
			assetsInlineLimit: 0,
			chunkSizeWarningLimit: 3000, // level_data is really big
		},
		server: {
			headers: getServerHeaders(env),
			https:
				env.SSL_KEY_FILE != null && env.SSL_CRT_FILE != null
					? {
							key: fs.readFileSync(path.resolve(__dirname, env.SSL_KEY_FILE)),
							cert: fs.readFileSync(path.resolve(__dirname, env.SSL_CRT_FILE)),
						}
					: undefined,
			port: 3000,

			// https://mattjennings.io/blog/how-to-enable-hmr-for-sveltekit-on-gitpod
			hmr: process.env.GITPOD_WORKSPACE_URL
				? {
						// removes the protocol and replaces it with the port we're connecting to
						host: process.env.GITPOD_WORKSPACE_URL.replace('https://', '3000-'),
						protocol: 'wss',
						clientPort: 443,
					}
				: {
						// https://github.com/vitejs/vite/issues/19662
						host: env.HOSTNAME,
					},
		},
	};
});

function getServerHeaders(env: Record<string, string>) {
	const inGameScreenshotHost = env.VITE_IN_GAME_SCREENSHOT_URL_PREFIX;
	const sprite = env.VITE_SPRITES_URL_PREFIX;

	// Keep this in sync with /public/_headers
	return {
		'X-Powered-By': 'Picnic',
		'X-Content-Type-Options': 'nosniff',
		'X-XSS-Protection': '0',
		'X-Frame-Options': 'DENY',
		// 'Strict-Transport-Security': 'max-age=31536000', // irrelevant during dev
		'Cross-Origin-Embedder-Policy': 'require-corp',
		'Cross-Origin-Opener-Policy': 'same-origin',
		'Cross-Origin-Resource-Policy': 'same-origin',
		'Permissions-Policy':
			'accelerometer=(),bluetooth=(),camera=(),display-capture=(),geolocation=(),gyroscope=(),hid=(),magnetometer=(),microphone=(),midi=(),otp-credentials=(),payment=(),publickey-credentials-create=(),publickey-credentials-get=(),serial=(),usb=(),xr-spatial-tracking=()',

		'Content-Security-Policy': [
			"default-src 'self'",

			// unsafe-inline: For Vite dev server
			"script-src 'self' 'unsafe-inline'",

			[
				'connect-src',
				"'self'",

				// https://github.com/w3c/webappsec-csp/issues/7
				// For Vite dev server, only needed on old Safari versions, uncomment if needed
				// 'ws://127.0.0.1:3000',

				process.env.GITPOD_WORKSPACE_URL
					? process.env.GITPOD_WORKSPACE_URL.replace(
							'https://',
							'wss://3000-'
						) + ':3000'
					: '',
			].join(' '),

			// unsafe-inline: For react-select (https://github.com/JedWatson/react-select/issues/2030)
			"style-src 'self' 'unsafe-inline'",

			// data: Inline images
			// blob: Read images to canvas for terrain editor
			[
				'img-src',
				"'self'",
				'data:',
				'blob:',
				inGameScreenshotHost ?? '',
				sprite ?? '',
			].join(' '),

			process.env.GITPOD_WORKSPACE_URL ? '' : "frame-ancestors 'none'",
			"base-uri 'none'",
			"object-src 'none'",
		].join(';'),
	};
}

// @flow strict

// https://vitejs.dev/guide/env-and-mode.html
type Import$Meta = {
	url?: string,
	env: {[key: string]: string | void, ...},
	...
};

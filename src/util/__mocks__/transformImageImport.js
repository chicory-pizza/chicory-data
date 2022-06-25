// @flow strict

export default function transformImageImport(url: URL): string {
	return url.href.replace('file://', '');
}

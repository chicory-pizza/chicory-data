// This will be mocked on tests
export default function transformImageImport(url: URL): string {
	return url.href;
}

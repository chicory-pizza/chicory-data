export default function transformImageImport(url: URL): string {
	return (
		url.href
			// Windows (file:///C:/ -> C:/)
			.replace(/^file:\/\/\/([A-Za-z]):\//, '$1:/')
			// Unix (file:///home/ -> /home/)
			.replace(/^file:\/\//, '')
	);
}

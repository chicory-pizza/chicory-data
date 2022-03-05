// @flow strict

export default function downloadBlob(blob: Blob, fileName: string) {
	const body = document.body;
	if (!body) {
		throw new Error('Document is not ready');
	}

	const url = window.URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = url;
	link.download = fileName;
	// Firefox requires link to be inserted in <body> before clicking
	// https://stackoverflow.com/a/27116581
	body.appendChild(link);
	link.click();
	link.remove();

	window.URL.revokeObjectURL(url);
}

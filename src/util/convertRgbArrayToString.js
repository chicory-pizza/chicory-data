// @flow strict

export default function convertRgbArrayToString(
	rgb: [number, number, number]
): string {
	return (
		'#' +
		rgb[0].toString(16).padStart(2, '0') +
		rgb[1].toString(16).padStart(2, '0') +
		rgb[2].toString(16).padStart(2, '0')
	);
}

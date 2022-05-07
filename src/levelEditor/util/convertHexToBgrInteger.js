// @flow strict

export default function convertHexToBgrInteger(hex: string): number {
	const cropped = hex.charAt(0) === '#' ? hex.substr(1) : hex;
	const int = parseInt(cropped, 16);

	const r = (int >> 16) & 0xff;
	const g = (int >> 8) & 0xff;
	const b = (int >> 0) & 0xff;

	return b * 256 * 256 + g * 256 + r;
}

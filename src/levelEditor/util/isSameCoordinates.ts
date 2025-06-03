export default function isSameCoordinates(
	a: [number, number, number],
	b: [number, number, number]
): boolean {
	return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

export default function sortCompareCoordinates(
	a: [number, number, number],
	b: [number, number, number]
): number {
	if (a[0] < b[0]) {
		return -1;
	} else if (a[0] > b[0]) {
		return 1;
	}

	if (a[1] < b[1]) {
		return -1;
	} else if (a[1] > b[1]) {
		return 1;
	}

	if (a[2] < b[2]) {
		return -1;
	} else if (a[2] > b[2]) {
		return 1;
	}

	return 0;
}

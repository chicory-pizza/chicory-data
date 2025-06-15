import {SCREEN_WIDTH, GEO_WIDTH, GEO_HEIGHT} from '../GeoConstants';

// Modified version based on chevreaux's PR
// (https://github.com/chicory-pizza/chicory-data/pull/19/commits/5f2198aaeded13880eead930cd3cbcdd9b2c508e#diff-7b6de9b8126e5a740ed550d4d8a85a9fb818eea0b452b9ae9f188a862f3a6139)

// Paint a line between two points
// Adapated from Wikipedia (https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm#Similar_algorithms)

export function paintBresenham(
	color: number,
	paintBuffer: ReadonlyArray<number>,
	mapMouseCoords: [number, number],
	previous: [number, number] | null,
	size: number
): ReadonlyArray<number> {
	const newPaintBuffer = paintBuffer.slice();
	const [x1, y1] = mouseCoordsToGeoCoords(mapMouseCoords);

	if (previous == null) {
		colorPixel(x1, y1, color, newPaintBuffer, size);
	} else {
		const [x0, y0] = mouseCoordsToGeoCoords(previous);

		if (x0 === x1 && y0 === y1) {
			return paintBuffer;
		}

		if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
			if (x0 > x1) {
				plotLineLow(x1, y1, x0, y0, color, newPaintBuffer, size);
			} else {
				plotLineLow(x0, y0, x1, y1, color, newPaintBuffer, size);
			}
		} else {
			if (y0 > y1) {
				plotLineHigh(x1, y1, x0, y0, color, newPaintBuffer, size);
			} else {
				plotLineHigh(x0, y0, x1, y1, color, newPaintBuffer, size);
			}
		}
	}
	return newPaintBuffer;
}

function plotLineLow(
	x0: number,
	y0: number,
	x1: number,
	y1: number,
	color: number,
	paintBuffer: Array<number>,
	size: number
) {
	const dx = x1 - x0;
	let dy = y1 - y0;

	let yi = 1;
	if (dy < 0) {
		yi = -1;
		dy = -dy;
	}

	let D = 2 * dy - dx;
	let y = y0;

	for (let x = x0; x <= x1; x++) {
		colorPixel(x, y, color, paintBuffer, size);
		if (D > 0) {
			y = y + yi;
			D = D + 2 * (dy - dx);
		} else {
			D = D + 2 * dy;
		}
	}
}

function plotLineHigh(
	x0: number,
	y0: number,
	x1: number,
	y1: number,
	color: number,
	paintBuffer: Array<number>,
	size: number
) {
	let dx = x1 - x0;
	const dy = y1 - y0;

	let xi = 1;
	if (dx < 0) {
		xi = -1;
		dx = -dx;
	}

	let D = 2 * dx - dy;
	let x = x0;

	for (let y = y0; y <= y1; y++) {
		colorPixel(x, y, color, paintBuffer, size);
		if (D > 0) {
			x = x + xi;
			D = D + 2 * (dx - dy);
		} else {
			D = D + 2 * dx;
		}
	}
}

function colorPixel(
	xi: number,
	yi: number,
	color: number,
	paintBuffer: Array<number>,
	size: number
) {
	const l = Math.floor(size / 2);
	const r = Math.ceil(size / 2);
	for (let x = xi - l; x < xi + r; x++) {
		if (x < 0 || x > GEO_WIDTH) {
			continue;
		}
		for (let y = yi - l; y < yi + r; y++) {
			const xa = Math.min(GEO_WIDTH - 1, Math.max(0, Math.floor(x)));
			const ya = Math.min(GEO_HEIGHT - 1, Math.max(0, Math.floor(y)));

			const index = xa + ya * 81;
			paintBuffer[index] = color;
		}
	}
}

function isOutOfGeoBounds(coords: [number, number]) {
	return (
		coords[0] < 0 ||
		coords[0] >= GEO_WIDTH ||
		coords[1] < 0 ||
		coords[1] >= GEO_HEIGHT
	);
}

function coordsToIndex(coords: [number, number]) {
	return coords[0] + coords[1] * GEO_WIDTH;
}

function mouseCoordsToGeoCoords(
	mouseCoords: [number, number] | null
): [number, number] {
	if (mouseCoords == null) {
		return [0, 0];
	}
	const factor = SCREEN_WIDTH / GEO_WIDTH;

	const x = Math.max(
		0,
		Math.min(GEO_WIDTH - 1, Math.floor(mouseCoords[0] / factor))
	);
	const y = Math.max(
		0,
		Math.min(GEO_HEIGHT - 1, Math.floor(mouseCoords[1] / factor))
	);
	return [x, y];
}

export function floodFill(
	color: number,
	decodedGeo: Uint8Array,
	mapMouseCoords: [number, number] | null
): Uint8Array {
	if (mapMouseCoords == null) {
		return decodedGeo;
	}

	const geoCoords = mouseCoordsToGeoCoords(mapMouseCoords);

	if (isOutOfGeoBounds(geoCoords)) {
		return decodedGeo;
	}
	const visitStack: Array<[number, number]> = [];
	const visited: Array<boolean> = [];
	const startingIndex = coordsToIndex(geoCoords);
	const matchingColor = decodedGeo[startingIndex];

	visitStack.push(geoCoords);

	while (visitStack.length > 0) {
		const currCoords = visitStack.pop();
		if (currCoords == null) {
			break;
		}

		const currIndex = coordsToIndex(currCoords);
		visited[currIndex] = true;
		decodedGeo[currIndex] = color;

		// Check in all orthogonal directions
		const coordsToCheck: Array<[number, number]> = [
			[currCoords[0] + 1, currCoords[1]],
			[currCoords[0] - 1, currCoords[1]],
			[currCoords[0], currCoords[1] + 1],
			[currCoords[0], currCoords[1] - 1],
		];

		for (const coordToCheck of coordsToCheck) {
			if (isOutOfGeoBounds(coordToCheck)) {
				continue;
			}
			const indexToCheck = coordsToIndex(coordToCheck);
			if (
				visited[indexToCheck] === true ||
				decodedGeo[indexToCheck] !== matchingColor
			) {
				continue;
			}

			visitStack.push(coordToCheck);
		}
	}

	return decodedGeo;
}

export function pickColor(
	decodedGeo: Uint8Array,
	mapMouseCoords: [number, number] | null
): number {
	const geoCoords = mouseCoordsToGeoCoords(mapMouseCoords);
	if (isOutOfGeoBounds(geoCoords)) {
		return 0;
	}
	const index = coordsToIndex(geoCoords);
	return decodedGeo[index];
}

// @flow strict

import {SCREEN_WIDTH, GEO_WIDTH, GEO_HEIGHT} from '../GeoConstants';

// Modified version based on chevreaux's PR
// (https://github.com/chicory-pizza/chicory-data/pull/19/commits/5f2198aaeded13880eead930cd3cbcdd9b2c508e#diff-7b6de9b8126e5a740ed550d4d8a85a9fb818eea0b452b9ae9f188a862f3a6139)

// Paint a line between two points
// Adapated from Wikipedia (https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm#Similar_algorithms)
export default function paintBresenham(
	color: number,
	paintBuffer: Array<number>,
	mapMouseMoveCoordinates: ?[number, number],
	previous: ?[number, number],
	size: number
): Array<number> {
	if (mapMouseMoveCoordinates === null) {
		return paintBuffer;
	}

	const mouse = mapMouseMoveCoordinates;
	const factor = SCREEN_WIDTH / GEO_WIDTH;
	const x1 = Math.max(
		0,
		Math.min(GEO_WIDTH - 1, Math.floor(mouse[0] / factor))
	);
	const y1 = Math.max(
		0,
		Math.min(GEO_HEIGHT - 1, Math.floor(mouse[1] / factor))
	);

	if (previous == null) {
		colorPixel(x1, y1, color, paintBuffer, size);
	} else {
		const x0 = Math.floor(previous[0] / factor);
		const y0 = Math.floor(previous[1] / factor);

		if (x0 === x1 && y0 === y1) {
			return paintBuffer;
		}

		if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
			if (x0 > x1) {
				plotLineLow(x1, y1, x0, y0, color, paintBuffer, size);
			} else {
				plotLineLow(x0, y0, x1, y1, color, paintBuffer, size);
			}
		} else {
			if (y0 > y1) {
				plotLineHigh(x1, y1, x0, y0, color, paintBuffer, size);
			} else {
				plotLineHigh(x0, y0, x1, y1, color, paintBuffer, size);
			}
		}
	}
	return paintBuffer;
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

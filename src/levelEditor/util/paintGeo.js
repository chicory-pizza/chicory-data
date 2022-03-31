// @flow strict

import {SCREEN_WIDTH, GEO_WIDTH} from '../GeoConstants';

// Paint a line between two points
// Adapated from Wikipedia (https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm#Similar_algorithms)
export default function paintBresenham(
	color: number,
	geoBitmap: Uint8Array,
	mapMouseMoveCoordinates: ?[number, number],
	previous: ?[number, number],
	size: number
): Uint8Array {
	const mouse = mapMouseMoveCoordinates;
	const factor = SCREEN_WIDTH / GEO_WIDTH;
	const x1 = Math.floor(mouse[0] / factor);
	const y1 = Math.floor(mouse[1] / factor);

	if (previous == null) {
		colorPixel(x1, y1, color, geoBitmap, size);
	} else {
		const x0 = Math.floor(previous[0] / factor);
		const y0 = Math.floor(previous[1] / factor);

		if (x0 === x1 && y0 === y1) {
			return;
		}

		if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
			if (x0 > x1) {
				plotLineLow(x1, y1, x0, y0, color, geoBitmap, size);
			} else {
				plotLineLow(x0, y0, x1, y1, color, geoBitmap, size);
			}
		} else {
			if (y0 > y1) {
				plotLineHigh(x1, y1, x0, y0, color, geoBitmap, size);
			} else {
				plotLineHigh(x0, y0, x1, y1, color, geoBitmap, size);
			}
		}
	}
	return geoBitmap;
}

function plotLineLow(x0, y0, x1, y1, color, geoBitmap, size) {
	const dx = x1 - x0;
	let dy = y1 - y0;

	let yi = 1;
	if (dy < 0) {
		yi = -1;
		dy = -dy;
	}

	let D = 2 * dy - dx;
	let y = y0;

	for (let x = x0; x < x1; x++) {
		colorPixel(x, y, color, geoBitmap, size);
		if (D > 0) {
			y = y + yi;
			D = D + 2 * (dy - dx);
		}
		D = D + 2 * dy;
	}
}

function plotLineHigh(x0, y0, x1, y1, color, geoBitmap, size) {
	let dx = x1 - x0;
	const dy = y1 - y0;

	let xi = 1;
	if (dx < 0) {
		xi = -1;
		dx = -dx;
	}

	let D = 2 * dy - dx;
	let x = x0;

	for (let y = y0; y < y1; y++) {
		colorPixel(x, y, color, geoBitmap, size);
		if (D > 0) {
			x = x + xi;
			D = D + 2 * (dx - dy);
		}
		D = D + 2 * dx;
	}
}

function colorPixel(xi, yi, color, geoBitmap, size) {
	const l = Math.floor(size / 2);
	const r = Math.ceil(size / 2);
	for (let x = xi - l; x < xi + r; x++) {
		if (x < 0 || x > GEO_WIDTH) {
			continue;
		}
		for (let y = yi - l; y < yi + r; y++) {
			let xa = Math.floor(x);
			let ya = Math.floor(y);
			const index = xa + ya * 81;
			geoBitmap[index] = color;
		}
	}
}

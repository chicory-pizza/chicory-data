// @flow strict

import {GEO_WIDTH, PIXEL_COLORS} from '../GeoConstants';

export default function drawGeoToCanvas({
	canvas,
	ctx,
	geo,
	scale,
	geoPaintBuffer,
}: {
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	geo: Uint8Array,
	scale: number,
	geoPaintBuffer: ?Array<number>,
}) {
	ctx.scale(scale, scale);

	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// pixels
	geo.forEach((pixel, index) => {
		let pixelToUse = pixel;
		if (geoPaintBuffer != null && geoPaintBuffer[index] != null) {
			pixelToUse = geoPaintBuffer[index];
		}

		const fill = PIXEL_COLORS.get(pixelToUse);
		if (fill == null) {
			console.warn('unknown pixel color ' + pixelToUse);
			return null;
		}

		ctx.fillStyle = fill;
		ctx.fillRect(index % GEO_WIDTH, Math.floor(index / GEO_WIDTH), 1, 1);
	});

	ctx.setTransform(1, 0, 0, 1, 0, 0);
}

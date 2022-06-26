// @flow strict

import {GEO_WIDTH, PIXEL_COLORS} from '../GeoConstants';

export default function drawGeoToCanvas({
	canvas,
	ctx,
	geo,
	scale,
}: {
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	geo: Uint8Array,
	scale: number,
}) {
	ctx.scale(scale, scale);

	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// pixels
	geo.forEach((pixel, index) => {
		const fill = PIXEL_COLORS.get(pixel);
		if (fill == null) {
			console.warn('unknown pixel color ' + pixel);
			return null;
		}

		ctx.fillStyle = fill;
		ctx.fillRect(index % GEO_WIDTH, Math.floor(index / GEO_WIDTH), 1, 1);
	});

	ctx.setTransform(1, 0, 0, 1, 0, 0);
}

import {GEO_WIDTH} from '../GeoConstants';

export default function drawGeoToCanvas({
	canvas,
	colors,
	ctx,
	geo,
	scale,
	geoPaintBuffer,
}: {
	canvas: HTMLCanvasElement;
	colors: Map<number, string>;
	ctx: CanvasRenderingContext2D;
	geo: Uint8Array;
	scale: number;
	geoPaintBuffer: Array<number> | null;
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

		const fill = colors.get(pixelToUse);
		if (fill == null) {
			console.warn('unknown pixel color ' + pixelToUse);
			return;
		}

		ctx.fillStyle = fill;
		ctx.fillRect(index % GEO_WIDTH, Math.floor(index / GEO_WIDTH), 1, 1);
	});

	ctx.setTransform(1, 0, 0, 1, 0, 0);
}

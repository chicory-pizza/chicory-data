export default function getCanvasRenderingContext(
	canvas: HTMLCanvasElement,
	alpha: boolean
): CanvasRenderingContext2D {
	const ctx = canvas.getContext('2d', {
		alpha,
	});

	if (!ctx) {
		throw new Error('Canvas rendering context is missing');
	}

	ctx.imageSmoothingEnabled = false;
	return ctx;
}

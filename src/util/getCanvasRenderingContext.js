// @flow strict

export default function getCanvasRenderingContext(
	canvas: HTMLCanvasElement,
	alpha: boolean
): CanvasRenderingContext2D {
	const ctx = canvas.getContext('2d', {
		alpha,
	});

	ctx.imageSmoothingEnabled = false;

	return ctx;
}

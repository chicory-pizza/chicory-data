// @flow strict

export default function getCanvasRenderingContext(
	canvas: HTMLCanvasElement
): CanvasRenderingContext2D {
	const ctx = canvas.getContext('2d', {
		alpha: false,
	});

	// $FlowFixMe[prop-missing]
	ctx.mozImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;

	return ctx;
}

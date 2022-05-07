// @flow strict

import getCanvasRenderingContext from './getCanvasRenderingContext';

let tempCtx;

export default function drawImageAsColor(
	ctx: CanvasRenderingContext2D,
	image: CanvasImageSource,
	color: string,
	x: number,
	y: number,
	width: number,
	height: number
): void {
	if (tempCtx == null) {
		const tempCanvas = document.createElement('canvas');
		tempCtx = getCanvasRenderingContext(tempCanvas, true);
	}

	tempCtx.canvas.width = width;
	tempCtx.canvas.height = height;

	// https://stackoverflow.com/a/26505047
	tempCtx.clearRect(0, 0, width, height);
	tempCtx.drawImage(image, 0, 0, width, height);
	tempCtx.globalCompositeOperation = 'source-atop';
	tempCtx.fillStyle = color;
	tempCtx.fillRect(0, 0, width, height);

	ctx.drawImage(image, x, y, width, height);

	ctx.globalCompositeOperation = 'multiply';
	ctx.drawImage(tempCtx.canvas, x, y, width, height);
	ctx.globalCompositeOperation = 'source-over';
}

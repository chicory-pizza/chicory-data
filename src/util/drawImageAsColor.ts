import type {CanvasImageSourceWithSize} from '../dog/drawDogToCanvas';

import getCanvasRenderingContext from './getCanvasRenderingContext';

const DEFAULT_BLACK = '#000000';
const outlineImageCache: Record<string, ImageData> = {};

let tempCtx: CanvasRenderingContext2D | undefined;

export default function drawImageAsColor(
	ctx: CanvasRenderingContext2D,
	image: CanvasImageSourceWithSize,
	options: {
		cacheKey?: string;
		customOverlayImage?: CanvasImageSourceWithSize | null;
		fillColor: string;
		outlineColor?: string;
	},
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
	tempCtx.clearRect(0, 0, width, height);

	// First draw the original image to a temp canvas
	tempCtx.drawImage(image, 0, 0, width, height);

	// If outlines are colorized, get the image data for the outlines while we're here
	// Might make sense to split to a new function...
	const outlineColor = options.outlineColor;
	let outlineImageData: ImageData | null = null;
	if (outlineColor != null && outlineColor !== DEFAULT_BLACK) {
		const cacheKey = options.cacheKey;
		if (cacheKey == null) {
			throw new Error(
				'Cache key is required for performance to colorize outlines'
			);
		}

		if (outlineImageCache[cacheKey]) {
			outlineImageData = outlineImageCache[cacheKey];
		} else {
			outlineImageData = tempCtx.getImageData(0, 0, width, height);
			for (let i = 0; i < outlineImageData.data.length; i += 4) {
				if (
					outlineImageData.data[i] === 255 &&
					outlineImageData.data[i + 1] === 255 &&
					outlineImageData.data[i + 2] === 255
				) {
					outlineImageData.data[i + 3] = 0;
				}
			}

			outlineImageCache[cacheKey] = outlineImageData;
		}
	}

	// Fill the whole canvas with a color but only to already drawn areas
	// https://stackoverflow.com/a/26505047
	if (options.fillColor !== '#ffffff') {
		tempCtx.globalCompositeOperation = 'source-atop';
		tempCtx.fillStyle = options.fillColor;
		tempCtx.fillRect(0, 0, width, height);
		tempCtx.globalCompositeOperation = 'source-over';
	}

	// Overlay/skin
	if (options.customOverlayImage != null) {
		tempCtx.globalCompositeOperation = 'source-atop';
		tempCtx.drawImage(options.customOverlayImage, 0, 0, width, height);
		tempCtx.globalCompositeOperation = 'source-over';
	}

	// Now draw the original image to the real canvas
	ctx.drawImage(image, x, y, width, height);

	// Fill in the colors
	if (options.fillColor !== '#ffffff' || options.customOverlayImage != null) {
		ctx.globalCompositeOperation = 'multiply';
		ctx.drawImage(tempCtx.canvas, x, y, width, height);
		ctx.globalCompositeOperation = 'source-over';
	}

	// Draw colorized outlines
	if (
		outlineColor != null &&
		outlineColor !== DEFAULT_BLACK &&
		outlineImageData
	) {
		tempCtx.clearRect(0, 0, width, height);
		tempCtx.putImageData(outlineImageData, 0, 0);

		tempCtx.globalCompositeOperation = 'source-atop';
		tempCtx.fillStyle = outlineColor;
		tempCtx.fillRect(0, 0, width, height);
		tempCtx.globalCompositeOperation = 'source-over';

		ctx.drawImage(tempCtx.canvas, x, y, width, height);
	}
}

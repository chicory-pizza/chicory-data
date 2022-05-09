// @flow strict

import drawImageAsColor from '../util/drawImageAsColor';
import getCanvasRenderingContext from '../util/getCanvasRenderingContext';

import type {DogClothesType} from './types/DogClothesList';
import type {DogHairType} from './types/DogHairList';
import type {DogHatType} from './types/DogHatList';

export const SIZE = 750;

export default function drawDogToCanvas(
	canvas: HTMLCanvasElement,
	images: {
		idle2: CanvasImageSource,
		clothes: CanvasImageSource,
		idle1: CanvasImageSource,
		clothesLayer2: ?CanvasImageSource,
		head: CanvasImageSource,
		hair: CanvasImageSource,
		hat: ?CanvasImageSource,
		hatLayer2: ?CanvasImageSource,
		ear: CanvasImageSource,
	},
	colors: {
		clothesColor: string,
		hatColor: string,
		skinColor: string,
		skinOutlineColor?: string,
	},
	options: {
		clothesInfo: DogClothesType,
		hairInfo: DogHairType,
		hatInfo: DogHatType,
	}
) {
	let layer2 = images.hatLayer2 || images.clothesLayer2;
	let collar = images.hatLayer2 ? null : options.clothesInfo.collar;

	const ctx = getCanvasRenderingContext(canvas, true);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawImageAsColor(
		ctx,
		images.idle2,
		{
			fillColor: colors.skinColor,
			outlineColor: colors.skinOutlineColor,
			cacheKey: 'idle2',
		},
		0,
		0,
		SIZE,
		SIZE
	);
	drawImageAsColor(
		ctx,
		images.clothes,
		{fillColor: colors.clothesColor},
		0,
		0,
		SIZE,
		SIZE
	);
	if (layer2 && collar === 2) {
		// Hiker
		drawImageAsColor(
			ctx,
			layer2,
			{fillColor: colors.hatColor},
			0,
			0,
			SIZE,
			SIZE
		);
		layer2 = null;
	}
	drawImageAsColor(
		ctx,
		images.idle1,
		{
			fillColor: colors.skinColor,
			outlineColor: colors.skinOutlineColor,
			cacheKey: 'idle1',
		},
		0,
		0,
		SIZE,
		SIZE
	);
	if (layer2 && collar == null) {
		// Gorgeous
		drawImageAsColor(
			ctx,
			layer2,
			{fillColor: colors.hatColor},
			// this is from game code and this condition won't pass anyway
			// collar === 1 ? colors.clothesColor : colors.hatColor,
			0,
			0,
			SIZE,
			SIZE
		);
	}
	// This is for Horns which is not drawing correctly yet
	// if (hatInfo.showHair != null && hatInfo.showHair > 2) {
	// 	ctx.drawImage(hair, 0, 0, 0, 0, SIZE, SIZE);
	// }
	drawImageAsColor(
		ctx,
		images.head,
		{
			fillColor: colors.skinColor,
			outlineColor: colors.skinOutlineColor,
			cacheKey: 'head',
		},
		161,
		48,
		480,
		480
	);
	if (
		!images.hat ||
		options.hatInfo.showHair === 1 ||
		(options.hatInfo.showHair != null && options.hatInfo.showHair > 2)
	) {
		drawImageAsColor(
			ctx,
			images.hair,
			{
				fillColor: colors.skinColor,
				outlineColor: colors.skinOutlineColor,
				cacheKey: 'hair_' + options.hairInfo.internalName,
			},
			0,
			0,
			SIZE,
			SIZE
		);
	}
	if (images.hat && options.hatInfo.showHair !== 2) {
		drawImageAsColor(
			ctx,
			images.hat,
			{fillColor: colors.hatColor},
			0,
			0,
			SIZE,
			SIZE
		);
	}
	if (layer2 && collar != null) {
		// Collar: 1 - Royal
		// Collar: 2 - Hiker
		drawImageAsColor(
			ctx,
			layer2,
			{fillColor: collar === 1 ? colors.clothesColor : colors.hatColor},
			0,
			0,
			SIZE,
			SIZE
		);
	}
	drawImageAsColor(
		ctx,
		images.ear,
		{
			fillColor: colors.skinColor,
			outlineColor: colors.skinOutlineColor,
			cacheKey: 'ear',
		},
		0,
		0,
		SIZE,
		SIZE
	);
	if (images.hat && options.hatInfo.showHair === 2) {
		drawImageAsColor(
			ctx,
			images.hat,
			{fillColor: colors.hatColor},
			0,
			0,
			SIZE,
			SIZE
		);
	}
}

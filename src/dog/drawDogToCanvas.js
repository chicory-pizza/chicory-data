// @flow strict

import drawImageAsColor from '../util/drawImageAsColor';
import getCanvasRenderingContext from '../util/getCanvasRenderingContext';

import type {DogClothesType} from './types/DogClothesList';
import type {DogHairType} from './types/DogHairList';
import type {DogHatType} from './types/DogHatList';

export const SIZE = 750;
export const CUSTOM_CLOTHES_WIDTH = 235;
export const CUSTOM_CLOTHES_HEIGHT = 265;
export const CUSTOM_HAT_WIDTH = 480;
export const CUSTOM_HAT_HEIGHT = 480;

export type ChosenHat = {
	name: string,
	color: string,
	customImage: ?Image,
};

export default function drawDogToCanvas(
	canvas: HTMLCanvasElement,
	images: {
		idle2: CanvasImageSource,
		clothes: CanvasImageSource,
		idle1: CanvasImageSource,
		clothesLayer2: ?CanvasImageSource,
		head: CanvasImageSource,
		hair: CanvasImageSource,
		ear: CanvasImageSource,
	},
	colors: {
		clothesColor: string,
		skinColor: string,
		skinOutlineColor?: string,
	},
	options: {
		clothesInfo: DogClothesType,
		hairInfo: DogHairType,
		hats: $ReadOnlyArray<{
			color: string,
			hatInfo: DogHatType,

			// Images
			hatShowHairExtra: ?CanvasImageSource,
			hat: ?CanvasImageSource,
			hatLayer2: ?CanvasImageSource,
		}>,
	}
) {
	// The top-most hat layer wins
	const gotAnyHatWithLayer2 = options.hats.find(
		(hat) => hat.hatLayer2
	)?.hatLayer2;

	let hatOrClothesLayer2 = gotAnyHatWithLayer2 || images.clothesLayer2;
	let clothesCollar: ?number = gotAnyHatWithLayer2
		? null
		: options.clothesInfo.collar;

	const hasCustomClothes =
		images.clothes.width <= CUSTOM_CLOTHES_WIDTH &&
		images.clothes.height <= CUSTOM_CLOTHES_HEIGHT;

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
		hasCustomClothes ? 255 : 0,
		hasCustomClothes ? 424 : 0,
		images.clothes.width,
		images.clothes.height
	);

	if (hatOrClothesLayer2 && clothesCollar === 2) {
		// Hiker
		drawImageAsColor(
			ctx,
			hatOrClothesLayer2,
			{fillColor: options.hats[0].color},
			0,
			0,
			SIZE,
			SIZE
		);
		hatOrClothesLayer2 = null;
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

	if (hatOrClothesLayer2 && clothesCollar == null) {
		if (hatOrClothesLayer2 === images.clothesLayer2) {
			// Gorgeous
			drawImageAsColor(
				ctx,
				hatOrClothesLayer2,
				{fillColor: options.hats[0].color},
				// this is from game code and this condition won't pass anyway
				// collar === 1 ? colors.clothesColor : colors.hatColor,
				0,
				0,
				SIZE,
				SIZE
			);
		} else {
			for (let i = options.hats.length - 1; i >= 0; i -= 1) {
				const hat = options.hats[i];
				if (hat.hatLayer2) {
					drawImageAsColor(
						ctx,
						hat.hatLayer2,
						{fillColor: hat.color},
						// this is from game code and this condition won't pass anyway
						// collar === 1 ? colors.clothesColor : colors.hatColor,
						0,
						0,
						SIZE,
						SIZE
					);
				}
			}
		}
	}

	for (let i = options.hats.length - 1; i >= 0; i -= 1) {
		const hat = options.hats[i];
		if (
			hat.hatShowHairExtra != null &&
			hat.hatInfo.showHair != null &&
			hat.hatInfo.showHair > 2
		) {
			// Horns
			drawImageAsColor(
				ctx,
				hat.hatShowHairExtra,
				{fillColor: hat.color},
				0,
				0,
				SIZE,
				SIZE
			);
		}
	}

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
		options.hats.every((hat) => {
			return (
				// There are no hats at all
				hat.hat == null ||
				// Ensure all hats can show hair
				hat.hatInfo.showHair === 1 ||
				(hat.hatInfo.showHair != null && hat.hatInfo.showHair > 2)
			);
		})
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

	for (let i = options.hats.length - 1; i >= 0; i -= 1) {
		const hat = options.hats[i];
		if (hat.hat && hat.hatInfo.showHair !== 2) {
			drawImageAsColor(ctx, hat.hat, {fillColor: hat.color}, 0, 0, SIZE, SIZE);
		}
	}

	if (hatOrClothesLayer2 && clothesCollar != null) {
		// Collar: 1 - Royal
		// Collar: 2 - Hiker
		drawImageAsColor(
			ctx,
			hatOrClothesLayer2,
			{
				fillColor:
					clothesCollar === 1 ? colors.clothesColor : options.hats[0].color,
			},
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

	for (let i = options.hats.length - 1; i >= 0; i -= 1) {
		const hat = options.hats[i];
		if (hat.hat && hat.hatInfo.showHair === 2) {
			const hasCustomHat =
				hat.hat != null &&
				hat.hat.width <= CUSTOM_HAT_WIDTH &&
				hat.hat.height <= CUSTOM_HAT_HEIGHT;

			drawImageAsColor(
				ctx,
				hat.hat,
				{fillColor: hat.color},
				hasCustomHat ? 161 : 0,
				hasCustomHat ? 48 : 0,
				hat.hat.width,
				hat.hat.height
			);
		}
	}
}

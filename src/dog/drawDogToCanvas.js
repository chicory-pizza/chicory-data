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

const HAT_ORIGIN_X = 385;
const HAT_ORIGIN_Y = 420;
const HEAD_ORIGIN_X = 225;
const HEAD_ORIGIN_Y = 370;
const CLOTHES_ORIGIN_X = 375;
const CLOTHES_ORIGIN_Y = 599;
const IDLE_ORIGIN_X = 375;
const IDLE_ORIGIN_Y = 650;

const HEAD_ANIM_X = -2.5;
const HEAD_ANIM_Y = -45.6;
const CLOTHES_ANIM_X = -4.55;
const CLOTHES_ANIM_Y = -12.05;

const DOG_RES_SCALE = 5;

const HAT_TRANSLATED_X =
	IDLE_ORIGIN_X + (-HAT_ORIGIN_X + HEAD_ANIM_X * DOG_RES_SCALE);
const HAT_TRANSLATED_Y =
	IDLE_ORIGIN_Y + (-HAT_ORIGIN_Y + HEAD_ANIM_Y * DOG_RES_SCALE);
const HEAD_TRANSLATED_X =
	IDLE_ORIGIN_X + (-HEAD_ORIGIN_X + HEAD_ANIM_X * DOG_RES_SCALE);
const HEAD_TRANSLATED_Y =
	IDLE_ORIGIN_Y + (-HEAD_ORIGIN_Y + HEAD_ANIM_Y * DOG_RES_SCALE);
const CLOTHES_TRANSLATED_X =
	IDLE_ORIGIN_X + (-CLOTHES_ORIGIN_X + CLOTHES_ANIM_X * DOG_RES_SCALE);
const CLOTHES_TRANSLATED_Y =
	IDLE_ORIGIN_Y + (-CLOTHES_ORIGIN_Y + CLOTHES_ANIM_Y * DOG_RES_SCALE);

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
		hasCustomClothes ? 255 + CLOTHES_TRANSLATED_X : CLOTHES_TRANSLATED_X,
		hasCustomClothes ? 424 + CLOTHES_TRANSLATED_Y : CLOTHES_TRANSLATED_Y,
		images.clothes.width,
		images.clothes.height
	);

	if (hatOrClothesLayer2 && clothesCollar === 2) {
		// Hiker
		drawImageAsColor(
			ctx,
			hatOrClothesLayer2,
			{fillColor: options.hats[0].color},
			CLOTHES_TRANSLATED_X,
			CLOTHES_TRANSLATED_Y,
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
				CLOTHES_TRANSLATED_X,
				CLOTHES_TRANSLATED_Y,
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
						HAT_TRANSLATED_X,
						HAT_TRANSLATED_Y,
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
				HAT_TRANSLATED_X,
				HAT_TRANSLATED_Y,
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
		HEAD_TRANSLATED_X,
		HEAD_TRANSLATED_Y,
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
			HAT_TRANSLATED_X,
			HAT_TRANSLATED_Y,
			SIZE,
			SIZE
		);
	}

	for (let i = options.hats.length - 1; i >= 0; i -= 1) {
		const hat = options.hats[i];
		if (hat.hat && hat.hatInfo.showHair !== 2) {
			drawImageAsColor(
				ctx,
				hat.hat,
				{fillColor: hat.color},
				HAT_TRANSLATED_X,
				HAT_TRANSLATED_Y,
				SIZE,
				SIZE
			);
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
			HAT_TRANSLATED_X,
			HAT_TRANSLATED_Y,
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
				hasCustomHat ? 161 + HAT_TRANSLATED_X : HAT_TRANSLATED_X,
				hasCustomHat ? 48 + HAT_TRANSLATED_Y : HAT_TRANSLATED_Y,
				hat.hat.width,
				hat.hat.height
			);
		}
	}
}

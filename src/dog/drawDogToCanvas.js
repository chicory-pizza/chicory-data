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
const CLOTHES_ORIGIN_X = 375;
const CLOTHES_ORIGIN_Y = 599;
const IDLE_ORIGIN_X = 375;
const IDLE_ORIGIN_Y = 650;

const DOG_RES_SCALE = 5;

const HEAD_BIG_SIZE = 480;
function getHeadOrigin(head: CanvasImageSource): [number, number] {
	// sprDog_head_0 is bigger
	if (head.width === HEAD_BIG_SIZE && head.height === HEAD_BIG_SIZE) {
		return [225, 370];
	}

	// 150x150
	return [77 * 5, 84 * 5];
}

export type ChosenHat = {
	name: string,
	color: string,
	customImage: ?string,
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
		animationCacheKey: string,
		clothesAnimationTranslateX: number,
		clothesAnimationTranslateY: number,
		expressionCacheKey: string,
		headAnimationTranslateX: number,
		headAnimationTranslateY: number,
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
	const clothesCollar: ?number = gotAnyHatWithLayer2
		? null
		: options.clothesInfo.collar;

	const hasCustomClothes =
		images.clothes.width <= CUSTOM_CLOTHES_WIDTH &&
		images.clothes.height <= CUSTOM_CLOTHES_HEIGHT;

	// Animation translated offsets
	const hatTranslatedX =
		IDLE_ORIGIN_X +
		(-HAT_ORIGIN_X + options.headAnimationTranslateX * DOG_RES_SCALE);
	const hatTranslatedY =
		IDLE_ORIGIN_Y +
		(-HAT_ORIGIN_Y + options.headAnimationTranslateY * DOG_RES_SCALE);

	const headTranslatedX =
		IDLE_ORIGIN_X +
		(-getHeadOrigin(images.head)[0] +
			options.headAnimationTranslateX * DOG_RES_SCALE);
	const headTranslatedY =
		IDLE_ORIGIN_Y +
		(-getHeadOrigin(images.head)[1] +
			options.headAnimationTranslateY * DOG_RES_SCALE);

	const clothesTranslatedX =
		IDLE_ORIGIN_X +
		(-CLOTHES_ORIGIN_X + options.clothesAnimationTranslateX * DOG_RES_SCALE);
	const clothesTranslatedY =
		IDLE_ORIGIN_Y +
		(-CLOTHES_ORIGIN_Y + options.clothesAnimationTranslateY * DOG_RES_SCALE);

	// Start drawing!
	const ctx = getCanvasRenderingContext(canvas, true);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawImageAsColor(
		ctx,
		images.idle2,
		{
			fillColor: colors.skinColor,
			outlineColor: colors.skinOutlineColor,
			cacheKey: options.animationCacheKey + 'idle2',
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
		hasCustomClothes ? 255 + clothesTranslatedX : clothesTranslatedX,
		hasCustomClothes ? 424 + clothesTranslatedY : clothesTranslatedY,
		images.clothes.width,
		images.clothes.height
	);

	if (hatOrClothesLayer2 && clothesCollar === 2) {
		// Hiker
		drawImageAsColor(
			ctx,
			hatOrClothesLayer2,
			{fillColor: options.hats[0].color},
			clothesTranslatedX,
			clothesTranslatedY,
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
			cacheKey: options.animationCacheKey + 'idle1',
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
				clothesTranslatedX,
				clothesTranslatedY,
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
						hatTranslatedX,
						hatTranslatedY,
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
				hatTranslatedX,
				hatTranslatedY,
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
			cacheKey: options.expressionCacheKey + '_head',
		},
		headTranslatedX,
		headTranslatedY,
		images.head.width === HEAD_BIG_SIZE && images.head.height === HEAD_BIG_SIZE
			? HEAD_BIG_SIZE
			: SIZE,
		images.head.width === HEAD_BIG_SIZE && images.head.height === HEAD_BIG_SIZE
			? HEAD_BIG_SIZE
			: SIZE
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
			hatTranslatedX,
			hatTranslatedY,
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
				hatTranslatedX,
				hatTranslatedY,
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
			clothesTranslatedX,
			clothesTranslatedY,
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
			cacheKey: options.animationCacheKey + 'ear',
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
				hasCustomHat ? 161 + hatTranslatedX : hatTranslatedX,
				hasCustomHat ? 48 + hatTranslatedY : hatTranslatedY,
				hat.hat.width,
				hat.hat.height
			);
		}
	}
}

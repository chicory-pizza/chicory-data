// @flow strict

import path from 'path';

// $FlowFixMe[untyped-import]
import {loadImage} from 'canvas';

import drawDogToCanvas from '../drawDogToCanvas';
import {SIZE} from '../drawDogToCanvas';
import type {ChosenHat} from '../drawDogToCanvas';
import DOG_ANIMATIONS from '../types/DogAnimations';
import {DOG_CLOTHES_LIST} from '../types/DogClothesList';
import {DOG_HAIR_LIST} from '../types/DogHairList';
import {DOG_HAT_LIST} from '../types/DogHatList';

export default async function renderDogToCanvasHelper(options: {
	clothes: string,
	clothesColor: string,
	customClothesImage?: CanvasImageSource,
	hair: string,
	hats: $ReadOnlyArray<ChosenHat>,
	skinColor: string,
	skinOutlineColor?: string,
}): Promise<Buffer> {
	// Clothes
	const clothesInfo = DOG_CLOTHES_LIST.find((clothes) => {
		return options.clothes === clothes.internalName;
	});

	if (!clothesInfo) {
		throw new Error('Invalid clothes ' + options.clothes);
	}

	// Hat
	const hats = await Promise.all(
		options.hats.map(async (chosenHat) => {
			// Hat
			const hatInfo = DOG_HAT_LIST.find((hat) => {
				return chosenHat.name === hat.internalName;
			});

			if (!hatInfo) {
				throw new Error('Invalid hat ' + chosenHat.name);
			}

			return {
				color: chosenHat.color,
				hatInfo: hatInfo,

				// Images
				hatShowHairExtra:
					hatInfo.showHairExtraImagePath != null
						? await loadImage(
								path.resolve(
									__dirname,
									'../images/hat_padding/',
									hatInfo.showHairExtraImagePath
								)
						  )
						: null,
				hat:
					hatInfo.internalName === 'Custom Hat' && chosenHat.customImage != null
						? chosenHat.customImage
						: hatInfo.imageWithPaddingPath != null
						? await loadImage(
								path.resolve(
									__dirname,
									'../images/hat_padding/',
									hatInfo.imageWithPaddingPath
								)
						  )
						: null,
				hatLayer2:
					hatInfo.layer2ImagePath != null
						? await loadImage(
								path.resolve(
									__dirname,
									'../images/clothes_padding/',
									hatInfo.layer2ImagePath
								)
						  )
						: null,
			};
		})
	);

	// Hair
	const hairInfo = DOG_HAIR_LIST.find((hair) => {
		return options.hair === hair.internalName;
	});

	if (!hairInfo) {
		throw new Error('Invalid hair ' + options.hair);
	}

	// Animation
	const animation = 'idle'; // only this for now
	const animationInfo = DOG_ANIMATIONS.get(animation);
	if (animationInfo == null) {
		throw new Error('Invalid animation ' + animation);
	}

	const idle2 = path.resolve(
		__dirname,
		'../images/dog_animations/' + animation + '/' + animationInfo.idle2[0]
	);
	const idle1 = path.resolve(
		__dirname,
		'../images/dog_animations/' + animation + '/' + animationInfo.idle1[0]
	);
	const ear = path.resolve(
		__dirname,
		'../images/dog_animations/' + animation + '/' + animationInfo.ear[0]
	);

	// Start drawing!
	const canvas = document.createElement('canvas');
	canvas.width = SIZE;
	canvas.height = SIZE;

	drawDogToCanvas(
		canvas,
		{
			idle2: await loadImage(idle2),
			clothes:
				clothesInfo.internalName === 'Custom Tee' &&
				options.customClothesImage != null
					? options.customClothesImage
					: await loadImage(
							path.resolve(
								__dirname,
								'../images/clothes_padding/',
								clothesInfo.imageWithPaddingPath
							)
					  ),
			idle1: await loadImage(idle1),
			clothesLayer2:
				clothesInfo.layer2ImagePath != null
					? await loadImage(
							path.resolve(
								__dirname,
								'../images/clothes_padding/',
								clothesInfo.layer2ImagePath
							)
					  )
					: null,

			head: await loadImage(
				path.resolve(__dirname, '../images/sprDog_head_0.png')
			),
			hair: await loadImage(
				path.resolve(
					__dirname,
					'../images/hair_padding/',
					hairInfo.imageWithPaddingPath
				)
			),

			ear: await loadImage(ear),
		},
		{
			clothesColor: options.clothesColor,
			skinColor: options.skinColor,
			skinOutlineColor: options.skinOutlineColor,
		},
		{
			animationCacheKey: animation + '_0_',
			clothesAnimationTranslateX: animationInfo.bodyAnim[0].x,
			clothesAnimationTranslateY: animationInfo.bodyAnim[0].y,
			headAnimationTranslateX: animationInfo.headAnim[0].x,
			headAnimationTranslateY: animationInfo.headAnim[0].y,
			clothesInfo,
			hairInfo,
			hats,
		}
	);

	const img = canvas.toDataURL();
	const data = img.replace(/^data:image\/\w+;base64,/, '');
	const buffer = Buffer.from(data, 'base64');

	return buffer;
}

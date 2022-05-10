// @flow strict

import path from 'path';

// $FlowFixMe[untyped-import]
import {loadImage} from 'canvas';

import drawDogToCanvas from '../drawDogToCanvas';
import {SIZE} from '../drawDogToCanvas';
import {DOG_CLOTHES_LIST} from '../types/DogClothesList';
import {DOG_HAIR_LIST} from '../types/DogHairList';
import {DOG_HAT_LIST} from '../types/DogHatList';

export default async function renderDogToCanvasHelper(options: {
	clothes: string,
	clothesColor: string,
	hair: string,
	hat: string,
	hatColor: string,
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
	const hatInfo = DOG_HAT_LIST.find((hat) => {
		return options.hat === hat.internalName;
	});

	if (!hatInfo) {
		throw new Error('Invalid hat ' + options.hat);
	}

	// Hair
	const hairInfo = DOG_HAIR_LIST.find((hair) => {
		return options.hair === hair.internalName;
	});

	if (!hairInfo) {
		throw new Error('Invalid hair ' + options.hair);
	}

	const canvas = document.createElement('canvas');
	canvas.width = SIZE;
	canvas.height = SIZE;

	drawDogToCanvas(
		canvas,
		{
			idle2: await loadImage(
				path.resolve(__dirname, '../images/sprDog_idle_B_0.png')
			),
			clothes: await loadImage(
				path.resolve(
					__dirname,
					'../images/clothes_padding/',
					clothesInfo.imageWithPaddingPath
				)
			),
			idle1: await loadImage(
				path.resolve(__dirname, '../images/sprDog_idle_A_0.png')
			),
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
			hat:
				hatInfo.imageWithPaddingPath != null
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
			ear: await loadImage(
				path.resolve(__dirname, '../images/sprDog_idle_ear_0.png')
			),
		},
		{
			clothesColor: options.clothesColor,
			hatColor: options.hatColor,
			skinColor: options.skinColor,
			skinOutlineColor: options.skinOutlineColor,
		},
		{
			clothesInfo,
			hairInfo,
			hatInfo,
		}
	);

	const img = canvas.toDataURL();
	const data = img.replace(/^data:image\/\w+;base64,/, '');
	const buffer = Buffer.from(data, 'base64');

	return buffer;
}

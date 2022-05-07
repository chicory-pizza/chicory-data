// @flow strict

import {useEffect, useRef, useState} from 'react';

import drawImageAsColor from '../util/drawImageAsColor';
import getCanvasRenderingContext from '../util/getCanvasRenderingContext';

import styles from './DogPreview.module.css';
import headImg from './images/sprDog_head_0.png';
import idle1Img from './images/sprDog_idle_A_0.png';
import idle2Img from './images/sprDog_idle_B_0.png';
import earImg from './images/sprDog_idle_ear_0.png';
import {DOG_CLOTHES_LIST} from './types/DogClothesList';
import {DOG_HAIR_LIST} from './types/DogHairList';
import {DOG_HAT_LIST} from './types/DogHatList';

const SIZE = 750;

function useLoadImage(src: ?string) {
	const [ready, setReady] = useState(false);
	const img = useRef<?HTMLImageElement>(null);

	useEffect(() => {
		if (img.current == null) {
			img.current = document.createElement('img');
		}

		if (src == null) {
			return;
		}

		const imgRef = img.current;

		// todo need onerror state
		if (src !== imgRef.src) {
			setReady(false);
		}

		imgRef.onload = () => {
			setReady(true);
		};
		imgRef.src = src;
	}, [src]);

	if (src == null || !ready) {
		return null;
	}

	return img.current;
}

type Props = $ReadOnly<{
	clothes: string,
	clothesColor: string,
	hat: string,
	hatColor: string,
	hair: string,
	skinColor: string,
}>;

export default function DogPreview(props: Props): React$Node {
	const mainCanvasRef = useRef<?HTMLCanvasElement>(null);

	// Clothes
	const clothesInfo = DOG_CLOTHES_LIST.find((clothes) => {
		return props.clothes === clothes.internalName;
	});

	if (!clothesInfo) {
		throw new Error('Invalid clothes ' + props.clothes);
	}

	// Hat
	const hatInfo = DOG_HAT_LIST.find((hat) => {
		return props.hat === hat.internalName;
	});

	if (!hatInfo) {
		throw new Error('Invalid hat ' + props.hat);
	}

	// Hair
	const hairInfo = DOG_HAIR_LIST.find((hair) => {
		return props.hair === hair.internalName;
	});

	if (!hairInfo) {
		throw new Error('Invalid hair ' + props.hair);
	}

	const idle2 = useLoadImage(idle2Img);
	const clothes = useLoadImage(clothesInfo.imageWithPaddingPath);
	const idle1 = useLoadImage(idle1Img);
	const clothesLayer2 = useLoadImage(clothesInfo.layer2ImagePath);
	const head = useLoadImage(headImg);
	const hair = useLoadImage(hairInfo.imageWithPaddingPath);
	const hat = useLoadImage(hatInfo.imageWithPaddingPath);
	const hatLayer2 = useLoadImage(hatInfo.layer2ImagePath);
	const ear = useLoadImage(earImg);

	useEffect(() => {
		const canvas = mainCanvasRef.current;
		if (!canvas || !idle2 || !clothes || !idle1 || !head || !hair || !ear) {
			return;
		}

		let layer2 = hatLayer2 || clothesLayer2;
		let collar = hatLayer2 ? null : clothesInfo.collar;

		const ctx = getCanvasRenderingContext(canvas, true);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		drawImageAsColor(ctx, idle2, props.skinColor, 0, 0, SIZE, SIZE);
		drawImageAsColor(ctx, clothes, props.clothesColor, 0, 0, SIZE, SIZE);
		if (layer2 && collar === 2) {
			// Hiker
			drawImageAsColor(ctx, layer2, props.hatColor, 0, 0, SIZE, SIZE);
			layer2 = null;
		}
		drawImageAsColor(ctx, idle1, props.skinColor, 0, 0, SIZE, SIZE);
		if (layer2 && collar == null) {
			// Gorgeous
			drawImageAsColor(
				ctx,
				layer2,
				props.hatColor,
				// this is from game code and this condition won't pass anyway
				// collar === 1 ? props.clothesColor : props.hatColor,
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
		drawImageAsColor(ctx, head, props.skinColor, 161, 48, 480, 480);
		if (
			!hat ||
			hatInfo.showHair === 1 ||
			(hatInfo.showHair != null && hatInfo.showHair > 2)
		) {
			drawImageAsColor(ctx, hair, props.skinColor, 0, 0, SIZE, SIZE);
		}
		if (hat && hatInfo.showHair !== 2) {
			drawImageAsColor(ctx, hat, props.hatColor, 0, 0, SIZE, SIZE);
		}
		if (layer2 && collar != null) {
			// Collar: 1 - Royal
			// Collar: 2 - Hiker
			drawImageAsColor(
				ctx,
				layer2,
				collar === 1 ? props.clothesColor : props.hatColor,
				0,
				0,
				SIZE,
				SIZE
			);
		}
		drawImageAsColor(ctx, ear, props.skinColor, 0, 0, SIZE, SIZE);
		if (hat && hatInfo.showHair === 2) {
			drawImageAsColor(ctx, hat, props.hatColor, 0, 0, SIZE, SIZE);
		}
	}, [
		clothes,
		clothesInfo.collar,
		clothesLayer2,
		ear,
		hair,
		hatLayer2,
		hat,
		hatInfo.showHair,
		head,
		idle1,
		idle2,
		props.skinColor,
		props.clothesColor,
		props.hatColor,
	]);

	return (
		<canvas
			className={styles.canvas}
			ref={mainCanvasRef}
			width={SIZE}
			height={SIZE}
			style={{
				width: SIZE,
				height: SIZE,
			}}
		/>
	);
}

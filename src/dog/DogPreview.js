// @flow strict

import {useEffect, useRef, useState} from 'react';

import getCanvasRenderingContext from '../util/getCanvasRenderingContext';

import styles from './DogPreview.module.css';
import headImg from './images/sprDog_head_0.png';
import idle1Img from './images/sprDog_idle_A_0.png';
import idle2Img from './images/sprDog_idle_B_0.png';
import earImg from './images/sprDog_idle_ear_0.png';
import {DOG_CLOTHES_LIST} from './types/DogClothesList';
import {DOG_HAIR_LIST} from './types/DogHairList';
import {DOG_HAT_LIST} from './types/DogHatList';

const WIDTH = 750;
const HEIGHT = 750;

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
	const canvasRef = useRef<?HTMLCanvasElement>(null);

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
	const hairLayer2 = useLoadImage(hatInfo.layer2ImagePath);
	const ear = useLoadImage(earImg);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || !idle2 || !clothes || !idle1 || !head || !hair || !ear) {
			return;
		}

		const ctx = getCanvasRenderingContext(canvas, true);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.drawImage(idle2, 0, 0, 750, 750);
		ctx.drawImage(clothes, 0, 0, 750, 750);
		ctx.drawImage(idle1, 0, 0, 750, 750);
		if (hairLayer2) {
			ctx.drawImage(hairLayer2, 0, 0, 750, 750);
		} else if (clothesLayer2) {
			ctx.drawImage(clothesLayer2, 0, 0, 750, 750);
		}
		// if (hatInfo.showHair != null && hatInfo.showHair > 2) {
		// 	ctx.drawImage(hair, 0, 0, 750, 750);
		// }
		ctx.drawImage(head, 161, 48, 480, 480);
		if (
			!hat ||
			(hatInfo.showHair != null &&
				(hatInfo.showHair === 1 || hatInfo.showHair > 2))
		) {
			ctx.drawImage(hair, 0, 0, 750, 750);
		}
		if (hat && hatInfo.showHair !== 2) {
			ctx.drawImage(hat, 0, 0, 750, 750);
		}
		ctx.drawImage(ear, 0, 0, 750, 750);
		if (hat && hatInfo.showHair === 2) {
			ctx.drawImage(hat, 0, 0, 750, 750);
		}
	}, [
		clothes,
		clothesLayer2,
		ear,
		hair,
		hairLayer2,
		hat,
		hatInfo.showHair,
		head,
		idle1,
		idle2,
	]);

	return (
		<canvas
			className={styles.canvas}
			ref={canvasRef}
			width={WIDTH}
			height={HEIGHT}
			style={{
				width: WIDTH,
				height: HEIGHT,
			}}
		/>
	);
}

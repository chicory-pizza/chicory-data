// @flow strict

import {useEffect, useRef, useState} from 'react';

import drawImageAsColor from '../util/drawImageAsColor';
import getCanvasRenderingContext from '../util/getCanvasRenderingContext';

import styles from './DogPreview.module.css';
import headImgSrc from './images/sprDog_head_0.png';
import idle1ImgSrc from './images/sprDog_idle_A_0.png';
import idle2ImgSrc from './images/sprDog_idle_B_0.png';
import earImgSrc from './images/sprDog_idle_ear_0.png';
import {DOG_CLOTHES_LIST} from './types/DogClothesList';
import {DOG_HAIR_LIST} from './types/DogHairList';
import {DOG_HAT_LIST} from './types/DogHatList';

const SIZE = 750;

function useLoadImage(src: ?string) {
	const [prevSrc, setPrevSrc] = useState<?string>(null);
	const img = useRef<?HTMLImageElement>(null);

	useEffect(() => {
		if (src == null) {
			return;
		}

		img.current = document.createElement('img');
		const imgRef = img.current;

		// todo need onerror state
		function onLoad() {
			setPrevSrc(src);
		}

		imgRef.addEventListener('load', onLoad);
		imgRef.src = src;

		return () => {
			imgRef.removeEventListener('load', onLoad);
			img.current = null;
		};
	}, [src]);

	if (src == null || prevSrc !== src) {
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
	height: number,
	skinColor: string,
	skinOutlineColor?: string,
	width: number,
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

	const idle2 = useLoadImage(idle2ImgSrc);
	const clothes = useLoadImage(clothesInfo.imageWithPaddingPath);
	const idle1 = useLoadImage(idle1ImgSrc);
	const clothesLayer2 = useLoadImage(clothesInfo.layer2ImagePath);
	const head = useLoadImage(headImgSrc);
	const hair = useLoadImage(hairInfo.imageWithPaddingPath);
	const hat = useLoadImage(hatInfo.imageWithPaddingPath);
	const hatLayer2 = useLoadImage(hatInfo.layer2ImagePath);
	const ear = useLoadImage(earImgSrc);

	useEffect(() => {
		const canvas = mainCanvasRef.current;
		if (!canvas || !idle2 || !clothes || !idle1 || !head || !hair || !ear) {
			return;
		}

		let layer2 = hatLayer2 || clothesLayer2;
		let collar = hatLayer2 ? null : clothesInfo.collar;

		const ctx = getCanvasRenderingContext(canvas, true);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		drawImageAsColor(
			ctx,
			idle2,
			{
				fillColor: props.skinColor,
				outlineColor: props.skinOutlineColor,
				cacheKey: idle2ImgSrc,
			},
			0,
			0,
			SIZE,
			SIZE
		);
		drawImageAsColor(
			ctx,
			clothes,
			{fillColor: props.clothesColor},
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
				{fillColor: props.hatColor},
				0,
				0,
				SIZE,
				SIZE
			);
			layer2 = null;
		}
		drawImageAsColor(
			ctx,
			idle1,
			{
				fillColor: props.skinColor,
				outlineColor: props.skinOutlineColor,
				cacheKey: idle1ImgSrc,
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
				{fillColor: props.hatColor},
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
		drawImageAsColor(
			ctx,
			head,
			{
				fillColor: props.skinColor,
				outlineColor: props.skinOutlineColor,
				cacheKey: headImgSrc,
			},
			161,
			48,
			480,
			480
		);
		if (
			!hat ||
			hatInfo.showHair === 1 ||
			(hatInfo.showHair != null && hatInfo.showHair > 2)
		) {
			drawImageAsColor(
				ctx,
				hair,
				{
					fillColor: props.skinColor,
					outlineColor: props.skinOutlineColor,
					cacheKey: 'hair_' + props.hair,
				},
				0,
				0,
				SIZE,
				SIZE
			);
		}
		if (hat && hatInfo.showHair !== 2) {
			drawImageAsColor(ctx, hat, {fillColor: props.hatColor}, 0, 0, SIZE, SIZE);
		}
		if (layer2 && collar != null) {
			// Collar: 1 - Royal
			// Collar: 2 - Hiker
			drawImageAsColor(
				ctx,
				layer2,
				{fillColor: collar === 1 ? props.clothesColor : props.hatColor},
				0,
				0,
				SIZE,
				SIZE
			);
		}
		drawImageAsColor(
			ctx,
			ear,
			{
				fillColor: props.skinColor,
				outlineColor: props.skinOutlineColor,
				cacheKey: earImgSrc,
			},
			0,
			0,
			SIZE,
			SIZE
		);
		if (hat && hatInfo.showHair === 2) {
			drawImageAsColor(ctx, hat, {fillColor: props.hatColor}, 0, 0, SIZE, SIZE);
		}
	}, [
		clothes,
		clothesInfo.collar,
		clothesLayer2,
		ear,
		hair,
		hat,
		hatInfo.showHair,
		hatLayer2,
		head,
		idle1,
		idle2,
		props.clothesColor,
		props.hair,
		props.hatColor,
		props.skinColor,
		props.skinOutlineColor,
	]);

	return (
		<canvas
			className={styles.canvas}
			ref={mainCanvasRef}
			width={SIZE}
			height={SIZE}
			style={{
				width: props.width,
				height: props.height,
			}}
		/>
	);
}

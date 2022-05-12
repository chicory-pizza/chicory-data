// @flow strict

import {useEffect, useMemo, useRef, useState} from 'react';

import styles from './DogPreview.module.css';
import drawDogToCanvas from './drawDogToCanvas';
import {SIZE} from './drawDogToCanvas';
import headImgSrc from './images/sprDog_head_0.png';
import idle1ImgSrc from './images/sprDog_idle_A_0.png';
import idle2ImgSrc from './images/sprDog_idle_B_0.png';
import earImgSrc from './images/sprDog_idle_ear_0.png';
import {DOG_CLOTHES_LIST} from './types/DogClothesList';
import {DOG_HAIR_LIST} from './types/DogHairList';
import {DOG_HAT_LIST} from './types/DogHatList';

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
	const clothesInfo = useMemo(() => {
		return DOG_CLOTHES_LIST.find((clothes) => {
			return props.clothes === clothes.internalName;
		});
	}, [props.clothes]);

	if (!clothesInfo) {
		throw new Error('Invalid clothes ' + props.clothes);
	}

	// Hat
	const hatInfo = useMemo(() => {
		return DOG_HAT_LIST.find((hat) => {
			return props.hat === hat.internalName;
		});
	}, [props.hat]);

	if (!hatInfo) {
		throw new Error('Invalid hat ' + props.hat);
	}

	// Hair
	const hairInfo = useMemo(() => {
		return DOG_HAIR_LIST.find((hair) => {
			return props.hair === hair.internalName;
		});
	}, [props.hair]);

	if (!hairInfo) {
		throw new Error('Invalid hair ' + props.hair);
	}

	const idle2 = useLoadImage(idle2ImgSrc);
	const clothes = useLoadImage(clothesInfo.imageWithPaddingPath);
	const idle1 = useLoadImage(idle1ImgSrc);
	const clothesLayer2 = useLoadImage(clothesInfo.layer2ImagePath);
	const hatShowHairExtra = useLoadImage(hatInfo.showHairExtraImagePath);
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

		drawDogToCanvas(
			canvas,
			{
				idle2,
				clothes,
				idle1,
				clothesLayer2,
				hatShowHairExtra,
				head,
				hair,
				hat,
				hatLayer2,
				ear,
			},
			{
				clothesColor: props.clothesColor,
				hatColor: props.hatColor,
				skinColor: props.skinColor,
				skinOutlineColor: props.skinOutlineColor,
			},
			{
				clothesInfo,
				hairInfo,
				hatInfo,
			}
		);
	}, [
		clothes,
		clothesInfo,
		clothesLayer2,
		ear,
		hair,
		hairInfo,
		hat,
		hatInfo,
		hatLayer2,
		hatShowHairExtra,
		head,
		idle1,
		idle2,
		props.clothesColor,
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

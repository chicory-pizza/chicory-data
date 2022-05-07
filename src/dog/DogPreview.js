// @flow strict

import {useEffect, useRef, useState} from 'react';

import getCanvasRenderingContext from '../util/getCanvasRenderingContext';

import styles from './DogPreview.module.css';
import bandanaClothesImg from './images/clothes_padding/sprDog_body_0.png';
import hairSimpleImg from './images/hair_padding/sprDog_hat_5.png';
import headImg from './images/sprDog_head_0.png';
import idle1Img from './images/sprDog_idle_A_0.png';
import idle2Img from './images/sprDog_idle_B_0.png';
import earImg from './images/sprDog_idle_ear_0.png';
import {DOG_CLOTHES_LIST} from './types/DogClothesList';

const WIDTH = 750;
const HEIGHT = 750;

function useLoadImage(src: string) {
	const [ready, setReady] = useState(false);

	// todo need onerror state
	const image = useRef<HTMLImageElement>(document.createElement('img'));
	image.current.onload = () => {
		setReady(true);
	};
	image.current.src = src;

	return {imageRef: image, ready};
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

	const idle2 = useLoadImage(idle2Img);
	const clothes = useLoadImage(bandanaClothesImg);
	const idle1 = useLoadImage(idle1Img);
	const head = useLoadImage(headImg);
	const ear = useLoadImage(earImg);
	const hair = useLoadImage(hairSimpleImg);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (
			!canvas ||
			!idle2.ready ||
			!clothes.ready ||
			!idle1.ready ||
			!head.ready ||
			!ear.ready ||
			!hair.ready
		) {
			return;
		}

		const ctx = getCanvasRenderingContext(canvas, true);

		ctx.drawImage(idle2.imageRef.current, 0, 0, 750, 750);
		ctx.drawImage(clothes.imageRef.current, 0, 0, 750, 750);
		ctx.drawImage(idle1.imageRef.current, 0, 0, 750, 750);
		ctx.drawImage(head.imageRef.current, 161, 48, 480, 480);
		ctx.drawImage(ear.imageRef.current, 0, 0, 750, 750);
		ctx.drawImage(hair.imageRef.current, 0, 0, 750, 750);
	}, [
		clothes.imageRef,
		clothes.ready,
		ear.imageRef,
		ear.ready,
		hair.imageRef,
		hair.ready,
		head.imageRef,
		head.ready,
		idle1.imageRef,
		idle1.ready,
		idle2.imageRef,
		idle2.ready,
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

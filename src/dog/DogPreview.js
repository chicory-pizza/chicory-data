// @flow strict

import {useEffect, useMemo, useRef, useState} from 'react';

import Spinner from '../common/Spinner';

import styles from './DogPreview.module.css';
import drawDogToCanvas from './drawDogToCanvas';
import {SIZE} from './drawDogToCanvas';
import type {ChosenHat} from './drawDogToCanvas';
import headImgSrc from './images/sprDog_head_0.png';
import idle1ImgSrc from './images/sprDog_idle_A_0.png';
import idle2ImgSrc from './images/sprDog_idle_B_0.png';
import earImgSrc from './images/sprDog_idle_ear_0.png';
import {DOG_CLOTHES_LIST} from './types/DogClothesList';
import {DOG_HAIR_LIST} from './types/DogHairList';
import {DOG_HAT_LIST} from './types/DogHatList';

function useLoadImage(currentSrc: ?string) {
	const [loadedSrc, setLoadedSrc] = useState<?string>(null);
	const img = useRef<?HTMLImageElement>(null);

	useEffect(() => {
		if (currentSrc == null) {
			return;
		}

		const imgRef = document.createElement('img');
		img.current = imgRef;

		// todo need onerror state
		function onLoad() {
			setLoadedSrc(currentSrc);
		}

		imgRef.addEventListener('load', onLoad);
		imgRef.src = currentSrc;

		return () => {
			imgRef.removeEventListener('load', onLoad);
			img.current = null;
		};
	}, [currentSrc]);

	if (currentSrc == null || loadedSrc !== currentSrc) {
		return null;
	}

	return img.current;
}

// This destroys and reloads pairs of images and is less peformant than just one
function useLoadMultipleImages(currentSrcs: {
	[key: string]: ?string,
}): ?{[key: string]: ?HTMLImageElement} {
	const [loadedSrcs, setLoadedSrcs] = useState<{[key: string]: ?string}>({});
	const imgs = useRef<{[key: string]: ?HTMLImageElement}>({});
	const onLoads = useRef<{[key: string]: () => mixed}>({});

	useEffect(() => {
		const newLoadedSrcs = {};
		Object.keys(currentSrcs).forEach((key) => {
			const src = currentSrcs[key];
			if (src == null) {
				newLoadedSrcs[key] = null;
				return;
			}

			const imgRef = document.createElement('img');
			imgs.current[key] = imgRef;

			// todo need onerror state
			onLoads.current[key] = () => {
				setLoadedSrcs((loadedSrcs) => {
					return {
						...loadedSrcs,
						[key]: currentSrcs[key],
					};
				});
			};

			imgRef.addEventListener('load', onLoads.current[key]);
			imgRef.src = src;
		});
		setLoadedSrcs(newLoadedSrcs);

		return () => {
			// Ideally, we should try to recycle/cache but it gets really complicated...
			setLoadedSrcs({});

			Object.keys(currentSrcs).forEach((key) => {
				if (imgs.current[key]) {
					// eslint-disable-next-line react-hooks/exhaustive-deps
					imgs.current[key].removeEventListener('load', onLoads.current[key]);

					// eslint-disable-next-line react-hooks/exhaustive-deps
					delete onLoads.current[key];

					// eslint-disable-next-line react-hooks/exhaustive-deps
					delete imgs.current[key];
				}
			});
		};
	}, [currentSrcs]);

	const currentSrcKeys = Object.keys(currentSrcs);
	const loadedSrcKeys = Object.keys(loadedSrcs);
	if (currentSrcKeys.length !== loadedSrcKeys.length) {
		return null;
	}

	if (!currentSrcKeys.every((key) => currentSrcs[key] === loadedSrcs[key])) {
		return null;
	}

	return imgs.current;
}

type Props = $ReadOnly<{
	clothes: string,
	clothesColor: string,
	customClothesImage: ?Image,
	hats: $ReadOnlyArray<ChosenHat>,
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
	const hats = useMemo(() => {
		return props.hats.map((chosenHat) => {
			const hatInfo = DOG_HAT_LIST.find((hat) => {
				return chosenHat.name === hat.internalName;
			});

			if (hatInfo == null) {
				throw new Error('Invalid hat ' + chosenHat.name);
			}

			return {
				color: chosenHat.color,
				hatInfo,

				// Images
				hatShowHairExtra: hatInfo.showHairExtraImagePath,
				hat:
					hatInfo.internalName === 'Custom Hat' && chosenHat.customImage != null
						? chosenHat.customImage
						: hatInfo.imageWithPaddingPath,
				hatLayer2: hatInfo.layer2ImagePath,
			};
		});
	}, [props.hats]);

	const hatsLayers = useMemo(() => {
		const tempHats: {[key: string]: ?string} = {};
		for (let i = 0; i < hats.length; i += 1) {
			tempHats['hatShowHairExtra_' + i] = hats[i].hatShowHairExtra ?? null;
			tempHats['hat_' + i] =
				typeof hats[i].hat === 'string' ? hats[i].hat : null;
			tempHats['hatLayer2_' + i] = hats[i].hatLayer2 ?? null;
		}
		return tempHats;
	}, [hats]);

	const hatsImages = useLoadMultipleImages(hatsLayers);

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
	const head = useLoadImage(headImgSrc);
	const hair = useLoadImage(hairInfo.imageWithPaddingPath);
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
				clothes:
					clothesInfo.internalName === 'Custom Tee' &&
					props.customClothesImage != null
						? props.customClothesImage
						: clothes,
				idle1,
				clothesLayer2,
				head,
				hair,
				ear,
			},
			{
				clothesColor: props.clothesColor,
				skinColor: props.skinColor,
				skinOutlineColor: props.skinOutlineColor,
			},
			{
				clothesInfo,
				hairInfo,
				hats: hats.map((hat, index) => {
					return {
						color: hat.color,
						hatInfo: hat.hatInfo,

						// Images
						hatShowHairExtra: hatsImages
							? hatsImages['hatShowHairExtra_' + index]
							: null,
						hat:
							typeof hat.hat === 'string' && hatsImages
								? hatsImages['hat_' + index]
								: hat.hat instanceof Image
								? hat.hat
								: null,
						hatLayer2: hatsImages ? hatsImages['hatLayer2_' + index] : null,
					};
				}),
			}
		);
	}, [
		clothes,
		clothesInfo,
		clothesLayer2,
		ear,
		hair,
		hairInfo,
		hats,
		hatsImages,
		head,
		idle1,
		idle2,
		props.clothesColor,
		props.customClothesImage,
		props.skinColor,
		props.skinOutlineColor,
	]);

	const loading =
		!mainCanvasRef.current ||
		!idle2 ||
		!clothes ||
		!idle1 ||
		!head ||
		!hair ||
		!ear;

	return (
		<div className={styles.root}>
			<canvas
				className={styles.canvas + ' ' + (loading ? styles.canvasLoading : '')}
				ref={mainCanvasRef}
				width={SIZE}
				height={SIZE}
				style={{
					width: props.width,
					height: props.height,
				}}
			/>

			{loading ? (
				<div className={styles.loading} style={{width: props.width}}>
					<Spinner size={32} />
				</div>
			) : null}
		</div>
	);
}

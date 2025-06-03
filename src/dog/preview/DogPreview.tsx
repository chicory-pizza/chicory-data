import {useEffect, useMemo, useRef} from 'react';

import Spinner from '../../common/Spinner';
import drawDogToCanvas, {SIZE} from '../drawDogToCanvas';
import type {ChosenHat} from '../drawDogToCanvas';
import DOG_ANIMATIONS from '../types/DogAnimations';
import {DOG_CLOTHES_LIST} from '../types/DogClothesList';
import {DOG_EXPRESSION_LIST} from '../types/DogExpressionList';
import {DOG_HAIR_LIST} from '../types/DogHairList';
import {DOG_HAT_LIST} from '../types/DogHatList';
import useLoadImage from '../useLoadImage';
import useLoadMultipleImages from '../useLoadMultipleImages';

import styles from './DogPreview.module.css';

type Props = Readonly<{
	animation: 'idle'; // only this for now
	animationIndex: number;
	backgroundFillColor?: string;
	canvasClassName?: string;
	clothes: string;
	clothesColor: string;
	customClothesImage?: string | null;
	earColor: string;
	expression: string;
	hats: ReadonlyArray<ChosenHat>;
	hair: string;
	headSkinImage?: string | null;
	onCanvasFrameDrawn?: (
		canvasRef: HTMLCanvasElement,
		animationIndex: number
	) => void;
	showBody: boolean;
	skinColor: string;
	skinOutlineColor?: string;
}>;

export default function DogPreview(props: Props) {
	const mainCanvasRef = useRef<HTMLCanvasElement>(null);

	const {animationIndex, onCanvasFrameDrawn} = props;

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
		const tempHats: Record<string, string | null> = {};
		for (let i = 0; i < hats.length; i += 1) {
			tempHats['hatShowHairExtra_' + i] = hats[i].hatShowHairExtra ?? null;
			tempHats['hat_' + i] = hats[i].hat ?? null;
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

	// Expression
	const expressionInfo = useMemo(() => {
		return DOG_EXPRESSION_LIST.find((expression) => {
			return props.expression === expression.value;
		});
	}, [props.expression]);

	if (!expressionInfo) {
		throw new Error('Invalid expression ' + props.expression);
	}

	// Head skin
	const headSkin = useLoadImage(props.headSkinImage ?? null);

	// Animation
	const animationInfo = DOG_ANIMATIONS.get(props.animation);
	if (animationInfo == null) {
		throw new Error('Invalid animation ' + props.animation);
	}

	const animationImagesToLoad = useMemo(() => {
		const images: Record<string, string> = {};
		for (let i = 0; i < animationInfo.headAnim.length; i += 1) {
			images['idle1_' + i] = animationInfo.idle1[i];
			images['idle2_' + i] = animationInfo.idle2[i];
			images['ear_' + i] = animationInfo.ear[i];
		}
		return images;
	}, [animationInfo]);

	const animationImages = useLoadMultipleImages(animationImagesToLoad);

	const clothes = useLoadImage(
		clothesInfo.internalName === 'Custom Tee' &&
			props.customClothesImage != null
			? props.customClothesImage
			: clothesInfo.imageWithPaddingPath
	);
	const clothesLayer2 = useLoadImage(clothesInfo.layer2ImagePath ?? null);
	const head = useLoadImage(expressionInfo.imageHQ ?? expressionInfo.image);
	const hair = useLoadImage(hairInfo.imageWithPaddingPath);

	useEffect(() => {
		const canvas = mainCanvasRef.current;

		if (
			!canvas ||
			!animationImages ||
			!clothes ||
			!hatsImages ||
			!head ||
			!hair
		) {
			return;
		}

		const idle2 = animationImages['idle2_' + animationIndex];
		const idle1 = animationImages['idle1_' + animationIndex];
		const ear = animationImages['ear_' + animationIndex];
		if (!idle2 || !idle1 || !ear) {
			return;
		}

		drawDogToCanvas(
			canvas,
			{
				idle2,
				clothes,
				idle1,
				clothesLayer2,
				head,
				headSkin,
				hair,
				ear,
			},
			{
				clothesColor: props.clothesColor,
				earColor: props.earColor,
				skinColor: props.skinColor,
				skinOutlineColor: props.skinOutlineColor,
			},
			{
				animationCacheKey: props.animation + '_' + animationIndex + '_',
				backgroundFillColor: props.backgroundFillColor,
				clothesAnimationTranslateX: animationInfo.bodyAnim[animationIndex].x,
				clothesAnimationTranslateY: animationInfo.bodyAnim[animationIndex].y,
				expressionCacheKey: props.expression,
				headAnimationTranslateX: animationInfo.headAnim[animationIndex].x,
				headAnimationTranslateY: animationInfo.headAnim[animationIndex].y,
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
								: null,
						hatLayer2: hatsImages ? hatsImages['hatLayer2_' + index] : null,
					};
				}),
				showBody: props.showBody,
			}
		);

		if (onCanvasFrameDrawn && mainCanvasRef.current) {
			onCanvasFrameDrawn(mainCanvasRef.current, animationIndex);
		}
	}, [
		animationImages,
		animationIndex,
		animationInfo.bodyAnim,
		animationInfo.headAnim,
		clothes,
		clothesInfo,
		clothesLayer2,
		hair,
		hairInfo,
		hats,
		hatsImages,
		head,
		headSkin,
		onCanvasFrameDrawn,
		props.animation,
		props.backgroundFillColor,
		props.clothesColor,
		props.earColor,
		props.expression,
		props.showBody,
		props.skinColor,
		props.skinOutlineColor,
	]);

	const loading =
		!mainCanvasRef.current ||
		!animationImages ||
		!clothes ||
		!hatsImages ||
		!head ||
		!hair;

	return (
		<div className={styles.root}>
			<canvas
				className={
					styles.canvas +
					' ' +
					(loading ? styles.canvasLoading : '') +
					' ' +
					(props.canvasClassName ?? '')
				}
				height={SIZE}
				ref={mainCanvasRef}
				width={SIZE}
			/>

			{loading ? (
				<div className={styles.loading}>
					<Spinner size={32} />
				</div>
			) : null}
		</div>
	);
}

// @flow strict

import MessageBox from '../common/MessageBox';

import styles from './DogChicorobotNotices.module.css';
import type {ChosenHat} from './drawDogToCanvas';
import {DOG_EXPRESSION_LIST} from './types/DogExpressionList';

type Props = $ReadOnly<{
	clothes: string,
	expression: string,
	hasCustomEarColor: boolean,
	hasHeadSkinImage: boolean,
	hats: $ReadOnlyArray<ChosenHat>,
	invertColors: boolean,
	skinOutlineColor: string,
}>;

export default function DogChicorobotNotices(props: Props): React$MixedElement {
	// Expression
	const expressionInfo = DOG_EXPRESSION_LIST.find((expression) => {
		return props.expression === expression.value;
	});

	if (!expressionInfo) {
		throw new Error('Invalid expression ' + props.expression);
	}

	const hasNonBlackSkinOutlineColor = props.skinOutlineColor !== '#000000';
	const hasMultipleHatLayers = props.hats.length > 1;
	const hasCustomHat = props.hats.some((hat) => hat.name === 'Custom Hat');
	const hasCustomClothes = props.clothes === 'Custom Tee';
	const hasUnofficialExpression = expressionInfo.chicorobotName == null;

	const showChicorobotNotice =
		hasNonBlackSkinOutlineColor ||
		hasMultipleHatLayers ||
		hasCustomHat ||
		hasCustomClothes ||
		props.hasHeadSkinImage ||
		props.hasCustomEarColor ||
		hasUnofficialExpression ||
		props.invertColors;

	if (!showChicorobotNotice) {
		return <></>;
	}

	return (
		<div className={styles.root}>
			{hasNonBlackSkinOutlineColor ? (
				<MessageBox
					message="Non-black skin outline colors are not supported"
					type="INFO"
				/>
			) : null}

			{hasMultipleHatLayers ? (
				<MessageBox
					message="Multiple hat layers are not supported, only the 1st hat layer will be shown"
					type="INFO"
				/>
			) : null}

			{hasCustomHat ? (
				<MessageBox
					message={
						<>
							Custom hats need to manually uploaded using{' '}
							<code>custom_hat:</code>
						</>
					}
					type="INFO"
				/>
			) : null}

			{hasCustomClothes ? (
				<MessageBox
					message={
						<>
							Custom clothes need to manually uploaded using{' '}
							<code>custom_clothes:</code>
						</>
					}
					type="INFO"
				/>
			) : null}

			{props.hasHeadSkinImage ? (
				<MessageBox message="Head skin is not supported" type="INFO" />
			) : null}

			{props.hasCustomEarColor ? (
				<MessageBox
					message="Custom ear colors are not supported and will use the skin color"
					type="INFO"
				/>
			) : null}

			{hasUnofficialExpression ? (
				<MessageBox message="This expression is not supported" type="INFO" />
			) : null}

			{props.invertColors ? (
				<MessageBox message="Inverted colors are not supported" type="INFO" />
			) : null}
		</div>
	);
}

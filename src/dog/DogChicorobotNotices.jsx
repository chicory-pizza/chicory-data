// @flow strict

import MessageBox from '../common/MessageBox';

import styles from './DogChicorobotNotices.module.css';
import type {ChosenHat} from './drawDogToCanvas';

type Props = $ReadOnly<{
	clothes: string,
	hats: $ReadOnlyArray<ChosenHat>,
	invertColors: boolean,
	skinOutlineColor: string,
}>;

export default function DogChicorobotNotices(props: Props): React$MixedElement {
	const hasMultipleHatLayers = props.hats.length > 1;
	const hasNonBlackSkinOutlineColor = props.skinOutlineColor !== '#000000';
	const hasCustomClothes = props.clothes === 'Custom Tee';
	const hasCustomHat = props.hats.some((hat) => hat.name === 'Custom Hat');

	const showChicorobotNotice =
		hasMultipleHatLayers ||
		hasNonBlackSkinOutlineColor ||
		hasCustomClothes ||
		hasCustomHat ||
		props.invertColors;

	if (!showChicorobotNotice) {
		return <></>;
	}

	return (
		<div className={styles.root}>
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

			{hasMultipleHatLayers ? (
				<MessageBox
					message="Multiple hat layers are not supported, only the 1st hat layer will be shown"
					type="INFO"
				/>
			) : null}

			{hasNonBlackSkinOutlineColor ? (
				<MessageBox
					message="Non-black skin outline colors are not supported"
					type="INFO"
				/>
			) : null}

			{props.invertColors ? (
				<MessageBox message="Inverted colors are not supported" type="INFO" />
			) : null}
		</div>
	);
}

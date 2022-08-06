// @flow strict

import type {DrawdogPreset} from '../presets/DrawdogPresets';
import DogPreviewWithAutoplayAnimation from '../preview/DogPreviewWithAutoplayAnimation';

import styles from './DrawdogGalleryDog.module.css';

type Props = $ReadOnly<{
	forceExpression: ?string,
	onHoverEnter: (preset: DrawdogPreset) => mixed,
	onHoverLeave: (preset: DrawdogPreset) => mixed,
	onSelect: (preset: DrawdogPreset) => mixed,
	playAnimations: boolean,
	preset: DrawdogPreset,
}>;

export default function DrawdogGalleryDog(props: Props): React$Node {
	const preset = props.preset;

	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<a
			href="#"
			onBlur={() => props.onHoverLeave(preset)}
			onClick={(ev) => {
				ev.preventDefault();
				props.onSelect(preset);
			}}
			onFocus={() => props.onHoverEnter(preset)}
			onMouseEnter={() => props.onHoverEnter(preset)}
			onMouseLeave={() => props.onHoverLeave(preset)}
			className={styles.preset}
		>
			<div className={styles.dogPreview}>
				<DogPreviewWithAutoplayAnimation
					animation="idle"
					canvasClassName={styles.dogPreviewCanvas}
					clothes={preset.clothes}
					clothesColor={preset.clothesColor}
					customClothesImage={preset.customClothesImage ?? null}
					earColor={preset.earColor ?? preset.skinColor}
					expression={props.forceExpression ?? preset.expression ?? 'normal'}
					hats={preset.hats}
					hair={preset.hair}
					playAnimations={props.playAnimations}
					skinColor={preset.skinColor}
					skinOutlineColor={preset.skinOutlineColor}
				/>
			</div>

			<div className={styles.name}>{preset.name}</div>
		</a>
	);
}

// @flow strict

import type {DrawdogPreset} from '../presets/DrawdogPresets';
import DogPreviewWithAutoplayAnimation from '../preview/DogPreviewWithAutoplayAnimation';

import styles from './DrawdogGalleryDog.module.css';

type Props = $ReadOnly<{
	forceExpression: ?string,
	onHoverEnter: ?(preset: DrawdogPreset) => mixed,
	onHoverLeave: (preset: DrawdogPreset) => mixed,
	onSelect: (preset: DrawdogPreset) => mixed,
	playAnimations: boolean,
	preset: DrawdogPreset,
	showBody: boolean,
}>;

export default function DrawdogGalleryDog(props: Props): React$Node {
	const {onHoverEnter, preset, showBody} = props;

	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<a
			className={styles.preset}
			href="#"
			onBlur={() => props.onHoverLeave(preset)}
			onClick={(ev) => {
				ev.preventDefault();
				props.onSelect(preset);
			}}
			onFocus={onHoverEnter != null ? () => onHoverEnter(preset) : null}
			onMouseEnter={onHoverEnter != null ? () => onHoverEnter(preset) : null}
			onMouseLeave={() => props.onHoverLeave(preset)}
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
					hair={preset.hair}
					hats={preset.hats}
					headSkinImage={preset.headSkinImage ?? null}
					playAnimations={props.playAnimations}
					showBody={showBody}
					skinColor={preset.skinColor}
					skinOutlineColor={preset.skinOutlineColor}
				/>
			</div>

			<div className={styles.name}>{preset.name}</div>
		</a>
	);
}

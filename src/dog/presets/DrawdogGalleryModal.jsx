// @flow strict

import DrawdogGridModal from '../grid/DrawdogGridModal';

import type {DrawdogPreset} from './DrawdogPresets';
import {DRAWDOG_PRESETS} from './DrawdogPresets';

type Props = $ReadOnly<{
	isOpen: boolean,
	onModalRequestClose: () => void,
	onPresetSelect: (preset: DrawdogPreset) => mixed,
}>;

export default function DrawdogGalleryModal(props: Props): React$Node {
	return (
		<DrawdogGridModal
			{...props}
			canChangeExpressionOnMouseOver={true}
			canPlayAnimations={true}
			presets={DRAWDOG_PRESETS}
			showBody={true}
			title="Drawdog gallery"
		/>
	);
}

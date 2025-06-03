import DrawdogGridModal from '../grid/DrawdogGridModal';

import type {DrawdogPreset} from './DrawdogPresets';
import {DRAWDOG_PRESETS} from './DrawdogPresets';

type Props = Readonly<{
	isOpen: boolean;
	onModalRequestClose: () => void;
	onPresetSelect: (preset: DrawdogPreset) => void;
}>;

export default function DrawdogGalleryModal(props: Props) {
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

import DrawdogGridModal from '../grid/DrawdogGridModal';

import type {DrawdogPresetWithName} from './DrawdogPresets';
import {DRAWDOG_PRESETS} from './DrawdogPresets';

type Props = Readonly<{
	isOpen: boolean;
	onModalRequestClose: () => void;
	onPresetSelect: (preset: DrawdogPresetWithName) => void;
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

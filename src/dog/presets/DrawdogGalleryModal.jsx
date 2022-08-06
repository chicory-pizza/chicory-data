// @flow strict

import type {Props as DrawdogGridModalProps} from '../grid/DrawdogGridModal';
import DrawdogGridModal from '../grid/DrawdogGridModal';

import type {DrawdogPreset} from './DrawdogPresets';
import {DRAWDOG_PRESETS} from './DrawdogPresets';

type Props = $ReadOnly<{
	...$Diff<
		DrawdogGridModalProps,
		{
			presets: $ReadOnlyArray<DrawdogPreset>,
		}
	>,
}>;

export default function DrawdogGalleryModal(props: Props): React$Node {
	return <DrawdogGridModal {...props} presets={DRAWDOG_PRESETS} />;
}

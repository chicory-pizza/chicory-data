import type {DogState} from '../DogEditorContext';
import convertDogEditorStateToDogPreview from '../editor/convertDogEditorStateToDogPreview';

import type {DrawdogPreset} from './DrawdogPresets';

export default function convertDogEditorStateToPreset(
	dogState: DogState,
): DrawdogPreset {
	// fixme probably can be deleted
	return convertDogEditorStateToDogPreview(dogState);
}

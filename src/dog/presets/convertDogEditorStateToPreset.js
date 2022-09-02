// @flow strict

import type {DogState} from '../DogEditorContext';

import type {DrawdogPreset} from './DrawdogPresets';

export default function convertDogEditorStateToPreset(
	dogState: DogState
): DrawdogPreset {
	return {
		clothes: dogState.clothes,
		clothesColor: dogState.clothesColor,
		customClothesImage: dogState.customClothesImage ?? undefined,
		earColor: dogState.hasCustomEarColor
			? dogState.earColor
			: dogState.skinColor,
		expression: dogState.expression,
		hair: dogState.hair,
		hats: dogState.hats,
		name: '',
		skinColor: dogState.skinColor,
		skinOutlineColor: dogState.skinOutlineColor,
	};
}

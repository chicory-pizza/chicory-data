// @flow strict

import type {DogState} from '../DogEditorContext';
import type {ChosenHat} from '../drawDogToCanvas';

export default function convertDogEditorStateToDogPreview(
	dogState: DogState
): $ReadOnly<{
	clothes: string,
	clothesColor: string,
	customClothesImage?: string,
	earColor: string,
	expression: string,
	hair: string,
	hats: $ReadOnlyArray<ChosenHat>,
	skinColor: string,
	skinOutlineColor: string,
}> {
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
		skinColor: dogState.skinColor,
		skinOutlineColor: dogState.skinOutlineColor,
	};
}

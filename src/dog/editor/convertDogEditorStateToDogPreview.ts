import type {DogState} from '../DogEditorContext';
import type {ChosenHat} from '../drawDogToCanvas';

export default function convertDogEditorStateToDogPreview(
	dogState: DogState
): Readonly<{
	clothes: string;
	clothesColor: string;
	customClothesImage?: string;
	headSkinImage?: string;
	earColor: string;
	expression: string;
	hair: string;
	hats: ReadonlyArray<ChosenHat>;
	skinColor: string;
	skinOutlineColor: string;
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
		headSkinImage: dogState.headSkinImage ?? undefined,
		skinColor: dogState.skinColor,
		skinOutlineColor: dogState.skinOutlineColor,
	};
}

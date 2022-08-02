// @flow strict

import {DOG_CLOTHES_LIST} from './types/DogClothesList';
import {DOG_EXPRESSION_LIST} from './types/DogExpressionList';
import {DOG_HAIR_LIST} from './types/DogHairList';
import {DOG_HAT_LIST} from './types/DogHatList';

// Not the same as DrawdogPreset
export type ChicorobotDog = $ReadOnly<{
	clothes: string,
	clothesColor: string,
	expression: string,
	hair: string,
	hat: string,
	hatColor: string,
	skinColor: string,
}>;

export default function getChicorobotCode(dog: ChicorobotDog): string {
	// Clothes
	const clothesInfo = DOG_CLOTHES_LIST.find((clothes) => {
		return dog.clothes === clothes.internalName;
	});

	if (!clothesInfo) {
		throw new Error('Invalid clothes ' + dog.clothes);
	}

	// Hat
	const hatInfo = DOG_HAT_LIST.find((hat) => {
		return dog.hat === hat.internalName;
	});

	if (!hatInfo) {
		throw new Error('Invalid hat ' + dog.hat);
	}

	// Hair
	const hairInfo = DOG_HAIR_LIST.find((hair) => {
		return dog.hair === hair.internalName;
	});

	if (!hairInfo) {
		throw new Error('Invalid hair ' + dog.hair);
	}

	// Expression
	const expressionInfo = DOG_EXPRESSION_LIST.find((expression) => {
		return dog.expression === expression.value;
	});

	if (!expressionInfo) {
		throw new Error('Invalid expression ' + dog.expression);
	}

	return [
		`/dog`,
		`expression:${expressionInfo.chicorobotName}`,
		`clothes:${clothesInfo.chicorobotName}`,
		`hat:${hatInfo.chicorobotName}`,
		`hair:${hairInfo.chicorobotName}`,
		`body_col:${dog.skinColor}`,
		`clothes_col:${dog.clothesColor}`,
		`hat_col:${dog.hatColor}`,
	].join(' ');
}

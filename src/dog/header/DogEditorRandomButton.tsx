import convertRgbArrayToString from '../../util/convertRgbArrayToString';
import randomItem from '../../util/randomItem';
import {useDogEditorContext} from '../DogEditorContext';
import {DOG_CLOTHES_LIST} from '../types/DogClothesList';
import {DOG_EXPRESSION_LIST} from '../types/DogExpressionList';
import {DOG_HAIR_LIST} from '../types/DogHairList';
import {DOG_HAT_LIST} from '../types/DogHatList';

function randomNumber(min: number, max: number) {
	return min + Math.floor(Math.random() * (max - min));
}

export default function DogEditorRandomButton() {
	const {dispatch} = useDogEditorContext();

	const onRandomButtonClick = () => {
		let clothes, hat;

		do {
			clothes = randomItem(DOG_CLOTHES_LIST).internalName;
		} while (clothes === 'Custom Tee');

		do {
			hat = randomItem(DOG_HAT_LIST).internalName;
		} while (hat === 'Custom Hat');

		const expression = randomItem(DOG_EXPRESSION_LIST).value;
		const hair = randomItem(DOG_HAIR_LIST).internalName;

		const clothesColor = convertRgbArrayToString([
			randomNumber(0, 255),
			randomNumber(0, 255),
			randomNumber(0, 255),
		]);

		const hatColor = convertRgbArrayToString([
			randomNumber(0, 255),
			randomNumber(0, 255),
			randomNumber(0, 255),
		]);

		const skinColor = convertRgbArrayToString([
			randomNumber(0, 255),
			randomNumber(0, 255),
			randomNumber(0, 255),
		]);

		dispatch({
			type: 'setProperties',
			properties: {
				clothes,
				clothesColor,
				customClothesImage: null,
				earColor: skinColor,
				expression,
				hair,
				hasCustomEarColor: false,
				hats: [
					{
						name: hat,
						color: hatColor,
						customImage: null,
					},
				],
				headSkinImage: null,
				skinColor,
				skinOutlineColor: '#000000',
			},
		});
	};

	return (
		<button onClick={onRandomButtonClick} type="button">
			Randomize
		</button>
	);
}

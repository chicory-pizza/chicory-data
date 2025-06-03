import DogPreview from '../../dog/preview/DogPreview';
import convertBgrIntegerToRgb from '../../util/convertBgrIntegerToRgb';
import convertRgbArrayToString from '../../util/convertRgbArrayToString';
import type {GameObjectType} from '../types/GameObjectType';

import useLoadImageFromCustomDogTextBuffer from './useLoadImageFromCustomDogTextBuffer';

export type Props = Readonly<{
	canvasClassName?: string;
	obj: GameObjectType;
}>;

export default function ObjCustomDogPreview({canvasClassName, obj}: Props) {
	const isObjCustomDog = obj.obj === 'objCustomDog';

	const customClothesText =
		isObjCustomDog &&
		typeof obj.custom_clothes === 'string' &&
		obj.custom_clothes !== ''
			? obj.custom_clothes
			: null;
	const customClothesImage =
		useLoadImageFromCustomDogTextBuffer(customClothesText);

	const customHatText =
		isObjCustomDog &&
		typeof obj.custom_hat === 'string' &&
		obj.custom_hat !== ''
			? obj.custom_hat
			: null;
	const customHatImage = useLoadImageFromCustomDogTextBuffer(customHatText);

	if (!isObjCustomDog) {
		return null;
	}

	const skinColor =
		typeof obj.color_skin === 'number'
			? convertRgbArrayToString(convertBgrIntegerToRgb(obj.color_skin))
			: '#ffffff';

	return (
		<DogPreview
			animation="idle"
			animationIndex={0}
			canvasClassName={canvasClassName}
			clothes={typeof obj.clothes === 'string' ? obj.clothes : 'Overalls'}
			clothesColor={
				typeof obj.color_body === 'number'
					? convertRgbArrayToString(convertBgrIntegerToRgb(obj.color_body))
					: '#ffffff'
			}
			customClothesImage={customClothesImage}
			earColor={skinColor}
			expression={
				typeof obj.expression === 'string' && obj.expression !== ''
					? obj.expression
					: 'normal'
			}
			hair={typeof obj.hair === 'string' ? obj.hair : 'Simple'}
			hats={[
				{
					name: typeof obj.hat === 'string' ? obj.hat : 'Bandana',
					color:
						typeof obj.color_head === 'number'
							? convertRgbArrayToString(convertBgrIntegerToRgb(obj.color_head))
							: '#ffffff',
					customImage: customHatImage,
				},
			]}
			headSkinImage={null}
			showBody={true}
			skinColor={skinColor}
		/>
	);
}

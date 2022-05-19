// @flow strict

import DogPreview from '../../../dog/DogPreview';
import type {GameObjectType} from '../../types/GameObjectType';
import convertBgrIntegerToRgb from '../../util/convertBgrIntegerToRgb';
import convertRgbArrayToString from '../../util/convertRgbArrayToString';

import styles from './SidebarObjectCustomDog.module.css';

type Props = $ReadOnly<{
	obj: GameObjectType,
}>;

export default function SidebarObjectCustomDog(props: Props): React$Node {
	const obj = props.obj;

	if (obj.obj !== 'objCustomDog') {
		return null;
	}

	return (
		<div className={styles.center}>
			<DogPreview
				animation="idle"
				clothes={typeof obj.clothes === 'string' ? obj.clothes : 'Overalls'}
				clothesColor={
					typeof obj.color_body === 'number'
						? convertRgbArrayToString(convertBgrIntegerToRgb(obj.color_body))
						: '#ffffff'
				}
				customClothesImage={null}
				hats={[
					{
						name: typeof obj.hat === 'string' ? obj.hat : 'Bandana',
						color:
							typeof obj.color_head === 'number'
								? convertRgbArrayToString(
										convertBgrIntegerToRgb(obj.color_head)
								  )
								: '#ffffff',
						customImage: null,
					},
				]}
				hair={typeof obj.hair === 'string' ? obj.hair : 'Simple'}
				height={150}
				skinColor={
					typeof obj.color_skin === 'number'
						? convertRgbArrayToString(convertBgrIntegerToRgb(obj.color_skin))
						: '#ffffff'
				}
				width={150}
			/>
		</div>
	);
}

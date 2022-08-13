// @flow strict

import {memo} from 'react';

import ErrorBoundary from '../../common/ErrorBoundary';
import DogPreview from '../../dog/preview/DogPreview';
import convertBgrIntegerToRgb from '../../util/convertBgrIntegerToRgb';
import convertRgbArrayToString from '../../util/convertRgbArrayToString';
import type {GameObjectType} from '../types/GameObjectType';

import styles from './LevelPreviewCustomDog.module.css';

export type Props = $ReadOnly<{
	obj: GameObjectType,
}>;

function LevelPreviewCustomDog(props: Props): React$MixedElement {
	const obj = props.obj;

	if (obj.obj !== 'objCustomDog') {
		return <></>;
	}

	const skinColor =
		typeof obj.color_skin === 'number'
			? convertRgbArrayToString(convertBgrIntegerToRgb(obj.color_skin))
			: '#ffffff';

	return (
		<ErrorBoundary>
			<DogPreview
				animation="idle"
				animationIndex={0}
				canvasClassName={styles.dogPreview}
				clothes={typeof obj.clothes === 'string' ? obj.clothes : 'Overalls'}
				clothesColor={
					typeof obj.color_body === 'number'
						? convertRgbArrayToString(convertBgrIntegerToRgb(obj.color_body))
						: '#ffffff'
				}
				customClothesImage={null}
				earColor={skinColor}
				expression={
					typeof obj.expression === 'string' && obj.expression !== ''
						? obj.expression
						: 'normal'
				}
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
				showBody={true}
				skinColor={skinColor}
			/>
		</ErrorBoundary>
	);
}

export default (memo(LevelPreviewCustomDog): React$AbstractComponent<
	React$ElementConfig<typeof LevelPreviewCustomDog>,
	mixed
>);

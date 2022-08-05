// @flow strict

import {useState} from 'react';

import MessageBox from '../../../common/MessageBox.jsx';
import DrawdogGalleryModal from '../../../dog/presets/DrawdogGalleryModal';
import type {DrawdogPreset} from '../../../dog/presets/DrawdogPresets';
import DogPreviewWithAutoPlayAnimation from '../../../dog/preview/DogPreviewWithAutoPlayAnimation';
import convertBgrIntegerToRgb from '../../../util/convertBgrIntegerToRgb';
import convertHexToBgrInteger from '../../../util/convertHexToBgrInteger';
import useReducedMotion from '../../../util/useReducedMotion';
import type {GameObjectType} from '../../types/GameObjectType';
import convertRgbArrayToString from '../../util/convertRgbArrayToString';

import styles from './SidebarObjectCustomDog.module.css';

export type Props = $ReadOnly<{
	entityIndex: number,
	editProperties: (
		entityIndex: number,
		properties: {
			[key: string]: string | number | null,
		},
		entityType: 'OBJECT'
	) => mixed,
	obj: GameObjectType,
}>;

export default function SidebarObjectCustomDog(props: Props): React$Node {
	const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

	const isReducedMotion = useReducedMotion();

	const obj = props.obj;

	if (obj.obj !== 'objCustomDog') {
		return null;
	}

	const skinColor =
		typeof obj.color_skin === 'number'
			? convertRgbArrayToString(convertBgrIntegerToRgb(obj.color_skin))
			: '#ffffff';

	return (
		<>
			<div className={styles.center}>
				<DogPreviewWithAutoPlayAnimation
					animation="idle"
					canvasClassName={styles.dogPreviewCanvas}
					clothes={typeof obj.clothes === 'string' ? obj.clothes : 'Overalls'}
					clothesColor={
						typeof obj.color_body === 'number'
							? convertRgbArrayToString(convertBgrIntegerToRgb(obj.color_body))
							: '#ffffff'
					}
					customClothesImage={null}
					earColor={skinColor}
					expression={
						typeof obj.expression === 'string' ? obj.expression : 'normal'
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
					playAnimations={!isReducedMotion}
					skinColor={skinColor}
				/>
			</div>

			<button
				className={styles.galleryButton}
				onClick={() => setIsGalleryModalOpen(true)}
				type="button"
			>
				Choose from gallery
			</button>

			{obj.clothes === 'Custom Tee' || obj.hat === 'Custom Hat' ? (
				<MessageBox
					message="Custom clothes/hat will show the current player's custom art instead"
					type="INFO"
				/>
			) : null}

			<DrawdogGalleryModal
				isOpen={isGalleryModalOpen}
				onModalRequestClose={() => setIsGalleryModalOpen(false)}
				onPresetSelect={(preset: DrawdogPreset) => {
					props.editProperties(
						props.entityIndex,
						{
							clothes: preset.clothes,
							color_body: convertHexToBgrInteger(preset.clothesColor),
							color_head: convertHexToBgrInteger(preset.hats[0].color),
							color_skin: convertHexToBgrInteger(preset.skinColor),
							comment: preset.name,
							hair: preset.hair,
							hat: preset.hats[0].name,
						},
						'OBJECT'
					);
				}}
			/>
		</>
	);
}

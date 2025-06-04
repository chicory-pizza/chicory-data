import {Button} from '@mantine/core';
import {encode} from 'base64-arraybuffer';
import {deflate} from 'pako';
import {useState} from 'react';

import MessageBox from '../../../common/MessageBox';
import DrawdogGalleryModal from '../../../dog/presets/DrawdogGalleryModal';
import type {DrawdogPreset} from '../../../dog/presets/DrawdogPresets';
import convertHexToBgrInteger from '../../../util/convertHexToBgrInteger';
import ObjCustomDogPreview from '../../common/ObjCustomDogPreview';
import type {ObjCustomDogType} from '../../types/GameObjectType';

import styles from './SidebarObjectCustomDog.module.css';

async function loadImage(
	url: string | null | undefined
): Promise<string | undefined> {
	if (url == null) {
		return;
	}

	const response = await fetch(url);
	const blob = await response.blob();
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			const result = reader.result;
			if (!(result instanceof ArrayBuffer)) {
				reject('FileReader result should be ArrayBuffer');
				return;
			}

			resolve(encode(deflate(result)));
		};
		reader.onerror = reject;
		reader.readAsArrayBuffer(blob);
	});
}

export type Props = Readonly<{
	entityIndex: number;
	editProperties: (
		entityIndex: number,
		properties: {
			[key: string]: string | number | null;
		},
		entityType: 'OBJECT'
	) => void;
	obj: ObjCustomDogType;
}>;

export default function SidebarObjectCustomDog(props: Props) {
	const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

	const obj = props.obj;

	return (
		<>
			<div className={styles.center}>
				<ObjCustomDogPreview
					canvasClassName={styles.dogPreviewCanvas}
					obj={obj}
				/>
			</div>

			<Button
				className={styles.galleryButton}
				onClick={() => setIsGalleryModalOpen(true)}
				variant="default"
			>
				Choose from gallery
			</Button>

			{obj.clothes === 'Custom Tee' &&
			(obj.custom_clothes == null || obj.custom_clothes === '') ? (
				<MessageBox
					message="No custom clothes image selected, the current player's custom clothes will be shown instead"
					type="INFO"
				/>
			) : null}

			{obj.hat === 'Custom Hat' &&
			(obj.custom_hat == null || obj.custom_hat === '') ? (
				<MessageBox
					message="No custom hat image selected, the current player's custom hat will be shown instead"
					type="INFO"
				/>
			) : null}

			<DrawdogGalleryModal
				isOpen={isGalleryModalOpen}
				onModalRequestClose={() => setIsGalleryModalOpen(false)}
				onPresetSelect={async (preset: DrawdogPreset) => {
					const [customClothesImage, customHatImage] = await Promise.all([
						loadImage(preset.customClothesImage),
						loadImage(preset.hats[0].customImage),
					]);

					props.editProperties(
						props.entityIndex,
						{
							clothes: preset.clothes,
							color_body: convertHexToBgrInteger(preset.clothesColor),
							color_head: convertHexToBgrInteger(preset.hats[0].color),
							color_skin: convertHexToBgrInteger(preset.skinColor),
							custom_clothes: customClothesImage ?? '',
							custom_hat: customHatImage ?? '',
							hair: preset.hair,
							hat: preset.hats[0].name,
							npc_name: preset.name,
						},
						'OBJECT'
					);
				}}
			/>
		</>
	);
}

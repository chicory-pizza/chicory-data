import {useMemo, useState} from 'react';

import {useDogEditorContext} from '../DogEditorContext';
import DrawdogGridModal from '../grid/DrawdogGridModal';
import convertDogEditorStateToPreset from '../presets/convertDogEditorStateToPreset';
import type {DrawdogPreset} from '../presets/DrawdogPresets';
import {DOG_CLOTHES_LIST} from '../types/DogClothesList';

import ModalLauncherButton from './ModalLauncherButton';

type Props = Readonly<{
	onChange: (value: string) => void;
}>;

export default function DogClothesSelectModalLauncher({onChange}: Props) {
	const {dogState} = useDogEditorContext();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const presets: Array<DrawdogPreset> = useMemo(() => {
		return DOG_CLOTHES_LIST.map((clothes) => {
			return {
				...convertDogEditorStateToPreset(dogState),
				clothes: clothes.internalName,
				name: clothes.externalName,
			};
		});
	}, [dogState]);

	return (
		<>
			<ModalLauncherButton
				aria-label="View all clothes in new window"
				onClick={() => setIsModalOpen(true)}
				title="View all clothes in new window"
			/>

			<DrawdogGridModal
				canChangeExpressionOnMouseOver={false}
				canPlayAnimations={false}
				isOpen={isModalOpen}
				onModalRequestClose={() => setIsModalOpen(false)}
				onPresetSelect={(preset) => {
					onChange(preset.clothes);
				}}
				presets={presets}
				showBody={dogState.bodyShow}
				title="Select clothes"
			/>
		</>
	);
}

import {useMemo, useState} from 'react';

import {useDogEditorContext} from '../DogEditorContext';
import DrawdogGridModal from '../grid/DrawdogGridModal';
import convertDogEditorStateToPreset from '../presets/convertDogEditorStateToPreset';
import type {DrawdogPreset} from '../presets/DrawdogPresets';
import {DOG_HAT_LIST} from '../types/DogHatList';

import ModalLauncherButton from './ModalLauncherButton';

type Props = Readonly<{
	layer: number;
	onChange: (value: string) => void;
}>;

export default function DogHatSelectModalLauncher({layer, onChange}: Props) {
	const {dogState} = useDogEditorContext();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const presets: Array<DrawdogPreset> = useMemo(() => {
		if (!isModalOpen) {
			return [];
		}

		return DOG_HAT_LIST.map((hat) => {
			return {
				...convertDogEditorStateToPreset(dogState),
				hats: dogState.hats
					.slice(0, layer)
					.concat({
						name: hat.internalName,
						color: dogState.hats[layer].color,
						customImage: dogState.hats[layer].customImage,
					})
					.concat(dogState.hats.slice(layer + 1)),
				name: hat.externalName,
			};
		});
	}, [dogState, isModalOpen, layer]);

	return (
		<>
			<ModalLauncherButton
				aria-label="View all hats in new window"
				onClick={() => setIsModalOpen(true)}
				title="View all hats in new window"
			/>

			<DrawdogGridModal
				canChangeExpressionOnMouseOver={false}
				canPlayAnimations={false}
				isOpen={isModalOpen}
				onModalRequestClose={() => setIsModalOpen(false)}
				onPresetSelect={(preset) => {
					onChange(preset.hats[layer].name);
				}}
				presets={presets}
				showBody={dogState.bodyShow}
				title="Select hat"
			/>
		</>
	);
}

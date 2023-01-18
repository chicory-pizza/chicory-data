// @flow strict

import {useMemo, useState} from 'react';

import {useDogEditorContext} from '../DogEditorContext';
import DrawdogGridModal from '../grid/DrawdogGridModal';
import convertDogEditorStateToPreset from '../presets/convertDogEditorStateToPreset';
import type {DrawdogPreset} from '../presets/DrawdogPresets';
import {DOG_CLOTHES_LIST} from '../types/DogClothesList';

import ModalLauncherButton from './ModalLauncherButton';

type Props = $ReadOnly<{
	onChange: (value: string) => mixed,
}>;

export default function DogClothesSelectModalLauncher({
	onChange,
}: Props): React$MixedElement {
	const {dogState} = useDogEditorContext();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const presets = useMemo(() => {
		if (!isModalOpen) {
			return ([]: $ReadOnlyArray<DrawdogPreset>);
		}

		return DOG_CLOTHES_LIST.map((clothes) => {
			return {
				...convertDogEditorStateToPreset(dogState),
				clothes: clothes.internalName,
				name: clothes.externalName,
			};
		});
	}, [dogState, isModalOpen]);

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

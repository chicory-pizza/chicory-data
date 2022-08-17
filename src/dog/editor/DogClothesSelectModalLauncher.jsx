// @flow strict

import {useMemo, useState} from 'react';

import {useDogEditorContext} from '../DogEditorContext';
import DrawdogGridModal from '../grid/DrawdogGridModal';
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
			return [];
		}

		return DOG_CLOTHES_LIST.map((clothes) => {
			return {
				clothes: clothes.internalName,
				clothesColor: dogState.clothesColor,
				customClothesImage: dogState.customClothesImage ?? undefined,
				earColor: dogState.earColor,
				expression: dogState.expression,
				hair: dogState.hair,
				hats: dogState.hats,
				name: clothes.externalName,
				skinColor: dogState.skinColor,
				skinOutlineColor: dogState.skinOutlineColor,
			};
		});
	}, [
		dogState.clothesColor,
		dogState.customClothesImage,
		dogState.earColor,
		dogState.expression,
		dogState.hair,
		dogState.hats,
		dogState.skinColor,
		dogState.skinOutlineColor,
		isModalOpen,
	]);

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

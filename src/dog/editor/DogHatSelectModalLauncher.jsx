// @flow strict

import {useMemo, useState} from 'react';

import {useDogEditorContext} from '../DogEditorContext';
import DrawdogGridModal from '../grid/DrawdogGridModal';
import {DOG_HAT_LIST} from '../types/DogHatList';

import ModalLauncherButton from './ModalLauncherButton';

type Props = $ReadOnly<{
	layer: number,
	onChange: (value: string) => mixed,
}>;

export default function DogHatSelectModalLauncher({
	layer,
	onChange,
}: Props): React$MixedElement {
	const {dogState} = useDogEditorContext();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const presets = useMemo(() => {
		if (!isModalOpen) {
			return [];
		}

		return DOG_HAT_LIST.map((hat) => {
			return {
				clothes: dogState.clothes,
				clothesColor: dogState.clothesColor,
				customClothesImage: dogState.customClothesImage ?? undefined,
				earColor: dogState.earColor,
				expression: dogState.expression,
				hair: dogState.hair,
				hats: dogState.hats
					.slice(0, layer)
					.concat({
						name: hat.internalName,
						color: dogState.hats[layer].color,
						customImage: dogState.hats[layer].customImage,
					})
					.concat(dogState.hats.slice(layer + 1)),
				name: hat.externalName,
				skinColor: dogState.skinColor,
				skinOutlineColor: dogState.skinOutlineColor,
			};
		});
	}, [
		dogState.clothes,
		dogState.clothesColor,
		dogState.customClothesImage,
		dogState.earColor,
		dogState.expression,
		dogState.hair,
		dogState.hats,
		dogState.skinColor,
		dogState.skinOutlineColor,
		isModalOpen,
		layer,
	]);

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

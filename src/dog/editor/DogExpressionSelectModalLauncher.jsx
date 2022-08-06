// @flow strict

import {useMemo, useState} from 'react';

import {useDogEditorContext} from '../DogEditorContext';
import DrawdogGridModal from '../grid/DrawdogGridModal';
import {DOG_EXPRESSION_LIST} from '../types/DogExpressionList';

import ModalLauncherButton from './ModalLauncherButton';

type Props = $ReadOnly<{
	onChange: (value: string) => mixed,
}>;

export default function DogExpressionSelectModalLauncher({
	onChange,
}: Props): React$MixedElement {
	const {dogState} = useDogEditorContext();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const presets = useMemo(() => {
		if (!isModalOpen) {
			return [];
		}

		return DOG_EXPRESSION_LIST.map((expression) => {
			return {
				clothes: dogState.clothes,
				clothesColor: dogState.clothesColor,
				customClothesImage: dogState.customClothesImage ?? undefined,
				earColor: dogState.earColor,
				expression: expression.value,
				hair: dogState.hair,
				hats: dogState.hats,
				name: expression.label,
				skinColor: dogState.skinColor,
				skinOutlineColor: dogState.skinOutlineColor,
			};
		});
	}, [
		dogState.clothes,
		dogState.clothesColor,
		dogState.customClothesImage,
		dogState.earColor,
		dogState.hair,
		dogState.hats,
		dogState.skinColor,
		dogState.skinOutlineColor,
		isModalOpen,
	]);

	return (
		<>
			<ModalLauncherButton
				aria-label="View all expressions in new window"
				onClick={() => setIsModalOpen(true)}
				title="View all expressions in new window"
			/>

			<DrawdogGridModal
				canChangeExpressionOnMouseOver={false}
				canPlayAnimations={false}
				isOpen={isModalOpen}
				onModalRequestClose={() => setIsModalOpen(false)}
				onPresetSelect={(preset) => {
					if (preset.expression != null) {
						onChange(preset.expression);
					}
				}}
				presets={presets}
				title="Select expression"
			/>
		</>
	);
}

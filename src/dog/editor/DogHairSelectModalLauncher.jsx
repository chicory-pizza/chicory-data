// @flow strict

import {useMemo, useState} from 'react';

import {useDogEditorContext} from '../DogEditorContext';
import DrawdogGridModal from '../grid/DrawdogGridModal';
import {DOG_HAIR_LIST} from '../types/DogHairList';
import {DOG_HAT_LIST} from '../types/DogHatList';

import ModalLauncherButton from './ModalLauncherButton';

type Props = $ReadOnly<{
	onChange: (value: string) => mixed,
}>;

export default function DogHairSelectModalLauncher({
	onChange,
}: Props): React$MixedElement {
	const {dogState} = useDogEditorContext();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const presets = useMemo(() => {
		if (!isModalOpen) {
			return [];
		}

		return DOG_HAIR_LIST.map((hair) => {
			const hatCanDrawHair = dogState.hats.every((dogHat) => {
				const hatInfo = DOG_HAT_LIST.find((hat) => {
					return dogHat.name === hat.internalName;
				});

				if (hatInfo == null) {
					return false;
				}

				return (
					// There are no hats at all
					hatInfo.imageWithPaddingPath == null ||
					// Ensure all hats can show hair
					hatInfo.showHair === 1 ||
					(hatInfo.showHair != null && hatInfo.showHair > 2)
				);
			});

			const hats = hatCanDrawHair
				? dogState.hats
				: [
						{
							name: 'None',
							color: dogState.hats[0].color,
						},
				  ];

			return {
				clothes: dogState.clothes,
				clothesColor: dogState.clothesColor,
				customClothesImage: dogState.customClothesImage ?? undefined,
				earColor: dogState.earColor,
				expression: dogState.expression,
				hair: hair.internalName,
				hats,
				name: hair.externalName,
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
		dogState.hats,
		dogState.skinColor,
		dogState.skinOutlineColor,
		isModalOpen,
	]);

	return (
		<>
			<ModalLauncherButton
				aria-label="View all hair in new window"
				onClick={() => setIsModalOpen(true)}
				title="View all hair in new window"
			/>

			<DrawdogGridModal
				canChangeExpressionOnMouseOver={false}
				canPlayAnimations={false}
				isOpen={isModalOpen}
				onModalRequestClose={() => setIsModalOpen(false)}
				onPresetSelect={(preset) => {
					if (preset.hair != null) {
						onChange(preset.hair);
					}
				}}
				presets={presets}
				title="Select hair"
			/>
		</>
	);
}

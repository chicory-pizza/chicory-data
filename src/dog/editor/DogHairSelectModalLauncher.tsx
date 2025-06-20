import {useDisclosure} from '@mantine/hooks';
import {useMemo} from 'react';

import {useDogEditorContext} from '../DogEditorContext';
import DrawdogGridModal from '../grid/DrawdogGridModal';
import convertDogEditorStateToPreset from '../presets/convertDogEditorStateToPreset';
import type {DrawdogPreset} from '../presets/DrawdogPresets';
import {DOG_HAIR_LIST} from '../types/DogHairList';
import {DOG_HAT_LIST} from '../types/DogHatList';

import ModalLauncherButton from './ModalLauncherButton';

type Props = Readonly<{
	onChange: (value: string) => void;
}>;

export default function DogHairSelectModalLauncher({onChange}: Props) {
	const {dogState} = useDogEditorContext();

	const [isModalOpen, {open: openModal, close: closeModal}] =
		useDisclosure(false);

	const presets: Array<DrawdogPreset> = useMemo(() => {
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
				...convertDogEditorStateToPreset(dogState),
				hair: hair.internalName,
				hats,
				name: hair.externalName,
			};
		});
	}, [dogState]);

	return (
		<>
			<ModalLauncherButton
				label="View all hair in new window"
				onClick={openModal}
			/>

			<DrawdogGridModal
				canChangeExpressionOnMouseOver={false}
				canPlayAnimations={false}
				isOpen={isModalOpen}
				onModalRequestClose={closeModal}
				onPresetSelect={(preset) => {
					if (preset.hair != null) {
						onChange(preset.hair);
					}
				}}
				presets={presets}
				showBody={dogState.bodyShow}
				title="Select hair"
			/>
		</>
	);
}

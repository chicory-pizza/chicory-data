import {useDisclosure} from '@mantine/hooks';
import {useMemo} from 'react';

import {useDogEditorContext} from '../DogEditorContext';
import DrawdogGridModal from '../grid/DrawdogGridModal';
import convertDogEditorStateToPreset from '../presets/convertDogEditorStateToPreset';
import type {DrawdogPreset} from '../presets/DrawdogPresets';
import {DOG_EXPRESSION_LIST} from '../types/DogExpressionList';

import ModalLauncherButton from './ModalLauncherButton';

type Props = Readonly<{
	onChange: (value: string) => void;
}>;

export default function DogExpressionSelectModalLauncher({onChange}: Props) {
	const {dogState} = useDogEditorContext();

	const [isModalOpen, {open: openModal, close: closeModal}] =
		useDisclosure(false);

	const presets: Array<DrawdogPreset> = useMemo(() => {
		return DOG_EXPRESSION_LIST.map((expression) => {
			return {
				...convertDogEditorStateToPreset(dogState),
				expression: expression.value,
				name: expression.label,
			};
		});
	}, [dogState]);

	return (
		<>
			<ModalLauncherButton
				label="View all expressions in new window"
				onClick={openModal}
			/>

			<DrawdogGridModal
				canChangeExpressionOnMouseOver={false}
				canPlayAnimations={false}
				isOpen={isModalOpen}
				onModalRequestClose={closeModal}
				onPresetSelect={(preset) => {
					if (preset.expression != null) {
						onChange(preset.expression);
					}
				}}
				presets={presets}
				showBody={dogState.bodyShow}
				title="Select expression"
			/>
		</>
	);
}

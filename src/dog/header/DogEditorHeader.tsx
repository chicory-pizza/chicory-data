import {Button} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';

import ErrorBoundary from '../../common/ErrorBoundary';
import AppHeader from '../../header/AppHeader';
import type {ChosenHat} from '../drawDogToCanvas';
import DrawdogGalleryModal from '../presets/DrawdogGalleryModal';
import type {DrawdogPreset} from '../presets/DrawdogPresets';

import DogEditorDataSelector from './DogEditorDataSelector';
import styles from './DogEditorHeader.module.css';
import DogEditorRandomButton from './DogEditorRandomButton';
import DogEditorUndoRedo from './DogEditorUndoRedo';

type Props = Readonly<{
	hats: ReadonlyArray<ChosenHat>;
	onPresetSelect: (preset: DrawdogPreset) => void;
}>;

export default function DogEditorHeader(props: Props) {
	const [
		isGalleryModalOpen,
		{open: openGalleryModal, close: closeGalleryModal},
	] = useDisclosure(false);

	return (
		<>
			<AppHeader
				controls={
					<div className={styles.controls}>
						<div className={styles.flexGrow}>
							<Button onClick={openGalleryModal} variant="default">
								Gallery
							</Button>

							<DogEditorRandomButton />
						</div>

						<DogEditorUndoRedo />
					</div>
				}
				title="Drawdog maker"
				titleSideStuff={
					<ErrorBoundary>
						<DogEditorDataSelector
							hats={props.hats}
							onPresetSelect={props.onPresetSelect}
						/>
					</ErrorBoundary>
				}
			/>

			<DrawdogGalleryModal
				isOpen={isGalleryModalOpen}
				onModalRequestClose={closeGalleryModal}
				onPresetSelect={props.onPresetSelect}
			/>
		</>
	);
}

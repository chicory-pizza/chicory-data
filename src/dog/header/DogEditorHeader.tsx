import {Button} from '@mantine/core';
import {useState} from 'react';

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
	const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

	return (
		<>
			<AppHeader
				controls={
					<div className={styles.controls}>
						<div className={styles.flexGrow}>
							<Button
								onClick={() => setIsGalleryModalOpen(true)}
								variant="default"
							>
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
				onModalRequestClose={() => setIsGalleryModalOpen(false)}
				onPresetSelect={props.onPresetSelect}
			/>
		</>
	);
}

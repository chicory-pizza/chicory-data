// @flow strict

import {useState} from 'react';

import ErrorBoundary from '../../common/ErrorBoundary';
import AppHeader from '../../header/AppHeader';
import type {ChosenHat} from '../drawDogToCanvas';
import DrawdogGalleryModal from '../presets/DrawdogGalleryModal';
import type {DrawdogPreset} from '../presets/DrawdogPresets';

import DogEditorDataSelector from './DogEditorDataSelector';
import styles from './DogEditorHeader.module.css';
import DogEditorUndoRedo from './DogEditorUndoRedo';

type Props = $ReadOnly<{
	hats: $ReadOnlyArray<ChosenHat>,
	onPresetSelect: (preset: DrawdogPreset) => mixed,
}>;

export default function DogEditorHeader(props: Props): React$MixedElement {
	const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

	return (
		<>
			<AppHeader
				controls={
					<div className={styles.controls}>
						<div className={styles.flexGrow}>
							<button onClick={() => setIsGalleryModalOpen(true)} type="button">
								Gallery
							</button>
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

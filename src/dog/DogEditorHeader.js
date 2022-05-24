// @flow strict

import {useState} from 'react';

import AppHeader from '../header/AppHeader';

import styles from './DogEditorHeader.module.css';
import DrawdogGalleryModal from './presets/DrawdogGalleryModal';
import type {DrawdogPreset} from './presets/DrawdogPresets';

type Props = $ReadOnly<{
	onPresetSelect: (preset: DrawdogPreset) => mixed,
}>;

export default function DogEditorHeader(props: Props): React$Node {
	const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

	return (
		<>
			<AppHeader
				controls={
					<div className={styles.controls}>
						<button onClick={() => setIsGalleryModalOpen(true)} type="button">
							Gallery
						</button>
					</div>
				}
				title="Drawdog maker"
			/>

			<DrawdogGalleryModal
				isOpen={isGalleryModalOpen}
				onModalRequestClose={() => setIsGalleryModalOpen(false)}
				onPresetSelect={props.onPresetSelect}
			/>
		</>
	);
}

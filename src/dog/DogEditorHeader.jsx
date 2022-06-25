// @flow strict

import {useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import AppHeader from '../header/AppHeader';

import DogEditorDataSelector from './DogEditorDataSelector';
import styles from './DogEditorHeader.module.css';
import type {ChosenHat} from './drawDogToCanvas';
import DrawdogGalleryModal from './presets/DrawdogGalleryModal';
import type {DrawdogPreset} from './presets/DrawdogPresets';

type Props = $ReadOnly<{
	clothes: string,
	clothesColor: string,
	customClothesImage: ?string,
	expression: string,
	hats: $ReadOnlyArray<ChosenHat>,
	hair: string,
	onPresetSelect: (preset: DrawdogPreset) => mixed,
	skinColor: string,
	skinOutlineColor?: string,
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
				titleSideStuff={
					<ErrorBoundary>
						<DogEditorDataSelector
							clothes={props.clothes}
							clothesColor={props.clothesColor}
							customClothesImage={props.customClothesImage}
							expression={props.expression}
							hair={props.hair}
							hats={props.hats}
							onPresetSelect={props.onPresetSelect}
							skinColor={props.skinColor}
							skinOutlineColor={props.skinOutlineColor}
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

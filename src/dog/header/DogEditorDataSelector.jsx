// @flow strict

import {fileSave} from 'browser-fs-access';
import {useState} from 'react';

import CommonDataLoadButton from '../../common/CommonDataLoadButton';
import CommonDataSaveButton from '../../common/CommonDataSaveButton';
import CommonDataSaveTimestamp from '../../common/CommonDataSaveTimestamp';
import {useDogEditorContext} from '../DogEditorContext';
import type {ChosenHat} from '../drawDogToCanvas';
import type {DrawdogPreset} from '../presets/DrawdogPresets';

import styles from './DogEditorDataSelector.module.css';
import DogEditorGifMaker from './DogEditorGifMaker';

type Props = $ReadOnly<{
	hats: $ReadOnlyArray<ChosenHat>,
	onPresetSelect: (preset: DrawdogPreset) => mixed,
}>;

export default function LevelEditorDataSelector(
	props: Props
): React$MixedElement {
	const {dogState} = useDogEditorContext();

	const [lastSaveTime, setLastSaveTime] = useState<?number>(null);

	function onFileLoad(reader: FileReader) {
		if (typeof reader.result !== 'string') {
			throw new Error('Expected string from file reader');
		}

		let result;
		try {
			result = JSON.parse(reader.result);
		} catch (ex) {
			console.error(ex);
			alert('The custom level_data JSON is invalid.');
			return;
		}

		props.onPresetSelect(result);
	}

	async function onFileSave(existingHandle: ?FileSystemFileHandle) {
		const data: $Diff<DrawdogPreset, {name: string}> = {
			clothes: dogState.clothes,
			clothesColor: dogState.clothesColor,
			customClothesImage:
				dogState.clothes === 'Custom Tee' && dogState.customClothesImage != null
					? dogState.customClothesImage
					: undefined,
			earColor: dogState.earColor != null ? dogState.earColor : undefined,
			expression: dogState.expression,
			hair: dogState.hair,
			hats: props.hats.map((hat) => {
				return {
					...hat,
					customImage:
						hat.name === 'Custom Hat' && hat.customImage != null
							? hat.customImage
							: null,
				};
			}),
			skinColor: dogState.skinColor,
			skinOutlineColor: dogState.skinOutlineColor,
		};

		const blob = new Blob([JSON.stringify(data, null, '\t')]);

		const handle = await fileSave(
			blob,
			{
				fileName: 'drawdog.json',
				description: 'JSON',
			},
			existingHandle
		);

		setLastSaveTime(Date.now() / 1000);

		return handle;
	}

	return (
		<div className={styles.root}>
			<div className={styles.space}>
				<CommonDataLoadButton onFileLoad={onFileLoad} />
			</div>

			<CommonDataSaveButton
				buttonProps={{
					className: styles.space,
				}}
				label="Save as JSON"
				onFileSave={onFileSave}
			/>

			<div className={styles.space}>
				<DogEditorGifMaker />
			</div>

			<CommonDataSaveTimestamp lastSaveTime={lastSaveTime} />
		</div>
	);
}

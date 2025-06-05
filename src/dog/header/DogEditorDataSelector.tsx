import {modals} from '@mantine/modals';
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

type Props = Readonly<{
	hats: ReadonlyArray<ChosenHat>;
	onPresetSelect: (preset: DrawdogPreset) => void;
}>;

export default function LevelEditorDataSelector(props: Props) {
	const {dogState} = useDogEditorContext();

	const [lastSaveTime, setLastSaveTime] = useState<number | null>(null);

	function onFileLoad(reader: FileReader) {
		if (typeof reader.result !== 'string') {
			throw new Error('Expected string from file reader');
		}

		let result;
		try {
			// todo validate using Zod
			result = JSON.parse(reader.result) as DrawdogPreset;
		} catch (ex) {
			console.error(ex);
			modals.openContextModal({
				modal: 'alert',
				title: 'Error',
				innerProps: {
					content: 'The selected drawdog file is not valid JSON.',
				},
			});
			return;
		}

		// todo use zod validation
		props.onPresetSelect(result);
	}

	async function onFileSave(existingHandle?: FileSystemFileHandle | null) {
		const data: Omit<DrawdogPreset, 'name'> = {
			clothes: dogState.clothes,
			clothesColor: dogState.clothesColor,
			customClothesImage:
				dogState.clothes === 'Custom Tee' && dogState.customClothesImage != null
					? dogState.customClothesImage
					: undefined,
			earColor: dogState.hasCustomEarColor ? dogState.earColor : undefined,
			expression: dogState.expression,
			hair: dogState.hair,
			hats: props.hats.map((hat) => {
				return {
					...hat,
					customImage:
						hat.name === 'Custom Hat' && hat.customImage != null
							? hat.customImage
							: undefined,
				};
			}),
			headSkinImage: dogState.headSkinImage ?? undefined,
			skinColor: dogState.skinColor,
			skinOutlineColor:
				dogState.skinOutlineColor !== '#000000'
					? dogState.skinOutlineColor
					: undefined,
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

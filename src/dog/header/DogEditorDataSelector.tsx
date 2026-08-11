import {modals} from '@mantine/modals';
import {fileSave} from 'browser-fs-access';
import {useState} from 'react';

import CommonDataLoadButton from '../../common/CommonDataLoadButton';
import CommonDataSaveButton from '../../common/CommonDataSaveButton';
import CommonDataSaveTimestamp from '../../common/CommonDataSaveTimestamp';
import {useDogEditorContext} from '../DogEditorContext';
import {
	type DrawdogPreset,
	DrawdogPresetSchema,
} from '../presets/DrawdogPresets';

import styles from './DogEditorDataSelector.module.css';
import DogEditorGifMaker from './DogEditorGifMaker';

type Props = Readonly<{
	onPresetSelect: (preset: DrawdogPreset) => void;
}>;

export default function LevelEditorDataSelector(props: Props) {
	const {dogState} = useDogEditorContext();

	const [lastSaveTime, setLastSaveTime] = useState<number | null>(null);

	function onFileLoad(fileName: string, result: string) {
		let validated;
		try {
			validated = DrawdogPresetSchema.parse(JSON.parse(result));
		} catch (ex) {
			console.error(ex);
			modals.openContextModal({
				modal: 'alert',
				title: 'Error',
				innerProps: {
					content: `'${fileName}' is not a valid drawdog project file.`,
				},
			});
			return;
		}

		props.onPresetSelect(validated);
	}

	async function onFileSave(existingHandle?: FileSystemFileHandle | null) {
		const data: DrawdogPreset = {
			clothes: dogState.clothes,
			clothesColor: dogState.clothesColor,
			customClothesImage:
				dogState.clothes === 'Custom Tee' && dogState.customClothesImage != null
					? dogState.customClothesImage
					: undefined,
			earColor: dogState.hasCustomEarColor ? dogState.earColor : undefined,
			expression: dogState.expression,
			hair: dogState.hair,
			hats: dogState.hats.map((hat) => {
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
			existingHandle,
		);

		setLastSaveTime(Date.now() / 1000);

		return handle;
	}

	return (
		<div className={styles.root}>
			<div className={styles.space}>
				<CommonDataLoadButton onFileLoad={onFileLoad} text="Load project" />
			</div>

			<CommonDataSaveButton
				buttonProps={{
					className: styles.space,
				}}
				label="Save project"
				onFileSave={onFileSave}
			/>

			<div className={styles.space}>
				<DogEditorGifMaker />
			</div>

			<CommonDataSaveTimestamp lastSaveTime={lastSaveTime} />
		</div>
	);
}

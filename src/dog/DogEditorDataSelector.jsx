// @flow strict

import {fileSave} from 'browser-fs-access';
import {useState} from 'react';

import CommonDataSelector from '../common/CommonDataSelector';

import type {ChosenHat} from './drawDogToCanvas';
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

export default function LevelEditorDataSelector(props: Props): React$Node {
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
			clothes: props.clothes,
			clothesColor: props.clothesColor,
			customClothesImage:
				props.clothes === 'Custom Tee' && props.customClothesImage != null
					? props.customClothesImage
					: undefined,
			expression: props.expression,
			hats: props.hats.map((hat) => {
				return {
					...hat,
					customImage:
						hat.name === 'Custom Hat' && hat.customImage != null
							? hat.customImage
							: null,
				};
			}),
			hair: props.hair,
			skinColor: props.skinColor,
			skinOutlineColor: props.skinOutlineColor,
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
		<CommonDataSelector
			isSaveDisabled={false}
			lastSaveTime={lastSaveTime}
			onFileLoad={onFileLoad}
			onFileSave={onFileSave}
		/>
	);
}

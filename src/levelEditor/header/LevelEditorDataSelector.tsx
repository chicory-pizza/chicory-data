import {modals} from '@mantine/modals';
import {fileSave} from 'browser-fs-access';
import {useState} from 'react';

import CommonDataSelector from '../../common/CommonDataSelector';
import LevelEditorBeforeUnloadPrompt from '../LevelEditorBeforeUnloadPrompt';
import type {WorldType} from '../types/WorldType';
import {useWorldDataNullable} from '../WorldDataContext';

export default function LevelEditorDataSelector() {
	const {worldData, dispatch} = useWorldDataNullable();
	const [lastSaveTime, setLastSaveTime] = useState<number | null>(null);

	function onFileLoad(reader: FileReader) {
		if (typeof reader.result !== 'string') {
			throw new Error('Expected string from file reader');
		}

		let result;
		try {
			// todo validate using Zod
			result = JSON.parse(reader.result) as WorldType;
		} catch (ex) {
			console.error(ex);
			modals.openContextModal({
				modal: 'alert',
				title: 'Error',
				innerProps: {
					content: 'The selected level_data is not valid JSON.',
				},
			});
			return;
		}

		dispatch({
			type: 'setWorldData',
			worldData: result,
		});

		dispatch({
			type: 'clearUndoHistory',
		});
	}

	async function onFileSave(existingHandle?: FileSystemFileHandle | null) {
		const blob = new Blob([JSON.stringify(worldData)]);

		const handle = await fileSave(
			blob,
			{
				fileName: 'level_data',
				description: 'JSON',
			},
			existingHandle
		);

		setLastSaveTime(Date.now() / 1000);

		return handle;
	}

	return (
		<>
			<CommonDataSelector
				isSaveDisabled={worldData == null}
				lastSaveTime={lastSaveTime}
				onFileLoad={onFileLoad}
				onFileSave={onFileSave}
				saveButtonLabel="Save"
			/>

			<LevelEditorBeforeUnloadPrompt lastSaveTime={lastSaveTime} />
		</>
	);
}

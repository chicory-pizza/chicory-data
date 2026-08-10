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

	function onFileLoad(fileName: string, result: string) {
		let validated;
		try {
			// todo validate using Zod
			validated = JSON.parse(result) as WorldType;
		} catch (ex) {
			console.error(ex);
			modals.openContextModal({
				modal: 'alert',
				title: 'Error',
				innerProps: {
					content: `'${fileName}' is not a valid level data file.`,
				},
			});
			return;
		}

		dispatch({
			type: 'setWorldData',
			worldData: validated,
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
			existingHandle,
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

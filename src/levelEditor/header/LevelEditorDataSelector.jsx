// @flow strict

import {fileSave} from 'browser-fs-access';
import {useState} from 'react';

import CommonDataSelector from '../../common/CommonDataSelector';
import LevelEditorBeforeUnloadPrompt from '../LevelEditorBeforeUnloadPrompt';
import {useWorldDataNullable} from '../WorldDataContext';

export default function LevelEditorDataSelector(): React$Node {
	const {worldData, dispatch} = useWorldDataNullable();
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

		dispatch({
			type: 'setWorldData',
			worldData: result,
		});

		dispatch({
			type: 'clearUndoHistory',
		});
	}

	async function onFileSave(existingHandle: ?FileSystemFileHandle) {
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

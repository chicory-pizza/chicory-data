// @flow strict

// $FlowFixMe[untyped-import]
import {fileOpen, fileSave} from 'browser-fs-access';
import {useRef, useState} from 'react';

import LevelEditorBeforeUnloadPrompt from '../LevelEditorBeforeUnloadPrompt';
import {useWorldDataNullable} from '../WorldDataContext';

import DataSaveTimestamp from './DataSaveTimestamp';
import styles from './DataSelector.module.css';

export default function DataSelector(): React$Node {
	const {worldData, dispatch} = useWorldDataNullable();
	const [lastSaveTime, setLastSaveTime] = useState<?number>(null);

	const saveFileHandleRef = useRef(null);

	async function openFile() {
		const blob = await fileOpen();
		const reader = new FileReader();
		reader.onload = (buffer: ProgressEvent) => {
			const reader = buffer.currentTarget;
			if (
				!(reader instanceof FileReader) ||
				typeof reader.result !== 'string'
			) {
				throw new Error();
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
		};
		reader.onerror = (ex) => {
			console.error(ex);
			alert('There was a problem reading the file.');
		};
		reader.readAsText(blob);
	}

	async function saveFile() {
		const blob = new Blob([JSON.stringify(worldData)]);

		try {
			saveFileHandleRef.current = await fileSave(
				blob,
				{
					fileName: 'level_data',
				},
				saveFileHandleRef.current
			);

			setLastSaveTime(Date.now() / 1000);
		} catch (ex) {
			if (ex.name !== 'AbortError') {
				console.error(ex);
				alert('There was a problem saving the file.');
			}
		}
	}

	return (
		<div className={styles.root}>
			<div className={styles.space}>
				<button type="button" onClick={openFile}>
					Load custom level_data
				</button>
			</div>

			<button
				className={styles.space}
				disabled={worldData == null}
				onClick={saveFile}
				type="button"
			>
				Save
			</button>

			<DataSaveTimestamp lastSaveTime={lastSaveTime} />
			<LevelEditorBeforeUnloadPrompt lastSaveTime={lastSaveTime} />
		</div>
	);
}

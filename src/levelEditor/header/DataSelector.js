// @flow strict

// $FlowFixMe[untyped-import]
import {fileOpen, fileSave} from 'browser-fs-access';
import {useRef} from 'react';

import type {LevelType} from '../types/LevelType';

import styles from './DataSelector.module.css';

type Props = $ReadOnly<{
	levels: ?{[levelId: string]: LevelType},
	onNewLevelsLoad: ({[levelId: string]: LevelType}) => mixed,
}>;

export default function DataSelector(props: Props): React$Node {
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

			props.onNewLevelsLoad(result);
		};
		reader.onerror = (ex) => {
			console.error(ex);
			alert('There was a problem reading the file.');
		};
		reader.readAsText(blob);
	}

	async function saveFile() {
		const blob = new Blob([JSON.stringify(props.levels)]);
		try {
			saveFileHandleRef.current = await fileSave(
				blob,
				{
					fileName: 'level_data',
				},
				saveFileHandleRef.current
			);
		} catch (err) {
			if (err.name !== 'AbortError') {
				console.error(err);
				alert('There was a problem saving the file.');
			}
			console.log('The user aborted a request.');
		}
	}

	return (
		<>
			<div className={styles.space}>
				<button type="button" onClick={openFile}>
					Load custom level_data
				</button>
			</div>

			<button disabled={props.levels == null} type="button" onClick={saveFile}>
				Save
			</button>
		</>
	);
}

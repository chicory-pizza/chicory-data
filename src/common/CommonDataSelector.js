// @flow strict

import {fileOpen} from 'browser-fs-access';
import {useRef} from 'react';

import CommonDataSaveTimestamp from './CommonDataSaveTimestamp';
import styles from './CommonDataSelector.module.css';

type Props = $ReadOnly<{
	isSaveDisabled: boolean,
	lastSaveTime: ?number,
	onFileLoad: (reader: FileReader) => mixed,
	onFileSave: (
		existingHandle: ?FileSystemFileHandle
	) => Promise<?FileSystemFileHandle>,
}>;

export default function CommonDataSelector(props: Props): React$Node {
	const saveFileHandleRef = useRef<?FileSystemFileHandle>(null);

	async function openFile() {
		const blob = await fileOpen();

		const reader = new FileReader();
		reader.onload = (buffer: ProgressEvent) => {
			const reader = buffer.currentTarget;
			if (!(reader instanceof FileReader)) {
				throw new Error('Expected file reader');
			}

			props.onFileLoad(reader);
		};
		reader.onerror = (ex) => {
			console.error(ex);
			alert('There was a problem reading the file.');
		};
		reader.readAsText(blob);
	}

	async function saveFile() {
		try {
			saveFileHandleRef.current = await props.onFileSave(
				saveFileHandleRef.current
			);
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
					Load
				</button>
			</div>

			<button
				className={styles.space}
				disabled={props.isSaveDisabled}
				onClick={saveFile}
				type="button"
			>
				Save
			</button>

			<CommonDataSaveTimestamp lastSaveTime={props.lastSaveTime} />
		</div>
	);
}

// @flow strict

import CustomFileInput from '../CustomFileInput';
import type {LevelType} from '../types/LevelType';

import styles from './DataSelector.module.css';

type Props = $ReadOnly<{
	levels: ?{[levelId: string]: LevelType},
	onNewLevelsLoad: ({[levelId: string]: LevelType}) => mixed,
}>;

export default function DataSelector(props: Props): React$Node {
	function onChange(ev: SyntheticEvent<HTMLInputElement>) {
		const fileInput = ev.currentTarget;
		if (fileInput.files && fileInput.files[0]) {
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
			reader.readAsText(fileInput.files[0]);
		}
	}

	function saveFile() {
		const body = document.body;
		if (!body) {
			throw new Error('Document is not ready');
		}

		const blob = new Blob([JSON.stringify(props.levels)], {
			// must be this type to ensure no file extension
			type: 'application/octet-stream',
		});
		const url = window.URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.href = url;
		link.download = 'level_data';
		// Firefox requires link to be inserted in <body> before clicking
		// https://stackoverflow.com/a/27116581
		body.appendChild(link);
		link.click();
		link.remove();

		window.URL.revokeObjectURL(blob);
	}

	return (
		<>
			<div className={styles.space}>
				<CustomFileInput onChange={onChange}>
					<button type="submit" tabIndex={-1}>
						Load custom level_data
					</button>
				</CustomFileInput>
			</div>

			<button disabled={props.levels == null} type="button" onClick={saveFile}>
				Save
			</button>
		</>
	);
}

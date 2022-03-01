// @flow strict

import CustomFileInput from '../CustomFileInput';
import type {LevelType} from '../types/LevelType';

type Props = $ReadOnly<{
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

	return (
		<>
			<CustomFileInput onChange={onChange}>
				<button type="submit">Load custom level_data</button>
			</CustomFileInput>
		</>
	);
}

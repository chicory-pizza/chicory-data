// @flow strict

import {useRef} from 'react';

type Props = $ReadOnly<{
	buttonProps: {...},
	label: string,
	onFileSave: (
		existingHandle: ?FileSystemFileHandle
	) => Promise<?FileSystemFileHandle>,
}>;

export default function CommonDataSaveButton(props: Props): React$Node {
	const saveFileHandleRef = useRef<?FileSystemFileHandle>(null);

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
		<button {...props.buttonProps} onClick={saveFile} type="button">
			{props.label}
		</button>
	);
}

// @flow strict

import {useRef} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';

import getCtrlKeyboardModifier from '../util/getCtrlKeyboardModifier';

type Props = $ReadOnly<{
	buttonProps: {
		disabled?: boolean,
		...
	},
	label: string,
	onFileSave: (
		existingHandle: ?FileSystemFileHandle
	) => Promise<?FileSystemFileHandle>,
}>;

export default function CommonDataSaveButton(props: Props): React$Node {
	useHotkeys(getCtrlKeyboardModifier() + '+s', saveFile, {
		enabled:
			props.buttonProps.disabled == null ||
			props.buttonProps.disabled === false,
		preventDefault: true,
	});

	const saveFileHandleRef = useRef<?FileSystemFileHandle>(null);

	async function saveFile() {
		try {
			saveFileHandleRef.current = await props.onFileSave(
				saveFileHandleRef.current
			);
		} catch (ex) {
			if (!(ex instanceof Error) || ex.name !== 'AbortError') {
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

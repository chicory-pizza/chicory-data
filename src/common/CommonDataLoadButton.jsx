// @flow strict

import {fileOpen} from 'browser-fs-access';
import {useHotkeys} from 'react-hotkeys-hook';

import getCtrlKeyboardModifier from '../util/getCtrlKeyboardModifier';
import isMac from '../util/isMac';

type Props = $ReadOnly<{
	onFileLoad: (reader: FileReader) => mixed,
}>;

export default function CommonDataLoadButton(props: Props): React$MixedElement {
	useHotkeys(getCtrlKeyboardModifier() + '+o', openFile, {
		preventDefault: true,
	});

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

	return (
		<button
			onClick={openFile}
			title={isMac() ? 'Command-O' : 'Ctrl-O'}
			type="button"
		>
			Load
		</button>
	);
}

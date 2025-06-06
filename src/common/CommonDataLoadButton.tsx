import {Button, Tooltip} from '@mantine/core';
import {fileOpen} from 'browser-fs-access';
import {useHotkeys} from 'react-hotkeys-hook';

import getCtrlKeyboardModifier from '../util/getCtrlKeyboardModifier';
import isMac from '../util/isMac';

type Props = Readonly<{
	onFileLoad: (reader: FileReader) => void;
}>;

export default function CommonDataLoadButton(props: Props) {
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
		<Tooltip label={isMac() ? 'Command-O' : 'Ctrl-O'}>
			<Button onClick={openFile} variant="default">
				Load
			</Button>
		</Tooltip>
	);
}

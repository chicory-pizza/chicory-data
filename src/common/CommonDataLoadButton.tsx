import {Button, Tooltip} from '@mantine/core';
import {fileOpen} from 'browser-fs-access';
import {useHotkeys} from 'react-hotkeys-hook';

import getCtrlKeyboardModifier from '../util/getCtrlKeyboardModifier';
import isMac from '../util/isMac';

type Props = Readonly<{
	onFileLoad: (fileName: string, result: string) => void;
	text?: string;
}>;

export default function CommonDataLoadButton({
	onFileLoad,
	text = 'Load',
}: Props) {
	useHotkeys(getCtrlKeyboardModifier() + '+o', openFile, {
		preventDefault: true,
	});

	async function openFile() {
		const file = await fileOpen();

		const reader = new FileReader();
		reader.onload = (buffer) => {
			const reader = buffer.currentTarget;
			if (!(reader instanceof FileReader)) {
				throw new Error('Expected file reader');
			}

			if (typeof reader.result !== 'string') {
				throw new Error('Expected string from file reader');
			}

			onFileLoad(file.name, reader.result);
		};
		reader.onerror = (ex) => {
			console.error(ex);
			alert('There was a problem reading the file.');
		};
		reader.readAsText(file);
	}

	return (
		<Tooltip label={isMac() ? 'Command-O' : 'Ctrl-O'}>
			<Button onClick={openFile} variant="default">
				{text}
			</Button>
		</Tooltip>
	);
}

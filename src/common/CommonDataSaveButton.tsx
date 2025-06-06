import {Button, Tooltip} from '@mantine/core';
import {useRef} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';

import getCtrlKeyboardModifier from '../util/getCtrlKeyboardModifier';
import isMac from '../util/isMac';

type Props = Readonly<{
	buttonProps: Omit<
		React.ComponentProps<'button'>,
		'onClick' | 'title' | 'type'
	>;
	label: string;
	onFileSave: (
		existingHandle?: FileSystemFileHandle | null
	) => Promise<FileSystemFileHandle | null>;
}>;

export default function CommonDataSaveButton(props: Props) {
	useHotkeys(getCtrlKeyboardModifier() + '+s', saveFile, {
		enabled:
			props.buttonProps.disabled == null ||
			props.buttonProps.disabled === false,
		preventDefault: true,
	});

	const saveFileHandleRef = useRef<FileSystemFileHandle>(null);

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
		<Tooltip label={isMac() ? 'Command-S' : 'Ctrl-S'}>
			<Button {...props.buttonProps} onClick={saveFile} variant="default">
				{props.label}
			</Button>
		</Tooltip>
	);
}

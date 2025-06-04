import {Button} from '@mantine/core';
import {encode} from 'base64-arraybuffer';
import {fileOpen} from 'browser-fs-access';
import {deflate} from 'pako';

type Props = Readonly<{
	onEditProperty: (key: string, value: string) => void;
	propertyKey: string;
	value: string | undefined;
}>;

export default function PropertyImageBufferInput({
	onEditProperty,
	propertyKey,
	value,
}: Props) {
	async function openFile() {
		const blob = await fileOpen({
			extensions: ['.png'],
			description: 'PNG image',
		});

		const reader = new FileReader();
		reader.onload = (buffer: ProgressEvent) => {
			const reader = buffer.currentTarget;
			if (
				!(reader instanceof FileReader) ||
				!(reader.result instanceof ArrayBuffer)
			) {
				throw new Error();
			}

			onEditProperty(propertyKey, encode(deflate(reader.result)));
		};
		reader.onerror = (ex) => {
			console.error(ex);
			alert('There was a problem loading the image.');
		};
		reader.readAsArrayBuffer(blob);
	}

	function remove() {
		onEditProperty(propertyKey, '');
	}

	return (
		<>
			<Button onClick={openFile} variant="default">
				Open image
			</Button>

			{value != null && value !== '' ? (
				<Button onClick={remove} variant="default">
					Remove
				</Button>
			) : null}
		</>
	);
}

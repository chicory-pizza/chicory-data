// @flow strict

import {encode} from 'base64-arraybuffer';
import {fileOpen} from 'browser-fs-access';
import {deflate} from 'pako';

type Props = $ReadOnly<{
	onEditProperty: (key: string, value: string) => mixed,
	propertyKey: string,
	value: string,
}>;

export default function PropertyImageBufferInput({
	onEditProperty,
	propertyKey,
	value,
}: Props): React$Node {
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

			// $FlowFixMe[incompatible-call]
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
			<button onClick={openFile} type="button">
				Open image
			</button>

			{value != null && value !== '' ? (
				<button onClick={remove} type="button">
					Remove
				</button>
			) : null}
		</>
	);
}

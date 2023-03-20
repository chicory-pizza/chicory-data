// @flow strict

import {fileOpen} from 'browser-fs-access';

type Props = $ReadOnly<{
	onFileLoad: (dataUrl: string) => mixed,
}>;

export default function DogEditorFileInput(props: Props): React$Node {
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
				typeof reader.result !== 'string'
			) {
				throw new Error();
			}

			props.onFileLoad(reader.result);
		};
		reader.onerror = (ex) => {
			console.error(ex);
			alert('There was a problem loading the image.');
		};
		reader.readAsDataURL(blob);
	}

	return (
		<button onClick={openFile} type="button">
			Open image
		</button>
	);
}

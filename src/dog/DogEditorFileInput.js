// @flow strict

// $FlowFixMe[untyped-import]
import {fileOpen} from 'browser-fs-access';

type Props = $ReadOnly<{
	onFileLoad: (img: Image) => mixed,
}>;

export default function DogEditorFileInput(props: Props): React$Node {
	async function openFile() {
		const blob = await fileOpen({
			extensions: ['.png'],
		});

		const img = new Image();
		img.onload = () => {
			props.onFileLoad(img);
		};
		img.onerror = () => {
			alert('There was a problem loading the image');
		};
		img.src = URL.createObjectURL(blob);
	}

	return (
		<button type="button" onClick={openFile}>
			Load image
		</button>
	);
}

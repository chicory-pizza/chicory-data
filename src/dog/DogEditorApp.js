// @flow strict

import {useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';

import styles from './DogEditorApp.module.css';
import DogHairSelect from './DogHairSelect';
import DogPreview from './DogPreview';

export default function DogEditorApp(): React$Node {
	const [clothes, setClothes] = useState('Overalls');
	const [hat, setHat] = useState('Bandana');
	const [hair, setHair] = useState('Simple');

	// Previews
	const [previewHair, setPreviewHair] = useState<?string>(null);

	return (
		<div className={styles.root}>
			<ErrorBoundary>
				<DogPreview
					clothes={clothes}
					clothesColor="#00F3DD"
					hat={hat}
					hatColor="#B69AFF"
					hair={previewHair ?? hair}
					skinColor="#FFA894"
				/>

				<div>
					Hair:{' '}
					<DogHairSelect
						onChange={setHair}
						onPreviewChange={setPreviewHair}
						value={hair}
					/>
				</div>
			</ErrorBoundary>
		</div>
	);
}

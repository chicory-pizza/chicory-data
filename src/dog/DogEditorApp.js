// @flow strict

import {useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';

import DogClothesSelect from './DogClothesSelect';
import styles from './DogEditorApp.module.css';
import DogHairSelect from './DogHairSelect';
import DogPreview from './DogPreview';

export default function DogEditorApp(): React$Node {
	const [clothes, setClothes] = useState('Overalls');
	const [hat, setHat] = useState('Bandana');
	const [hair, setHair] = useState('Simple');

	// Previews
	const [previewClothes, setPreviewClothes] = useState<?string>(null);
	const [previewHair, setPreviewHair] = useState<?string>(null);

	return (
		<div className={styles.root}>
			<ErrorBoundary>
				<DogPreview
					clothes={previewClothes ?? clothes}
					clothesColor="#00F3DD"
					hat={hat}
					hatColor="#B69AFF"
					hair={previewHair ?? hair}
					skinColor="#FFA894"
				/>

				<div style={{display: 'flex'}}>
					<div style={{width: 300}}>
						Clothes:{' '}
						<DogClothesSelect
							onChange={setClothes}
							onPreviewChange={setPreviewClothes}
							value={clothes}
						/>
					</div>

					<div style={{width: 300}}>
						Hair:{' '}
						<DogHairSelect
							onChange={setHair}
							onPreviewChange={setPreviewHair}
							value={hair}
						/>
					</div>
				</div>
			</ErrorBoundary>
		</div>
	);
}

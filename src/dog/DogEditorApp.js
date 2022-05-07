// @flow strict

import {useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';

import DogClothesSelect from './DogClothesSelect';
import styles from './DogEditorApp.module.css';
import DogHairSelect from './DogHairSelect';
import DogHatSelect from './DogHatSelect';
import DogPreview from './DogPreview';

export default function DogEditorApp(): React$Node {
	const [clothes, setClothes] = useState('Overalls');
	const [hat, setHat] = useState('Bandana');
	const [hair, setHair] = useState('Simple (default)');

	const [clothesColor, setClothesColor] = useState('#FFFFFF');
	const [hatColor, setHatColor] = useState('#FFFFFF');
	const [skinColor, setSkinColor] = useState('#FFFFFF');

	// Previews
	const [previewClothes, setPreviewClothes] = useState<?string>(null);
	const [previewHat, setPreviewHat] = useState<?string>(null);
	const [previewHair, setPreviewHair] = useState<?string>(null);

	return (
		<div className={styles.root}>
			<ErrorBoundary>
				<DogPreview
					clothes={previewClothes ?? clothes}
					clothesColor={clothesColor}
					hat={previewHat ?? hat}
					hatColor={hatColor}
					hair={previewHair ?? hair}
					skinColor={skinColor}
				/>

				<div className={styles.code}>
					<code>
						/dog expression:normal clothes:{previewClothes ?? clothes} hat:
						{previewHat ?? hat} body_col:{skinColor} clothes_col:{clothesColor}{' '}
						hat_col:{hatColor}
					</code>
				</div>

				<div className={styles.flex}>
					<div className={styles.selector}>
						Clothes:{' '}
						<DogClothesSelect
							onChange={setClothes}
							onPreviewChange={setPreviewClothes}
							value={clothes}
						/>
						<input
							type="color"
							value={clothesColor}
							onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
								setClothesColor(ev.currentTarget.value);
							}}
						/>
					</div>

					<div className={styles.selector}>
						Hat:{' '}
						<DogHatSelect
							onChange={setHat}
							onPreviewChange={setPreviewHat}
							value={hat}
						/>
						<input
							type="color"
							value={hatColor}
							onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
								setHatColor(ev.currentTarget.value);
							}}
						/>
					</div>

					<div className={styles.selector}>
						Hair:{' '}
						<DogHairSelect
							onChange={setHair}
							onPreviewChange={setPreviewHair}
							value={hair}
						/>
					</div>

					<div className={styles.selector}>
						Skin:{' '}
						<input
							type="color"
							value={skinColor}
							onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
								setSkinColor(ev.currentTarget.value);
							}}
						/>
					</div>
				</div>
			</ErrorBoundary>
		</div>
	);
}

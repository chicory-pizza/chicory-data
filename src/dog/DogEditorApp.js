// @flow strict

import {useEffect, useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import AppHeader from '../header/AppHeader';
import changeDocumentTitle from '../util/changeDocumentTitle';

import DogChicorobotCode from './DogChicorobotCode';
import DogClothesSelect from './DogClothesSelect';
import styles from './DogEditorApp.module.css';
import DogHairSelect from './DogHairSelect';
import DogHatSelect from './DogHatSelect';
import DogPreview from './DogPreview';

export default function DogEditorApp(): React$Node {
	const [clothes, setClothes] = useState('Overalls');
	const [hat, setHat] = useState('Bandana');
	const [hair, setHair] = useState('Simple');

	const [clothesColor, setClothesColor] = useState('#FFFFFF');
	const [hatColor, setHatColor] = useState('#FFFFFF');
	const [skinColor, setSkinColor] = useState('#FFFFFF');
	const [skinOutlineColor, setSkinOutlineColor] = useState('#000000');

	// Previews
	const [previewClothes, setPreviewClothes] = useState<?string>(null);
	const [previewHat, setPreviewHat] = useState<?string>(null);
	const [previewHair, setPreviewHair] = useState<?string>(null);

	useEffect(() => {
		changeDocumentTitle('Drawdog maker');
	}, []);

	return (
		<div className={styles.root}>
			<AppHeader title="Drawdog maker" />

			<div className={styles.main}>
				<ErrorBoundary>
					<DogPreview
						clothes={previewClothes ?? clothes}
						clothesColor={clothesColor}
						hat={previewHat ?? hat}
						hatColor={hatColor}
						hair={previewHair ?? hair}
						height={750}
						skinColor={skinColor}
						skinOutlineColor={skinOutlineColor}
						width={750}
					/>

					<div className={styles.controls}>
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
							Skin fill:{' '}
							<input
								type="color"
								value={skinColor}
								onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
									setSkinColor(ev.currentTarget.value);
								}}
							/>
							<br />
							Skin outline:{' '}
							<input
								type="color"
								value={skinOutlineColor}
								onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
									setSkinOutlineColor(ev.currentTarget.value);
								}}
							/>
							<br />
						</div>
					</div>

					<div className={styles.chicorobot}>
						<ErrorBoundary>
							<DogChicorobotCode
								clothes={previewClothes ?? clothes}
								clothesColor={clothesColor}
								hat={previewHat ?? hat}
								hatColor={hatColor}
								skinColor={skinColor}
							/>
						</ErrorBoundary>
					</div>
				</ErrorBoundary>
			</div>
		</div>
	);
}

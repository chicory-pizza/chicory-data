// @flow strict

import {useCallback, useEffect, useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import AppHeader from '../header/AppHeader';
import changeDocumentTitle from '../util/changeDocumentTitle';

import DogChicorobotCode from './DogChicorobotCode';
import DogClothesSelect from './DogClothesSelect';
import styles from './DogEditorApp.module.css';
import DogEditorFileInput from './DogEditorFileInput';
import DogHairSelect from './DogHairSelect';
import DogHatSelect from './DogHatSelect';
import DogPreview from './DogPreview';
import {
	CUSTOM_CLOTHES_HEIGHT,
	CUSTOM_CLOTHES_WIDTH,
	CUSTOM_HAT_HEIGHT,
	CUSTOM_HAT_WIDTH,
} from './drawDogToCanvas';

export default function DogEditorApp(): React$Node {
	const [clothes, setClothes] = useState('Overalls');
	const [hat, setHat] = useState('Bandana');
	const [hair, setHair] = useState('Simple');

	const [clothesColor, setClothesColor] = useState('#FFFFFF');
	const [hatColor, setHatColor] = useState('#FFFFFF');
	const [skinColor, setSkinColor] = useState('#FFFFFF');
	const [skinOutlineColor, setSkinOutlineColor] = useState('#000000');

	const [customClothesImage, setCustomClothesImage] = useState<?Image>(null);
	const [customHatImage, setCustomHatImage] = useState<?Image>(null);

	// Previews
	const [previewClothes, setPreviewClothes] = useState<?string>(null);
	const [previewHat, setPreviewHat] = useState<?string>(null);
	const [previewHair, setPreviewHair] = useState<?string>(null);

	useEffect(() => {
		changeDocumentTitle('Drawdog maker');
	}, []);

	const onNewClothesImage = useCallback(
		(img: Image) => {
			// Free up any previous image
			window.URL.revokeObjectURL(customClothesImage?.src);

			if (img.width === CUSTOM_HAT_WIDTH && img.height === CUSTOM_HAT_HEIGHT) {
				alert(
					'It looks like you are loading a custom hat as the custom clothes, this is probably not what you intended'
				);

				window.URL.revokeObjectURL(img.src);
				return;
			}

			setCustomClothesImage(img);
			setClothes('Custom Tee');
		},
		[customClothesImage?.src]
	);

	const onNewHatImage = useCallback(
		(img: Image) => {
			// Free up any previous image
			window.URL.revokeObjectURL(customHatImage?.src);

			if (
				img.width === CUSTOM_CLOTHES_WIDTH &&
				img.height === CUSTOM_CLOTHES_HEIGHT
			) {
				alert(
					'It looks like you are loading custom clothes as the custom hat, this is probably not what you intended'
				);

				window.URL.revokeObjectURL(img.src);
				return;
			}

			setCustomHatImage(img);
			setHat('Custom Hat');
		},
		[customHatImage?.src]
	);

	return (
		<div className={styles.root}>
			<AppHeader title="Drawdog maker" />

			<div className={styles.main}>
				<ErrorBoundary>
					<div className={styles.dog}>
						<DogPreview
							clothes={previewClothes ?? clothes}
							clothesColor={clothesColor}
							customClothesImage={customClothesImage}
							customHatImage={customHatImage}
							hat={previewHat ?? hat}
							hatColor={hatColor}
							hair={previewHair ?? hair}
							height={750}
							skinColor={skinColor}
							skinOutlineColor={skinOutlineColor}
							width={750}
						/>
					</div>

					<div className={styles.controls}>
						<div className={styles.selector}>
							Clothes:{' '}
							<DogClothesSelect
								onChange={setClothes}
								onPreviewChange={setPreviewClothes}
								value={clothes}
							/>
						</div>

						<div className={styles.selector}>
							Color:{' '}
							<input
								type="color"
								value={clothesColor}
								onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
									setClothesColor(ev.currentTarget.value);
								}}
							/>
						</div>

						<div className={styles.selector}>
							Custom clothes:{' '}
							<DogEditorFileInput onFileLoad={onNewClothesImage} />
						</div>
					</div>

					<div className={styles.controls}>
						<div className={styles.selector}>
							Hat:{' '}
							<DogHatSelect
								onChange={setHat}
								onPreviewChange={setPreviewHat}
								value={hat}
							/>
						</div>

						<div className={styles.selector}>
							Color:{' '}
							<input
								type="color"
								value={hatColor}
								onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
									setHatColor(ev.currentTarget.value);
								}}
							/>
						</div>

						<div className={styles.selector}>
							Custom hat: <DogEditorFileInput onFileLoad={onNewHatImage} />
						</div>
					</div>

					<div className={styles.controls}>
						<div className={styles.selector}>
							Hair:{' '}
							<DogHairSelect
								onChange={setHair}
								onPreviewChange={setPreviewHair}
								value={hair}
							/>
						</div>
					</div>

					<div className={styles.controls}>
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

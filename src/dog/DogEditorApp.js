// @flow strict

import {useCallback, useEffect, useMemo, useReducer, useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import AppHeader from '../header/AppHeader';
import changeDocumentTitle from '../util/changeDocumentTitle';

import DogChicorobotCode from './DogChicorobotCode';
import DogClothesSelect from './DogClothesSelect';
import styles from './DogEditorApp.module.css';
import DogEditorFileInput from './DogEditorFileInput';
import DogEditorHatLayer from './DogEditorHatLayer';
import {reducer} from './DogEditorHatReducer';
import DogExpressionSelect from './DogExpressionSelect';
import DogHairSelect from './DogHairSelect';
import DogPreview from './DogPreview';
import DogSpeech from './DogSpeech';
import {
	CUSTOM_CLOTHES_HEIGHT,
	CUSTOM_CLOTHES_WIDTH,
	CUSTOM_HAT_HEIGHT,
	CUSTOM_HAT_WIDTH,
	SIZE,
} from './drawDogToCanvas';

export default function DogEditorApp(): React$Node {
	const [clothes, setClothes] = useState('Overalls');
	const [hatsState, dispatchHats] = useReducer(reducer, {
		hats: [
			{
				name: 'Bandana',
				color: '#FFFFFF',
				customImage: null,
				previewName: null,
			},
		],
	});
	const [hair, setHair] = useState('Simple');
	const [expression, setExpression] = useState('normal');

	const [clothesColor, setClothesColor] = useState('#FFFFFF');
	const [skinColor, setSkinColor] = useState('#FFFFFF');
	const [skinOutlineColor, setSkinOutlineColor] = useState('#000000');

	const [customClothesImage, setCustomClothesImage] = useState<?Image>(null);

	// Previews
	const [previewClothes, setPreviewClothes] = useState<?string>(null);
	const [previewHair, setPreviewHair] = useState<?string>(null);
	const [previewExpression, setPreviewExpression] = useState<?string>(null);

	const hatsInPreview = useMemo(() => {
		return hatsState.hats.map((hat) => {
			return {
				name: hat.previewName ?? hat.name,
				color: hat.color,
				customImage: hat.customImage,
			};
		});
	}, [hatsState]);

	useEffect(() => {
		changeDocumentTitle('Drawdog maker');
	}, []);

	const addNewHatLayer = useCallback(() => {
		dispatchHats({type: 'addNewLayer'});
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

	return (
		<div className={styles.root}>
			<AppHeader title="Drawdog maker" />

			<div className={styles.main}>
				<ErrorBoundary>
					<DogSpeech />

					<div className={styles.dog}>
						<ErrorBoundary canReload={true}>
							<DogPreview
								animation="idle"
								clothes={previewClothes ?? clothes}
								clothesColor={clothesColor}
								customClothesImage={customClothesImage}
								expression={previewExpression ?? expression}
								hats={hatsInPreview}
								hair={previewHair ?? hair}
								height={750}
								skinColor={skinColor}
								skinOutlineColor={skinOutlineColor}
								width={750}
							/>
						</ErrorBoundary>
					</div>

					<div className={styles.grid}>
						<div className={styles.label}>Clothes:</div>
						<div className={styles.select}>
							<DogClothesSelect
								onChange={setClothes}
								onPreviewChange={setPreviewClothes}
								value={clothes}
							/>
						</div>

						<div className={styles.controls}>
							<div className={styles.controlLabel}>Color:</div>
							<div className={styles.color}>
								<input
									type="color"
									value={clothesColor}
									onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
										setClothesColor(ev.currentTarget.value);
									}}
								/>
							</div>

							<div className={styles.controlLabel}>Custom clothes:</div>
							<DogEditorFileInput onFileLoad={onNewClothesImage} />
							<div className={styles.dimensions}>
								({CUSTOM_CLOTHES_WIDTH}×{CUSTOM_CLOTHES_HEIGHT} or {SIZE}×{SIZE}
								)
							</div>
						</div>

						{hatsState.hats.map((hat, index) => {
							return (
								<DogEditorHatLayer
									dispatchHats={dispatchHats}
									hat={hatsState.hats[index]}
									key={index}
									layer={index}
									totalHatsCount={hatsState.hats.length}
								/>
							);
						})}

						<div className={styles.addHatLayer}>
							<button onClick={addNewHatLayer} type="button">
								Add new hat layer
							</button>
						</div>
						<div />
						<div />

						<div className={styles.label}>Hair:</div>
						<div className={styles.select}>
							<DogHairSelect
								onChange={setHair}
								onPreviewChange={setPreviewHair}
								value={hair}
							/>
						</div>
						<div />

						<div className={styles.label}>Skin fill:</div>
						<div className={styles.select + ' ' + styles.controls}>
							<input
								type="color"
								value={skinColor}
								onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
									setSkinColor(ev.currentTarget.value);
								}}
							/>
						</div>
						<div />

						<div className={styles.label}>Skin outline:</div>
						<div className={styles.select + ' ' + styles.controls}>
							<input
								type="color"
								value={skinOutlineColor}
								onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
									setSkinOutlineColor(ev.currentTarget.value);
								}}
							/>
						</div>
						<div />

						<div className={styles.label}>Expression:</div>
						<div className={styles.select}>
							<DogExpressionSelect
								onChange={setExpression}
								onPreviewChange={setPreviewExpression}
								value={expression}
							/>
						</div>
						<div />
					</div>

					<div className={styles.chicorobot}>
						<ErrorBoundary>
							<DogChicorobotCode
								clothes={previewClothes ?? clothes}
								clothesColor={clothesColor}
								expression={previewExpression ?? expression}
								hat={hatsState.hats[0].previewName ?? hatsState.hats[0].name}
								hatColor={hatsState.hats[0].color}
								skinColor={skinColor}
							/>
						</ErrorBoundary>
					</div>
				</ErrorBoundary>
			</div>
		</div>
	);
}

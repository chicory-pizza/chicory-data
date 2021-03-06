// @flow strict

import {useCallback, useMemo, useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import MessageBox from '../common/MessageBox';
import isReducedMotion from '../util/isReducedMotion';

import DogChicorobotCode from './DogChicorobotCode';
import {useDogEditorContext} from './DogEditorContext';
import DogEditorHeader from './DogEditorHeader';
import styles from './DogEditorUI.module.css';
import DogPreview from './DogPreview';
import DogSpeech from './DogSpeech';
import {
	CUSTOM_CLOTHES_HEIGHT,
	CUSTOM_CLOTHES_WIDTH,
	CUSTOM_HAT_HEIGHT,
	CUSTOM_HAT_WIDTH,
	SIZE,
} from './drawDogToCanvas';
import type {ChosenHat} from './drawDogToCanvas';
import DogClothesSelect from './editor/DogClothesSelect';
import DogEditorFileInput from './editor/DogEditorFileInput';
import DogEditorHatLayer from './editor/DogEditorHatLayer';
import DogExpressionSelect from './editor/DogExpressionSelect';
import DogHairSelect from './editor/DogHairSelect';
import DogSpeechEditor from './editor/DogSpeechEditor.jsx';
import type {DrawdogPreset} from './presets/DrawdogPresets';

export default function DogEditorApp(): React$MixedElement {
	const {dispatch, dogState} = useDogEditorContext();
	const {
		clothes,
		clothesColor,
		customClothesImage,
		expression,
		hair,
		hats,
		skinColor,
		skinOutlineColor,
		speechFont,
		speechShowBubble,
		speechText,
	} = dogState;

	const [playAnimations, setPlayAnimations] = useState(!isReducedMotion());
	const [invertColors, setInvertColors] = useState(false);

	// Previews
	const [previewClothes, setPreviewClothes] = useState<?string>(null);
	const [previewExpression, setPreviewExpression] = useState<?string>(null);
	const [previewHair, setPreviewHair] = useState<?string>(null);
	const [previewHats, setPreviewHats] = useState<$ReadOnlyArray<?string>>([]);
	const [previewSpeechFont, setPreviewSpeechFont] = useState<?string>(null);

	const hatsInPreview: $ReadOnlyArray<ChosenHat> = useMemo(() => {
		return hats.map((hat, index) => {
			return {
				name: previewHats[index] ?? hat.name,
				color: hat.color,
				customImage: hat.customImage,
			};
		});
	}, [hats, previewHats]);

	// Chicorobot notices
	// Doing this for now until the editor state is moved to one reducer state
	const hasMultipleHatLayers = hats.length > 1;
	const hasNonBlackSkinOutlineColor = skinOutlineColor !== '#000000';
	const hasCustomClothes =
		clothes === 'Custom Tee' || previewClothes === 'Custom Tee';
	const hasCustomHat = hatsInPreview.some((hat) => hat.name === 'Custom Hat');
	const showChicorobotNotice =
		hasMultipleHatLayers ||
		hasNonBlackSkinOutlineColor ||
		hasCustomClothes ||
		hasCustomHat ||
		invertColors;

	const onHairChange = useCallback(
		(value: string) => {
			dispatch({
				type: 'setProperties',
				properties: {
					hair: value,
				},
			});
		},
		[dispatch]
	);

	const onExpressionChange = useCallback(
		(value: string) => {
			dispatch({
				type: 'setProperties',
				properties: {
					expression: value,
				},
			});
		},
		[dispatch]
	);

	const onClothesChange = useCallback(
		(value: string) => {
			dispatch({
				type: 'setProperties',
				properties: {
					clothes: value,
				},
			});
		},
		[dispatch]
	);

	const addNewHatLayer = useCallback(() => {
		dispatch({type: 'addNewHatLayer'});
	}, [dispatch]);

	const setHatPreviewName = useCallback(
		(layer: number, previewName: ?string) => {
			const newHats = [...previewHats];
			newHats[layer] = previewName;
			setPreviewHats(newHats);
		},
		[previewHats]
	);

	const onPresetSelect = useCallback(
		(preset: DrawdogPreset) => {
			dispatch({
				type: 'setProperties',
				properties: {
					clothes: preset.clothes,
					clothesColor: preset.clothesColor,
					customClothesImage: preset.customClothesImage,
					expression: preset.expression ?? 'normal',
					hair: preset.hair,
					hats: preset.hats,
					skinColor: preset.skinColor,
					skinOutlineColor: preset.skinOutlineColor ?? '#000000',
				},
			});
		},
		[dispatch]
	);

	const onNewClothesImage = useCallback(
		(dataUrl: string) => {
			const img = new Image();

			img.onload = () => {
				if (
					img.width === CUSTOM_HAT_WIDTH &&
					img.height === CUSTOM_HAT_HEIGHT
				) {
					alert(
						'It looks like you are loading a custom hat as the custom clothes, this is probably not what you intended.'
					);
					return;
				}

				dispatch({
					type: 'setProperties',
					properties: {
						clothes: 'Custom Tee',
						customClothesImage: dataUrl,
					},
				});
			};

			img.onerror = () => {
				alert('There was a problem loading the image.');
			};

			img.src = dataUrl;
		},
		[dispatch]
	);

	const onSpeechFontChange = useCallback(
		(value: string) => {
			dispatch({
				type: 'setProperties',
				properties: {
					speechFont: value,
				},
			});
		},
		[dispatch]
	);

	const onSpeechShowBubbleChange = useCallback(
		(value: boolean) => {
			dispatch({
				type: 'setProperties',
				properties: {
					speechShowBubble: value,
				},
			});
		},
		[dispatch]
	);

	const onSpeechTextChange = useCallback(
		(value: string) => {
			dispatch({
				type: 'setProperties',
				properties: {
					speechText: value,
				},
			});
		},
		[dispatch]
	);

	return (
		<div className={styles.root}>
			<DogEditorHeader hats={hatsInPreview} onPresetSelect={onPresetSelect} />

			<div className={styles.main}>
				<div
					className={
						styles.dogPreviewWithSpeech +
						' ' +
						(invertColors ? styles.invertColors : '')
					}
				>
					<ErrorBoundary canReload={true}>
						<div hidden={!speechShowBubble}>
							<DogSpeech
								font={previewSpeechFont ?? speechFont}
								text={speechText}
							/>
						</div>

						<div className={styles.dog}>
							<DogPreview
								animation="idle"
								canvasClassName={styles.dogPreviewCanvas}
								clothes={previewClothes ?? clothes}
								clothesColor={clothesColor}
								customClothesImage={customClothesImage}
								expression={previewExpression ?? expression}
								hats={hatsInPreview}
								hair={previewHair ?? hair}
								playAnimations={playAnimations}
								skinColor={skinColor}
								skinOutlineColor={skinOutlineColor}
							/>
						</div>
					</ErrorBoundary>
				</div>

				<div className={styles.editorControls}>
					<ErrorBoundary>
						<div className={styles.grid}>
							<div className={styles.label}>Skin fill:</div>
							<div className={styles.colorControl}>
								<input
									type="color"
									value={skinColor}
									onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
										dispatch({
											type: 'setProperties',
											properties: {
												skinColor: ev.currentTarget.value,
											},
										});
									}}
								/>
							</div>

							<div className={styles.label}>Skin outline:</div>
							<div className={styles.colorControl}>
								<input
									type="color"
									value={skinOutlineColor}
									onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
										dispatch({
											type: 'setProperties',
											properties: {
												skinOutlineColor: ev.currentTarget.value,
											},
										});
									}}
								/>
							</div>
						</div>

						<details className={styles.detailsGroup} open>
							<summary>Head</summary>

							<div className={styles.grid}>
								{hats.map((hat, index) => {
									return (
										<DogEditorHatLayer
											dispatch={dispatch}
											hat={hats[index]}
											key={index}
											layer={index}
											previewName={previewHats[index]}
											setPreviewName={setHatPreviewName}
											totalHatsCount={hats.length}
										/>
									);
								})}

								<div className={styles.fullWidthControl}>
									<button onClick={addNewHatLayer} type="button">
										Add new hat layer
									</button>
								</div>

								<div className={styles.label}>Hair:</div>
								<div className={styles.select}>
									<DogHairSelect
										onChange={onHairChange}
										onPreviewChange={setPreviewHair}
										value={hair}
									/>
								</div>
								<div />

								<div className={styles.label}>Expression:</div>
								<div className={styles.select}>
									<DogExpressionSelect
										onChange={onExpressionChange}
										onPreviewChange={setPreviewExpression}
										value={expression}
									/>
								</div>
								<div />
							</div>
						</details>

						<details className={styles.detailsGroup} open>
							<summary>Body</summary>

							<div className={styles.grid}>
								<div className={styles.label}>Clothes:</div>
								<div className={styles.select}>
									<DogClothesSelect
										onChange={onClothesChange}
										onPreviewChange={setPreviewClothes}
										value={clothes}
									/>
								</div>

								<div className={styles.clothesControls}>
									<div className={styles.controlLabel}>Color:</div>
									<div className={styles.color}>
										<input
											type="color"
											value={clothesColor}
											onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
												dispatch({
													type: 'setProperties',
													properties: {
														clothesColor: ev.currentTarget.value,
													},
												});
											}}
										/>
									</div>

									{clothes === 'Custom Tee' || customClothesImage != null ? (
										<>
											<div className={styles.controlLabel}>Custom clothes:</div>
											<DogEditorFileInput onFileLoad={onNewClothesImage} />
											<div className={styles.dimensions}>
												({CUSTOM_CLOTHES_WIDTH}??{CUSTOM_CLOTHES_HEIGHT} or{' '}
												{SIZE}??{SIZE})
											</div>
										</>
									) : null}
								</div>
							</div>
						</details>

						<details className={styles.detailsGroup} open>
							<summary>Speech bubble</summary>

							<DogSpeechEditor
								font={speechFont}
								onFontChange={onSpeechFontChange}
								onPreviewFontChange={setPreviewSpeechFont}
								onShowBubbleChange={onSpeechShowBubbleChange}
								onTextChange={onSpeechTextChange}
								previewFont={previewSpeechFont}
								showBubble={speechShowBubble}
								text={speechText}
							/>
						</details>

						<details className={styles.detailsGroup} open>
							<summary>Misc</summary>

							<div className={styles.checkbox}>
								<label>
									<input
										type="checkbox"
										checked={playAnimations}
										onChange={(ev) => {
											setPlayAnimations(ev.currentTarget.checked);
										}}
									/>
									Play animation
								</label>
							</div>

							<div className={styles.checkbox}>
								<label>
									<input
										type="checkbox"
										checked={invertColors}
										onChange={(ev) => {
											setInvertColors(ev.currentTarget.checked);
										}}
									/>
									Invert colors
								</label>
							</div>
						</details>

						<details className={styles.detailsGroup}>
							<summary>Chicorobot slash command</summary>

							<ErrorBoundary>
								<DogChicorobotCode
									clothes={previewClothes ?? clothes}
									clothesColor={clothesColor}
									expression={previewExpression ?? expression}
									hat={previewHats[0] ?? hats[0].name}
									hatColor={hats[0].color}
									hair={previewHair ?? hair}
									skinColor={skinColor}
								/>
							</ErrorBoundary>

							{showChicorobotNotice ? (
								<div className={styles.chicorobotNotices}>
									{hasCustomClothes ? (
										<MessageBox
											message={
												<>
													Custom clothes need to manually uploaded using{' '}
													<code>custom_clothes:</code>
												</>
											}
											type="INFO"
										/>
									) : null}

									{hasCustomHat ? (
										<MessageBox
											message={
												<>
													Custom hats need to manually uploaded using{' '}
													<code>custom_hat:</code>
												</>
											}
											type="INFO"
										/>
									) : null}

									{hasMultipleHatLayers ? (
										<MessageBox
											message="Multiple hat layers are not supported, only the 1st hat layer will be shown"
											type="INFO"
										/>
									) : null}

									{hasNonBlackSkinOutlineColor ? (
										<MessageBox
											message="Non-black skin outline colors are not supported"
											type="INFO"
										/>
									) : null}

									{invertColors ? (
										<MessageBox
											message="Inverted colors are not supported"
											type="INFO"
										/>
									) : null}
								</div>
							) : null}
						</details>
					</ErrorBoundary>
				</div>
			</div>
		</div>
	);
}

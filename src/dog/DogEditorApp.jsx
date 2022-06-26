// @flow strict

import {useCallback, useEffect, useMemo, useReducer, useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import MessageBox from '../common/MessageBox';
import changeDocumentTitle from '../util/changeDocumentTitle';
import useMobileViewport from '../util/useMobileViewport';

import DogChicorobotCode from './DogChicorobotCode';
import styles from './DogEditorApp.module.css';
import {reducer} from './DogEditorHatReducer';
import DogEditorHeader from './DogEditorHeader';
import DogPreview from './DogPreview';
import DogSpeech from './DogSpeech';
import {
	CUSTOM_CLOTHES_HEIGHT,
	CUSTOM_CLOTHES_WIDTH,
	CUSTOM_HAT_HEIGHT,
	CUSTOM_HAT_WIDTH,
	SIZE,
} from './drawDogToCanvas';
import DogClothesSelect from './editor/DogClothesSelect';
import DogEditorFileInput from './editor/DogEditorFileInput';
import DogEditorHatLayer from './editor/DogEditorHatLayer';
import DogExpressionSelect from './editor/DogExpressionSelect';
import DogHairSelect from './editor/DogHairSelect';
import DogSpeechEditor from './editor/DogSpeechEditor.jsx';
import type {DrawdogPreset} from './presets/DrawdogPresets';

export default function DogEditorApp(): React$Node {
	useMobileViewport();

	const [clothes, setClothes] = useState<string>('Overalls');
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
	const [hair, setHair] = useState<string>('Simple');
	const [expression, setExpression] = useState<string>('normal');

	const [clothesColor, setClothesColor] = useState<string>('#FFFFFF');
	const [skinColor, setSkinColor] = useState<string>('#FFFFFF');
	const [skinOutlineColor, setSkinOutlineColor] = useState<string>('#000000');

	const [customClothesImage, setCustomClothesImage] = useState<?string>(null);

	const [invertColors, setInvertColors] = useState(false);

	const [speechFont, setSpeechFont] = useState('Domigorgon');
	const [speechShowBubble, setSpeechShowBubble] = useState(true);
	const [speechText, setSpeechText] = useState('Hello!');

	// Previews
	const [previewClothes, setPreviewClothes] = useState<?string>(null);
	const [previewHair, setPreviewHair] = useState<?string>(null);
	const [previewExpression, setPreviewExpression] = useState<?string>(null);
	const [previewSpeechFont, setPreviewSpeechFont] = useState<?string>(null);

	const hatsInPreview = useMemo(() => {
		return hatsState.hats.map((hat) => {
			return {
				name: hat.previewName ?? hat.name,
				color: hat.color,
				customImage: hat.customImage,
			};
		});
	}, [hatsState]);

	// Chicorobot notices
	// Doing this for now until the editor state is moved to one reducer state
	const hasMultipleHatLayers = hatsState.hats.length > 1;
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

	useEffect(() => {
		changeDocumentTitle('Drawdog maker');
	}, []);

	const addNewHatLayer = useCallback(() => {
		dispatchHats({type: 'addNewLayer'});
	}, []);

	const onPresetSelect = useCallback((preset: DrawdogPreset) => {
		setClothes(preset.clothes);
		setClothesColor(preset.clothesColor);
		setCustomClothesImage(preset.customClothesImage);
		setExpression(preset.expression ?? 'normal');
		dispatchHats({
			type: 'replaceAllLayers',
			hats: preset.hats.map((hat) => {
				return {
					...hat,
					previewName: null,
				};
			}),
		});
		setHair(preset.hair);
		setSkinColor(preset.skinColor);
		setSkinOutlineColor(preset.skinOutlineColor ?? '#000000');
	}, []);

	const onNewClothesImage = useCallback((dataUrl: string) => {
		const img = new Image();

		img.onload = () => {
			if (img.width === CUSTOM_HAT_WIDTH && img.height === CUSTOM_HAT_HEIGHT) {
				alert(
					'It looks like you are loading a custom hat as the custom clothes, this is probably not what you intended.'
				);
				return;
			}

			setCustomClothesImage(dataUrl);
			setClothes('Custom Tee');
		};

		img.onerror = () => {
			alert('There was a problem loading the image.');
		};

		img.src = dataUrl;
	}, []);

	return (
		<div className={styles.root}>
			<DogEditorHeader
				clothes={clothes}
				clothesColor={clothesColor}
				customClothesImage={customClothesImage}
				expression={expression}
				hair={hair}
				hats={hatsInPreview}
				onPresetSelect={onPresetSelect}
				skinColor={skinColor}
				skinOutlineColor={skinOutlineColor}
			/>

			<div className={styles.main}>
				<div
					className={
						styles.dogPreviewWithSpeech +
						' ' +
						(invertColors ? styles.invertColors : '')
					}
				>
					<ErrorBoundary canReload={true}>
						<div className={!speechShowBubble ? styles.speechHidden : ''}>
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
								skinColor={skinColor}
								skinOutlineColor={skinOutlineColor}
							/>
						</div>
					</ErrorBoundary>
				</div>

				<div className={styles.editorControls}>
					<ErrorBoundary>
						<div className={styles.grid}>
							<div className={styles.label}>Clothes:</div>
							<div className={styles.select}>
								<DogClothesSelect
									onChange={setClothes}
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
											setClothesColor(ev.currentTarget.value);
										}}
									/>
								</div>

								<div className={styles.controlLabel}>Custom clothes:</div>
								<DogEditorFileInput onFileLoad={onNewClothesImage} />
								<div className={styles.dimensions}>
									({CUSTOM_CLOTHES_WIDTH}×{CUSTOM_CLOTHES_HEIGHT} or {SIZE}×
									{SIZE})
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

							<div className={styles.fullWidthControl}>
								<button onClick={addNewHatLayer} type="button">
									Add new hat layer
								</button>
							</div>

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
							<div className={styles.colorControl}>
								<input
									type="color"
									value={skinColor}
									onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
										setSkinColor(ev.currentTarget.value);
									}}
								/>
							</div>

							<div className={styles.label}>Skin outline:</div>
							<div className={styles.colorControl}>
								<input
									type="color"
									value={skinOutlineColor}
									onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
										setSkinOutlineColor(ev.currentTarget.value);
									}}
								/>
							</div>

							<div className={styles.label}>Expression:</div>
							<div className={styles.select}>
								<DogExpressionSelect
									onChange={setExpression}
									onPreviewChange={setPreviewExpression}
									value={expression}
								/>
							</div>
							<div />

							<div className={styles.fullWidthControl}>
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
						</div>

						<div className={styles.speechEditor}>
							<details open>
								<summary>Speech bubble</summary>

								<DogSpeechEditor
									font={speechFont}
									onFontChange={setSpeechFont}
									onPreviewFontChange={setPreviewSpeechFont}
									onShowBubbleChange={setSpeechShowBubble}
									onTextChange={setSpeechText}
									previewFont={previewSpeechFont}
									showBubble={speechShowBubble}
									text={speechText}
								/>
							</details>
						</div>

						<div className={styles.chicorobot}>
							<details>
								<summary>Chicorobot slash command</summary>

								<ErrorBoundary>
									<DogChicorobotCode
										clothes={previewClothes ?? clothes}
										clothesColor={clothesColor}
										expression={previewExpression ?? expression}
										hat={
											hatsState.hats[0].previewName ?? hatsState.hats[0].name
										}
										hatColor={hatsState.hats[0].color}
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
						</div>
					</ErrorBoundary>
				</div>
			</div>
		</div>
	);
}

import {Checkbox} from '@mantine/core';
import {useCallback, useMemo, useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import isReducedMotion from '../util/isReducedMotion';

import DogChicorobotCode from './DogChicorobotCode';
import DogChicorobotNotices from './DogChicorobotNotices';
import {useDogEditorContext} from './DogEditorContext';
import styles from './DogEditorUI.module.css';
import DogPlaydataGroup from './DogPlaydataGroup';
import DogSpeech from './DogSpeech';
import {
	CUSTOM_CLOTHES_HEIGHT,
	CUSTOM_CLOTHES_WIDTH,
	CUSTOM_HAT_HEIGHT,
	CUSTOM_HAT_WIDTH,
	SIZE,
} from './drawDogToCanvas';
import type {ChosenHat} from './drawDogToCanvas';
import DogEditorCustomHeadSkinModalLauncher from './editor/customImagePrompt/DogEditorCustomHeadSkinModalLauncher';
import DogClothesSelectMenu from './editor/DogClothesSelectMenu';
import DogClothesSelectModalLauncher from './editor/DogClothesSelectModalLauncher';
import DogEditorFileInput from './editor/DogEditorFileInput';
import DogEditorHatLayer from './editor/DogEditorHatLayer';
import DogExpressionSelectMenu from './editor/DogExpressionSelectMenu';
import DogExpressionSelectModalLauncher from './editor/DogExpressionSelectModalLauncher';
import DogHairSelectMenu from './editor/DogHairSelectMenu';
import DogHairSelectModalLauncher from './editor/DogHairSelectModalLauncher';
import DogSpeechEditor from './editor/DogSpeechEditor';
import DogEditorHeader from './header/DogEditorHeader';
import type {DrawdogPreset} from './presets/DrawdogPresets';
import DogPreviewWithAutoplayAnimation from './preview/DogPreviewWithAutoplayAnimation';

export default function DogEditorApp() {
	const {dispatch, dogState} = useDogEditorContext();
	const {
		bodyShow: showBody,
		clothes,
		clothesColor,
		customClothesImage,
		earColor,
		expression,
		hair,
		hasCustomEarColor,
		hats,
		headSkinImage,
		skinColor,
		skinOutlineColor,
		speechFont,
		speechShowBubble,
		speechText,
	} = dogState;

	const [playAnimations, setPlayAnimations] = useState(() => {
		return !isReducedMotion();
	});
	const [invertColors, setInvertColors] = useState(false);

	// Previews
	const [previewClothes, setPreviewClothes] = useState<string | null>(null);
	const [previewExpression, setPreviewExpression] = useState<string | null>(
		null
	);
	const [previewHair, setPreviewHair] = useState<string | null>(null);
	const [previewHats, setPreviewHats] = useState<ReadonlyArray<string | null>>(
		[]
	);
	const [previewSpeechFont, setPreviewSpeechFont] = useState<string | null>(
		null
	);

	const hatsInPreview: ReadonlyArray<ChosenHat> = useMemo(() => {
		return hats.map((hat, index) => {
			return {
				name: previewHats[index] ?? hat.name,
				color: hat.color,
				customImage: hat.customImage,
			};
		});
	}, [hats, previewHats]);

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
		(layer: number, previewName: string | null) => {
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
					earColor: preset.earColor ?? preset.skinColor,
					expression: preset.expression ?? 'normal',
					hair: preset.hair,
					hasCustomEarColor: preset.earColor != null,
					hats: preset.hats,
					headSkinImage: preset.headSkinImage,
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
			<ErrorBoundary>
				<DogEditorHeader hats={hatsInPreview} onPresetSelect={onPresetSelect} />
			</ErrorBoundary>
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
							<DogPreviewWithAutoplayAnimation
								animation="idle"
								canvasClassName={styles.dogPreviewCanvas}
								clothes={previewClothes ?? clothes}
								clothesColor={clothesColor}
								customClothesImage={customClothesImage}
								earColor={hasCustomEarColor ? earColor : skinColor}
								expression={previewExpression ?? expression}
								hair={previewHair ?? hair}
								hats={hatsInPreview}
								headSkinImage={headSkinImage}
								playAnimations={playAnimations}
								showBody={showBody}
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
									onChange={(ev) => {
										dispatch({
											type: 'setProperties',
											properties: {
												skinColor: ev.currentTarget.value,
											},
										});
									}}
									type="color"
									value={skinColor}
								/>
							</div>

							<div className={styles.label}>Skin outline:</div>
							<div className={styles.colorControl}>
								<input
									onChange={(ev) => {
										dispatch({
											type: 'setProperties',
											properties: {
												skinOutlineColor: ev.currentTarget.value,
											},
										});
									}}
									type="color"
									value={skinOutlineColor}
								/>
							</div>
						</div>

						<details open>
							<summary>Head</summary>

							<div className={styles.grid}>
								{hats.map((hat, index) => {
									return (
										<DogEditorHatLayer
											dispatch={dispatch}
											hat={hat}
											// We don't have unique IDs for hats :(
											// eslint-disable-next-line @eslint-react/no-array-index-key
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
									<div className={styles.selectMenu}>
										<DogHairSelectMenu
											onChange={onHairChange}
											onPreviewChange={setPreviewHair}
											value={hair}
										/>
									</div>
								</div>
								<div className={styles.selectModalLauncher}>
									<DogHairSelectModalLauncher onChange={onHairChange} />
								</div>

								<div className={styles.label}>Expression:</div>
								<div className={styles.select}>
									<div className={styles.selectMenu}>
										<DogExpressionSelectMenu
											onChange={onExpressionChange}
											onPreviewChange={setPreviewExpression}
											value={expression}
										/>
									</div>
								</div>
								<div className={styles.selectModalLauncher}>
									<DogExpressionSelectModalLauncher
										onChange={onExpressionChange}
									/>
								</div>

								<div className={styles.label}>Head skin:</div>
								<div className={styles.select}>
									<DogEditorCustomHeadSkinModalLauncher />
								</div>

								<div className={styles.fullWidthControl}>
									<Checkbox
										checked={hasCustomEarColor}
										label="Use custom ear color"
										onChange={(ev) => {
											dispatch({
												type: 'setProperties',
												properties: {
													earColor:
														earColor === '#ffffff' ? skinColor : earColor,
													hasCustomEarColor: ev.currentTarget.checked,
												},
											});
										}}
									/>
								</div>

								{hasCustomEarColor ? (
									<>
										<div className={styles.label}>Ear color:</div>
										<div className={styles.colorControl}>
											<input
												onChange={(ev) => {
													dispatch({
														type: 'setProperties',
														properties: {
															earColor: ev.currentTarget.value,
														},
													});
												}}
												type="color"
												value={earColor}
											/>
										</div>
									</>
								) : null}
							</div>
						</details>

						<details open>
							<summary>Body</summary>

							<div className={styles.grid}>
								<div className={styles.fullWidthControl}>
									<Checkbox
										checked={showBody}
										label="Show body"
										onChange={(ev) => {
											dispatch({
												type: 'setProperties',
												properties: {
													bodyShow: ev.currentTarget.checked,
												},
											});
										}}
									/>
								</div>

								{showBody ? (
									<>
										<div className={styles.label}>Clothes:</div>
										<div className={styles.select}>
											<div className={styles.selectMenu}>
												<DogClothesSelectMenu
													onChange={onClothesChange}
													onPreviewChange={setPreviewClothes}
													value={clothes}
												/>
											</div>
										</div>

										<div className={styles.selectModalLauncher}>
											<DogClothesSelectModalLauncher
												onChange={onClothesChange}
											/>
										</div>

										<div className={styles.clothesControls}>
											<div className={styles.controlLabel}>Color:</div>
											<div className={styles.color}>
												<input
													onChange={(ev) => {
														dispatch({
															type: 'setProperties',
															properties: {
																clothesColor: ev.currentTarget.value,
															},
														});
													}}
													type="color"
													value={clothesColor}
												/>
											</div>

											{clothes === 'Custom Tee' ||
											customClothesImage != null ? (
												<>
													<div className={styles.controlLabel}>
														Custom clothes:
													</div>
													<DogEditorFileInput onFileLoad={onNewClothesImage} />
													<div className={styles.dimensions}>
														({CUSTOM_CLOTHES_WIDTH}×{CUSTOM_CLOTHES_HEIGHT} or{' '}
														{SIZE}×{SIZE})
													</div>
												</>
											) : null}
										</div>
									</>
								) : null}
							</div>
						</details>

						<details open>
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

						<details open>
							<summary>Misc</summary>

							<div className={styles.checkbox}>
								<Checkbox
									checked={playAnimations}
									label="Play animation"
									onChange={(ev) => {
										setPlayAnimations(ev.currentTarget.checked);
									}}
								/>
							</div>

							<div className={styles.checkbox}>
								<Checkbox
									checked={invertColors}
									label="Invert colors"
									onChange={(ev) => {
										setInvertColors(ev.currentTarget.checked);
									}}
								/>
							</div>
						</details>

						<details>
							<summary>Chicorobot slash command</summary>

							<ErrorBoundary>
								<DogChicorobotCode
									clothes={previewClothes ?? clothes}
									clothesColor={clothesColor}
									expression={previewExpression ?? expression}
									hair={previewHair ?? hair}
									hat={previewHats[0] ?? hats[0].name}
									hatColor={hats[0].color}
									skinColor={skinColor}
								/>
							</ErrorBoundary>

							<ErrorBoundary>
								<DogChicorobotNotices
									clothes={previewClothes ?? clothes}
									expression={previewExpression ?? expression}
									hasCustomEarColor={
										hasCustomEarColor && earColor !== skinColor
									}
									hasHeadSkinImage={headSkinImage != null}
									hats={hatsInPreview}
									invertColors={invertColors}
									skinOutlineColor={skinOutlineColor}
								/>
							</ErrorBoundary>
						</details>

						<ErrorBoundary>
							<DogPlaydataGroup
								clothes={previewClothes ?? clothes}
								clothesColor={clothesColor}
								earColor={
									hasCustomEarColor && earColor !== skinColor ? earColor : null
								}
								hair={previewHair ?? hair}
								hats={hatsInPreview}
								skinColor={skinColor}
								skinOutlineColor={skinOutlineColor}
							/>
						</ErrorBoundary>
					</ErrorBoundary>
				</div>
			</div>
		</div>
	);
}

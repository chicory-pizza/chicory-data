import {
	Accordion,
	Box,
	Button,
	Checkbox,
	Collapse,
	Flex,
	Stack,
} from '@mantine/core';
import {useMemo, useState} from 'react';

import CustomColorPicker from '../common/color/CustomColorPicker';
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

export default function DogEditorUI() {
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
	const [previewClothesColor, setPreviewClothesColor] = useState<string | null>(
		null,
	);
	const [previewEarColor, setPreviewEarColor] = useState<string | null>(null);
	const [previewExpression, setPreviewExpression] = useState<string | null>(
		null,
	);
	const [previewHair, setPreviewHair] = useState<string | null>(null);
	const [previewHatNames, setPreviewHatNames] = useState<
		ReadonlyArray<string | null>
	>([]);
	const [previewHatColors, setPreviewHatColors] = useState<
		ReadonlyArray<string | null>
	>([]);
	const [previewSkinColor, setPreviewSkinColor] = useState<string | null>();
	const [previewSkinOutlineColor, setPreviewSkinOutlineColor] = useState<
		string | null
	>();
	const [previewSpeechFont, setPreviewSpeechFont] = useState<string | null>(
		null,
	);

	const hatsInPreview: ReadonlyArray<ChosenHat> = useMemo(() => {
		return hats.map((hat, index) => {
			return {
				name: previewHatNames[index] ?? hat.name,
				color: previewHatColors[index] ?? hat.color,
				customImage: hat.customImage,
			};
		});
	}, [hats, previewHatColors, previewHatNames]);

	function onHairChange(value: string) {
		dispatch({
			type: 'setProperties',
			properties: {
				hair: value,
			},
		});
	}

	function onExpressionChange(value: string) {
		dispatch({
			type: 'setProperties',
			properties: {
				expression: value,
			},
		});
	}

	function onClothesChange(value: string) {
		dispatch({
			type: 'setProperties',
			properties: {
				clothes: value,
			},
		});
	}

	function addNewHatLayer() {
		dispatch({type: 'addNewHatLayer'});
	}

	function setHatPreviewColor(layer: number, previewColor: string | null) {
		const newHats = [...previewHatColors];
		newHats[layer] = previewColor;
		setPreviewHatColors(newHats);
	}

	function setHatPreviewName(layer: number, previewName: string | null) {
		const newHats = [...previewHatNames];
		newHats[layer] = previewName;
		setPreviewHatNames(newHats);
	}

	function onPresetSelect(preset: DrawdogPreset) {
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
	}

	function onNewClothesImage(dataUrl: string) {
		const img = new Image();

		img.onload = () => {
			if (img.width === CUSTOM_HAT_WIDTH && img.height === CUSTOM_HAT_HEIGHT) {
				alert(
					'It looks like you are loading a custom hat as the custom clothes, this is probably not what you intended.',
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
	}

	function onSpeechFontChange(value: string) {
		dispatch({
			type: 'setProperties',
			properties: {
				speechFont: value,
			},
		});
	}

	function onSpeechShowBubbleChange(value: boolean) {
		dispatch({
			type: 'setProperties',
			properties: {
				speechShowBubble: value,
			},
		});
	}

	function onSpeechTextChange(value: string) {
		dispatch({
			type: 'setProperties',
			properties: {
				speechText: value,
			},
		});
	}

	return (
		<div className={styles.root}>
			<ErrorBoundary>
				<DogEditorHeader onPresetSelect={onPresetSelect} />
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
								clothesColor={previewClothesColor ?? clothesColor}
								customClothesImage={customClothesImage}
								earColor={
									hasCustomEarColor
										? (previewEarColor ?? earColor)
										: (previewSkinColor ?? skinColor)
								}
								expression={previewExpression ?? expression}
								hair={previewHair ?? hair}
								hats={hatsInPreview}
								headSkinImage={headSkinImage}
								playAnimations={playAnimations}
								showBody={showBody}
								skinColor={previewSkinColor ?? skinColor}
								skinOutlineColor={previewSkinOutlineColor ?? skinOutlineColor}
							/>
						</div>
					</ErrorBoundary>
				</div>

				<div className={styles.editorControls}>
					<ErrorBoundary>
						<Flex mx="md">
							<div className={styles.grid}>
								<div className={styles.label}>Skin fill:</div>
								<div className={styles.colorControl}>
									<CustomColorPicker
										value={previewSkinColor ?? skinColor}
										onChange={(newColor) => {
											setPreviewSkinColor(null);

											if (newColor !== skinColor) {
												dispatch({
													type: 'setProperties',
													properties: {
														skinColor: newColor,
													},
												});
											}
										}}
										onPreviewChange={setPreviewSkinColor}
									/>
								</div>

								<div className={styles.label}>Skin outline:</div>
								<div className={styles.colorControl}>
									<CustomColorPicker
										value={previewSkinOutlineColor ?? skinOutlineColor}
										onChange={(newColor) => {
											setPreviewSkinOutlineColor(null);

											if (newColor !== skinOutlineColor) {
												dispatch({
													type: 'setProperties',
													properties: {
														skinOutlineColor: newColor,
													},
												});
											}
										}}
										onPreviewChange={setPreviewSkinOutlineColor}
									/>
								</div>
							</div>
						</Flex>

						<Accordion
							chevronPosition="left"
							defaultValue={['HEAD', 'BODY', 'SPEECH', 'MISC']}
							multiple={true}
							order={2}
						>
							<Accordion.Item value="HEAD">
								<Accordion.Control>Head</Accordion.Control>
								<Accordion.Panel>
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
													previewColor={hatsInPreview[index].color}
													previewName={hatsInPreview[index].name}
													setPreviewColor={setHatPreviewColor}
													setPreviewName={setHatPreviewName}
													totalHatsCount={hats.length}
												/>
											);
										})}

										<div className={styles.fullWidthControl}>
											<Button onClick={addNewHatLayer} variant="default">
												Add new hat layer
											</Button>
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
													<CustomColorPicker
														value={previewEarColor ?? earColor}
														onChange={(newColor) => {
															setPreviewEarColor(null);

															if (newColor !== earColor) {
																dispatch({
																	type: 'setProperties',
																	properties: {
																		earColor: newColor,
																	},
																});
															}
														}}
														onPreviewChange={setPreviewEarColor}
													/>
												</div>
											</>
										) : null}
									</div>
								</Accordion.Panel>
							</Accordion.Item>

							<Accordion.Item value="BODY">
								<Accordion.Control>Body</Accordion.Control>
								<Accordion.Panel>
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

									<Collapse expanded={showBody}>
										<Box className={styles.grid} mt="sm">
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

											<DogClothesSelectModalLauncher
												onChange={onClothesChange}
											/>

											<div className={styles.clothesControls}>
												<div className={styles.color}>
													<CustomColorPicker
														value={previewClothesColor ?? clothesColor}
														onChange={(newColor) => {
															setPreviewClothesColor(null);

															if (newColor !== clothesColor) {
																dispatch({
																	type: 'setProperties',
																	properties: {
																		clothesColor: newColor,
																	},
																});
															}
														}}
														onPreviewChange={setPreviewClothesColor}
													/>
												</div>

												{clothes === 'Custom Tee' ||
												customClothesImage != null ? (
													<>
														<div className={styles.controlLabel}>
															Custom clothes:
														</div>
														<DogEditorFileInput
															onFileLoad={onNewClothesImage}
														/>
														<div>
															({CUSTOM_CLOTHES_WIDTH.toString()}×
															{CUSTOM_CLOTHES_HEIGHT.toString()} or{' '}
															{SIZE.toString()}×{SIZE.toString()})
														</div>
													</>
												) : null}
											</div>
										</Box>
									</Collapse>
								</Accordion.Panel>
							</Accordion.Item>

							<Accordion.Item value="SPEECH">
								<Accordion.Control>Speech bubble</Accordion.Control>
								<Accordion.Panel>
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
								</Accordion.Panel>
							</Accordion.Item>

							<Accordion.Item value="MISC">
								<Accordion.Control>Misc</Accordion.Control>
								<Accordion.Panel>
									<Stack gap="sm">
										<Checkbox
											checked={playAnimations}
											label="Play animation"
											onChange={(ev) => {
												setPlayAnimations(ev.currentTarget.checked);
											}}
										/>

										<Checkbox
											checked={invertColors}
											label="Invert colors"
											onChange={(ev) => {
												setInvertColors(ev.currentTarget.checked);
											}}
										/>
									</Stack>
								</Accordion.Panel>
							</Accordion.Item>

							<Accordion.Item value="CHICOROBOT">
								<Accordion.Control>Chicorobot slash command</Accordion.Control>
								<Accordion.Panel>
									<ErrorBoundary>
										<DogChicorobotCode
											clothes={previewClothes ?? clothes}
											clothesColor={previewClothesColor ?? clothesColor}
											expression={previewExpression ?? expression}
											hair={previewHair ?? hair}
											hat={hatsInPreview[0].name ?? hats[0].name}
											hatColor={hatsInPreview[0].color ?? hats[0].color}
											skinColor={previewSkinColor ?? skinColor}
										/>
									</ErrorBoundary>

									<ErrorBoundary>
										<DogChicorobotNotices
											clothes={previewClothes ?? clothes}
											expression={previewExpression ?? expression}
											hasCustomEarColor={
												hasCustomEarColor &&
												(previewEarColor ?? earColor) !==
													(previewSkinColor ?? skinColor)
											}
											hasHeadSkinImage={headSkinImage != null}
											hats={hatsInPreview}
											invertColors={invertColors}
											skinOutlineColor={
												previewSkinOutlineColor ?? skinOutlineColor
											}
										/>
									</ErrorBoundary>
								</Accordion.Panel>
							</Accordion.Item>

							<Accordion.Item value="PLAYDATA">
								<Accordion.Control>Playdata JSON</Accordion.Control>
								<Accordion.Panel>
									<ErrorBoundary>
										<DogPlaydataGroup
											clothes={previewClothes ?? clothes}
											clothesColor={previewClothesColor ?? clothesColor}
											earColor={
												hasCustomEarColor &&
												(previewEarColor ?? earColor) !==
													(previewSkinColor ?? skinColor)
													? (previewEarColor ?? earColor)
													: null
											}
											hair={previewHair ?? hair}
											hats={hatsInPreview}
											skinColor={previewSkinColor ?? skinColor}
											skinOutlineColor={
												previewSkinOutlineColor ?? skinOutlineColor
											}
										/>
									</ErrorBoundary>
								</Accordion.Panel>
							</Accordion.Item>
						</Accordion>
					</ErrorBoundary>
				</div>
			</div>
		</div>
	);
}

import {Group, NumberInput, TextInput, Tooltip} from '@mantine/core';
import {useCallback, useState} from 'react';
import tinycolor from 'tinycolor2';

import convertBgrIntegerToRgb from '../util/convertBgrIntegerToRgb';
import convertHexToBgrInteger from '../util/convertHexToBgrInteger';
import convertRgbArrayToString from '../util/convertRgbArrayToString';

import styles from './ColorCalculator.module.css';

const HEX_CODE_REGEX = /^#?([0-9a-fA-F]{3}){1,2}$/;

function resetInputDrafts(colorObj: tinycolor.Instance): {
	hexCode: string;
	r: number | string;
	g: number | string;
	b: number | string;
	gml: number | string;
} {
	const hex = colorObj.toHexString();
	const rgb = colorObj.toRgb();

	return {
		hexCode: hex,
		r: rgb.r,
		g: rgb.g,
		b: rgb.b,
		gml: convertHexToBgrInteger(hex),
	};
}

type Props = Readonly<{
	currentColor: string; // e.g. #00f3dd
	setCurrentColor: (newColor: string) => void;
}>;

export default function ColorCalculator({
	currentColor,
	setCurrentColor,
}: Props) {
	const currentColorObj = tinycolor(currentColor);

	const [inputDrafts, setInputDrafts] = useState(() =>
		resetInputDrafts(currentColorObj)
	);

	const [prevColor, setPrevColor] = useState(currentColor);
	if (currentColor !== prevColor) {
		setPrevColor(currentColor);
		setInputDrafts((prevInputDrafts) => {
			const newDraft = resetInputDrafts(currentColorObj);

			// Special scenario where we are typing a 3-digit hex code (e.g. #abc)
			// which gets normalized to 6-digits
			const draftHexCode = prevInputDrafts.hexCode;
			if (draftHexCode !== currentColor && HEX_CODE_REGEX.test(draftHexCode)) {
				const draftHexColorObj = tinycolor(draftHexCode);
				if (draftHexColorObj.toHexString() === currentColorObj.toHexString()) {
					// Reuse the draft hex code, it will be normalized onBlur later
					newDraft.hexCode = draftHexCode;
				}
			}

			return newDraft;
		});
	}

	const onRgbInputChange = useCallback(
		(colorChange: {
			r?: string | number;
			g?: string | number;
			b?: string | number;
		}) => {
			const newColor = {
				r: colorChange.r ?? inputDrafts.r,
				g: colorChange.g ?? inputDrafts.g,
				b: colorChange.b ?? inputDrafts.b,
			};

			// Only set the new color if all 3 number inputs are valid
			if (
				typeof newColor.r === 'number' &&
				typeof newColor.g === 'number' &&
				typeof newColor.b === 'number'
			) {
				setCurrentColor(
					tinycolor({
						r: newColor.r,
						g: newColor.g,
						b: newColor.b,
					}).toHexString()
				);
			} else {
				setInputDrafts({
					...inputDrafts,
					...newColor,
				});
			}
		},
		[inputDrafts, setCurrentColor]
	);

	return (
		<Group gap="xs">
			<input
				onChange={(ev) => {
					setCurrentColor(ev.currentTarget.value);
				}}
				type="color"
				value={currentColor}
			/>

			<Tooltip label="Hex code (e.g. #00f3dd)">
				<TextInput
					classNames={{
						root: styles.textInputRoot,
						input: styles.textInput,
					}}
					data-testid="colorcalculator-hex"
					error={!HEX_CODE_REGEX.test(inputDrafts.hexCode)}
					label="Hex:"
					maxLength={7}
					onBlur={(ev) => {
						// Normalize hex code
						const value = ev.currentTarget.value;
						if (HEX_CODE_REGEX.test(value) && value !== currentColor) {
							setInputDrafts((inputDrafts) => ({
								...inputDrafts,
								hexCode: currentColor,
							}));
						}
					}}
					onChange={(ev) => {
						const value = ev.currentTarget.value;
						setInputDrafts((inputDrafts) => ({
							...inputDrafts,
							hexCode: value,
						}));

						if (HEX_CODE_REGEX.test(value)) {
							setCurrentColor(tinycolor(value).toHexString());
						}
					}}
					spellCheck={false}
					type="text"
					value={inputDrafts.hexCode}
				/>
			</Tooltip>

			<Group gap="4px" className={styles.label}>
				<span className={styles.rgbLabelText}>RGB:</span>

				<Tooltip label="Red (0 to 255)">
					<NumberInput
						allowDecimal={false}
						allowNegative={false}
						clampBehavior="strict"
						classNames={{
							input: styles.rgbInput,
						}}
						data-testid="colorcalculator-r"
						error={typeof inputDrafts.r !== 'number'}
						max={255}
						min={0}
						onChange={(value) => {
							onRgbInputChange({
								r: value,
							});
						}}
						stepHoldDelay={400}
						stepHoldInterval={100}
						value={inputDrafts.r}
					/>
				</Tooltip>

				<Tooltip label="Green (0 to 255)">
					<NumberInput
						allowDecimal={false}
						allowNegative={false}
						clampBehavior="strict"
						classNames={{
							input: styles.rgbInput,
						}}
						data-testid="colorcalculator-g"
						error={typeof inputDrafts.g !== 'number'}
						max={255}
						min={0}
						onChange={(value) => {
							onRgbInputChange({
								g: value,
							});
						}}
						stepHoldDelay={400}
						stepHoldInterval={100}
						value={inputDrafts.g}
					/>
				</Tooltip>

				<Tooltip label="Blue (0 to 255)">
					<NumberInput
						allowDecimal={false}
						allowNegative={false}
						clampBehavior="strict"
						classNames={{
							input: styles.rgbInput,
						}}
						data-testid="colorcalculator-b"
						error={typeof inputDrafts.b !== 'number'}
						max={255}
						min={0}
						onChange={(value) => {
							onRgbInputChange({
								b: value,
							});
						}}
						stepHoldDelay={400}
						stepHoldInterval={100}
						value={inputDrafts.b}
					/>
				</Tooltip>
			</Group>

			<NumberInput
				allowDecimal={false}
				allowNegative={false}
				clampBehavior="strict"
				classNames={{
					root: styles.textInputRoot,
					input: styles.textInput,
				}}
				data-testid="colorcalculator-gml"
				error={typeof inputDrafts.gml !== 'number'}
				hideControls
				label="GML:"
				maxLength={8}
				max={0xffffff}
				min={0}
				onChange={(value) => {
					setInputDrafts((inputDrafts) => ({
						...inputDrafts,
						gml: value,
					}));

					if (typeof value === 'number') {
						setCurrentColor(
							convertRgbArrayToString(convertBgrIntegerToRgb(value))
						);
					}
				}}
				step={0}
				value={convertHexToBgrInteger(currentColor)}
				withKeyboardEvents={false}
			/>
		</Group>
	);
}

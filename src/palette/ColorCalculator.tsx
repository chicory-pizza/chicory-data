import {Group, NumberInput, TextInput, Tooltip} from '@mantine/core';
import {useCallback} from 'react';
import tinycolor from 'tinycolor2';

import convertBgrIntegerToRgb from '../util/convertBgrIntegerToRgb';
import convertHexToBgrInteger from '../util/convertHexToBgrInteger';
import convertRgbArrayToString from '../util/convertRgbArrayToString';

import styles from './ColorCalculator.module.css';

type Props = Readonly<{
	color: string;
	setColor: (newColor: string) => void;
}>;

export default function ColorCalculator({color, setColor}: Props) {
	const currentRgb = tinycolor(color).toRgb();

	const setIndividualRgb = useCallback(
		(colorChange: {r?: number; g?: number; b?: number}) => {
			const newColor = tinycolor({
				r: colorChange.r ?? currentRgb.r,
				g: colorChange.g ?? currentRgb.g,
				b: colorChange.b ?? currentRgb.b,
			});

			setColor(newColor.toHexString());
		},
		[currentRgb.r, currentRgb.g, currentRgb.b, setColor]
	);

	return (
		<Group gap="xs">
			<input
				onChange={(ev) => {
					setColor(ev.currentTarget.value);
				}}
				type="color"
				value={color}
			/>

			<Tooltip label="Hex code (e.g. #00f3dd)">
				<TextInput
					classNames={{
						root: styles.textInputRoot,
						input: styles.textInput,
					}}
					data-testid="colorcalculator-hex"
					label="Hex:"
					maxLength={7}
					onChange={(ev) => {
						setColor(ev.currentTarget.value);
					}}
					placeholder="#00f3dd"
					spellCheck={false}
					type="text"
					value={color}
				/>
			</Tooltip>

			<Group gap="4px" className={styles.label}>
				<span className={styles.rgbLabelText}>RGB:</span>

				<Tooltip label="Red (0 to 255)">
					<NumberInput
						allowDecimal={false}
						allowNegative={false}
						clampBehavior="blur"
						classNames={{
							input: styles.rgbInput,
						}}
						data-testid="colorcalculator-r"
						max={255}
						min={0}
						onChange={(value) => {
							setIndividualRgb({
								r: typeof value === 'number' ? value : parseInt(value, 10),
							});
						}}
						value={currentRgb.r}
					/>
				</Tooltip>

				<Tooltip label="Green (0 to 255)">
					<NumberInput
						allowDecimal={false}
						allowNegative={false}
						clampBehavior="blur"
						classNames={{
							input: styles.rgbInput,
						}}
						data-testid="colorcalculator-g"
						max={255}
						min={0}
						onChange={(value) => {
							setIndividualRgb({
								g: typeof value === 'number' ? value : parseInt(value, 10),
							});
						}}
						value={currentRgb.g}
					/>
				</Tooltip>

				<Tooltip label="Blue (0 to 255)">
					<NumberInput
						allowDecimal={false}
						allowNegative={false}
						clampBehavior="blur"
						classNames={{
							input: styles.rgbInput,
						}}
						data-testid="colorcalculator-b"
						max={255}
						min={0}
						onChange={(value) => {
							setIndividualRgb({
								b: typeof value === 'number' ? value : parseInt(value, 10),
							});
						}}
						value={currentRgb.b}
					/>
				</Tooltip>
			</Group>

			<TextInput
				classNames={{
					root: styles.textInputRoot,
					input: styles.textInput,
				}}
				data-testid="colorcalculator-gml"
				inputMode="numeric"
				label="GML:"
				maxLength={8}
				min={0}
				onChange={(ev) => {
					setColor(
						convertRgbArrayToString(
							convertBgrIntegerToRgb(parseInt(ev.currentTarget.value, 10))
						)
					);
				}}
				spellCheck={false}
				placeholder="14545664"
				type="text"
				value={convertHexToBgrInteger(color)}
			/>
		</Group>
	);
}

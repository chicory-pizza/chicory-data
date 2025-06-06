import {Tooltip} from '@mantine/core';
import {useCallback, useState} from 'react';
import tinycolor from 'tinycolor2';

import convertBgrIntegerToRgb from '../util/convertBgrIntegerToRgb';
import convertHexToBgrInteger from '../util/convertHexToBgrInteger';
import convertRgbArrayToString from '../util/convertRgbArrayToString';

import styles from './ColorCalculator.module.css';

export default function ColorCalculator() {
	const [color, setColor] = useState('#00f3dd');

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
		[currentRgb.r, currentRgb.g, currentRgb.b]
	);

	return (
		<div className={styles.root}>
			<input
				onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
					setColor(ev.currentTarget.value);
				}}
				type="color"
				value={color}
			/>

			<label className={styles.label}>
				<span className={styles.labelText}>Hex:</span>

				<Tooltip label="Hex code (e.g. #00f3dd)">
					<input
						className={styles.textInput}
						data-testid="colorcalculator-hex"
						maxLength={7}
						onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
							setColor(ev.currentTarget.value);
						}}
						placeholder="#00f3dd"
						type="text"
						value={color}
					/>
				</Tooltip>
			</label>

			<span className={styles.label}>
				<span className={styles.labelText}>RGB:</span>

				<Tooltip label="Red (0 to 255)">
					<input
						className={styles.rgbInput}
						data-testid="colorcalculator-r"
						maxLength={3}
						max={255}
						min={0}
						onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
							setIndividualRgb({
								r: parseInt(ev.currentTarget.value, 10),
							});
						}}
						type="number"
						value={currentRgb.r}
					/>
				</Tooltip>

				<Tooltip label="Green (0 to 255)">
					<input
						className={styles.rgbInput}
						data-testid="colorcalculator-g"
						max={255}
						min={0}
						maxLength={3}
						onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
							setIndividualRgb({
								g: parseInt(ev.currentTarget.value, 10),
							});
						}}
						type="number"
						value={currentRgb.g}
					/>
				</Tooltip>

				<Tooltip label="Blue (0 to 255)">
					<input
						className={styles.rgbInput}
						data-testid="colorcalculator-b"
						max={255}
						min={0}
						maxLength={3}
						onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
							setIndividualRgb({
								b: parseInt(ev.currentTarget.value, 10),
							});
						}}
						type="number"
						value={currentRgb.b}
					/>
				</Tooltip>
			</span>

			<label className={styles.label}>
				<span className={styles.labelText}>GML:</span>

				<input
					className={styles.textInput}
					data-testid="colorcalculator-gml"
					inputMode="numeric"
					maxLength={8}
					min={0}
					onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
						setColor(
							convertRgbArrayToString(
								convertBgrIntegerToRgb(parseInt(ev.currentTarget.value, 10))
							)
						);
					}}
					placeholder="14545664"
					type="text"
					value={convertHexToBgrInteger(color)}
				/>
			</label>
		</div>
	);
}

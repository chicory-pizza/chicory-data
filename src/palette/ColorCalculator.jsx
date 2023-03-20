// @flow strict

import {useCallback, useState} from 'react';
// $FlowFixMe[untyped-import]
import tinycolor from 'tinycolor2';

import convertBgrIntegerToRgb from '../util/convertBgrIntegerToRgb';
import convertHexToBgrInteger from '../util/convertHexToBgrInteger';
import convertRgbArrayToString from '../util/convertRgbArrayToString';

import styles from './ColorCalculator.module.css';

export default function ColorCalculator(): React$Node {
	const [color, setColor] = useState('#00f3dd');

	const currentRgb = tinycolor(color).toRgb();

	const setIndividualRgb = useCallback(
		(colorChange: {r?: number, g?: number, b?: number}) => {
			const newColor = tinycolor({
				r: currentRgb.r,
				g: currentRgb.g,
				b: currentRgb.b,
				...colorChange,
			});

			setColor(newColor.toHexString());
		},
		[currentRgb.r, currentRgb.g, currentRgb.b]
	);

	return (
		<div className={styles.root}>
			<input
				onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
					setColor(ev.currentTarget.value);
				}}
				type="color"
				value={color}
			/>

			<label className={styles.label}>
				<span className={styles.labelText}>Hex:</span>

				<input
					className={styles.textInput}
					data-testid="colorcalculator-hex"
					maxLength={7}
					onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
						setColor(ev.currentTarget.value);
					}}
					placeholder="#00f3dd"
					title="Hex code (e.g. #00f3dd)"
					type="text"
					value={color}
				/>
			</label>

			<span className={styles.label}>
				<span className={styles.labelText}>RGB:</span>

				<input
					className={styles.rgbInput}
					data-testid="colorcalculator-r"
					maxLength={3}
					onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
						setIndividualRgb({
							r: parseInt(ev.currentTarget.value, 10),
						});
					}}
					title="Red (0 to 255)"
					type="number"
					value={currentRgb.r}
				/>
				<input
					className={styles.rgbInput}
					data-testid="colorcalculator-g"
					maxLength={3}
					onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
						setIndividualRgb({
							g: parseInt(ev.currentTarget.value, 10),
						});
					}}
					title="Green (0 to 255)"
					type="number"
					value={currentRgb.g}
				/>
				<input
					className={styles.rgbInput}
					data-testid="colorcalculator-b"
					maxLength={3}
					onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
						setIndividualRgb({
							b: parseInt(ev.currentTarget.value, 10),
						});
					}}
					title="Blue (0 to 255)"
					type="number"
					value={currentRgb.b}
				/>
			</span>

			<label className={styles.label}>
				<span className={styles.labelText}>GML:</span>

				<input
					className={styles.textInput}
					data-testid="colorcalculator-gml"
					inputMode="numeric"
					maxLength={8}
					onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
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

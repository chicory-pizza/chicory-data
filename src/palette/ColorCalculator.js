// @flow strict

import {useCallback, useState} from 'react';
// $FlowFixMe[untyped-import]
import tinycolor from 'tinycolor2';

import convertRgbArrayToString from '../levelEditor/util/convertRgbArrayToString';
import convertBgrIntegerToRgb from '../util/convertBgrIntegerToRgb';
import convertHexToBgrInteger from '../util/convertHexToBgrInteger';

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
				type="color"
				onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
					setColor(ev.currentTarget.value);
				}}
				value={color}
			/>

			<span className={styles.label}>
				Hex:
				<input
					type="text"
					className={styles.textInput}
					data-testid="colorcalculator-hex"
					maxLength={7}
					onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
						setColor(ev.currentTarget.value);
					}}
					placeholder="#00f3dd"
					value={color}
				/>
			</span>

			<span className={styles.label}>
				RGB:
				<input
					type="number"
					className={styles.rgbInput}
					data-testid="colorcalculator-r"
					maxLength={3}
					onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
						setIndividualRgb({
							r: parseInt(ev.currentTarget.value, 10),
						});
					}}
					value={currentRgb.r}
				/>
				<input
					type="number"
					className={styles.rgbInput}
					data-testid="colorcalculator-g"
					maxLength={3}
					onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
						setIndividualRgb({
							g: parseInt(ev.currentTarget.value, 10),
						});
					}}
					value={currentRgb.g}
				/>
				<input
					type="number"
					className={styles.rgbInput}
					data-testid="colorcalculator-b"
					maxLength={3}
					onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
						setIndividualRgb({
							b: parseInt(ev.currentTarget.value, 10),
						});
					}}
					value={currentRgb.b}
				/>
			</span>

			<span className={styles.label}>
				GML:
				<input
					type="text"
					inputMode="numeric"
					className={styles.textInput}
					data-testid="colorcalculator-gml"
					maxLength={8}
					onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
						setColor(
							convertRgbArrayToString(
								convertBgrIntegerToRgb(parseInt(ev.currentTarget.value, 10))
							)
						);
					}}
					placeholder="14545664"
					value={convertHexToBgrInteger(color)}
				/>
			</span>
		</div>
	);
}

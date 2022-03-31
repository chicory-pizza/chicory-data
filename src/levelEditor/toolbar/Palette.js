// @flow strict

import {PIXEL_COLORS, PIXEL_COLORS_LABELS} from '../GeoConstants';

import styles from './Palette.module.css';
import type {EditorToolType} from './types/EditorToolType';

type Props = $ReadOnly<{
	color: number,
	onColorChange: number,
	onModeSelect: EditorToolType,
}>;

export default function Palette(props: Props): React$Node {
	function onColorPick(e) {
		props.onColorChange(Number(e.target.id));
		props.onModeSelect('Paint');
	}

	return (
		<div>
			<div onChange={onColorPick}>
				{PIXEL_COLORS_LABELS.map((color, index) => {
					if (index === 6) {
						return PIXEL_COLORS_LABELS[6].colors.map((colorIndex, index) => {
							return (
								<label key={colorIndex}>
									<div
										className={
											styles.colorButton +
											' ' +
											(props.color === colorIndex ? styles.selected : '')
										}
									>
										<span
											className={styles.colorBox}
											style={{background: PIXEL_COLORS.get(colorIndex)}}
										></span>
										<input
											className={styles.radio}
											type="radio"
											id={colorIndex}
											name="color"
										/>
										Height {index}
									</div>
								</label>
							);
						});
					}
					return (
						<label key={color.colors[0]}>
							<div
								className={
									styles.colorButton +
									' ' +
									(props.color === color.colors[0] ? styles.selected : '')
								}
							>
								<span
									className={styles.colorBox}
									style={{background: PIXEL_COLORS.get(color.colors[0])}}
								></span>
								<input
									className={styles.radio}
									type="radio"
									id={color.colors[0]}
									name="color"
								/>
								{color.description}
							</div>
						</label>
					);
				})}
			</div>
		</div>
	);
}

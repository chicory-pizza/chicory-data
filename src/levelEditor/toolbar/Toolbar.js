// @flow strict

import Palette from './Palette.js';
import styles from './Toolbar.module.css';
import type {EditorToolType} from './types/EditorToolType';

type Props = $ReadOnly<{
	color: number,
	onColorChange: number,
	brushSize: number,
	onBrushSizeChange: number,
	mode: EditorToolType,
	onModeSelect: EditorToolType,
}>;

export default function Toolbar(props: Props): React$Node {
	function onModeButtonClick(e) {
		props.onModeSelect(e.target.value);
	}

	function onSliderChange(e) {
		props.onBrushSizeChange(e.target.value);
	}

	return (
		<div className={styles.toolbar}>
			<Palette
				color={props.color}
				onColorChange={props.onColorChange}
				onModeSelect={props.onModeSelect}
			/>
			<div>
				<button type="button" value="Paint" onClick={onModeButtonClick}>
					Paint
				</button>
				<button type="button" value="Select" onClick={onModeButtonClick}>
					Select
				</button>
			</div>
			<div>
				<label>
					<input type="text" value={props.brushSize} readOnly={true} />
					<input
						type="range"
						min="1"
						max="20"
						value={props.brushSize}
						onChange={onSliderChange}
					/>
				</label>
			</div>
		</div>
	);
}

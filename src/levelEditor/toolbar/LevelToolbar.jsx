// @flow strict

import {useHotkeys} from 'react-hotkeys-hook';

import SelectableButton from '../../common/SelectableButton';
import {
	EDITOR_UI_PIXEL_COLORS,
	PIXEL_COLORS_EXPLANATIONS,
	TOOLBAR_COLOR_LOOKUP,
} from '../GeoConstants';
import type {EditorToolType} from '../types/EditorToolType';

import styles from './LevelToolbar.module.css';

const MIN_BRUSH_SIZE = 1;
const MAX_BRUSH_SIZE = 20;

type Props = $ReadOnly<{
	onEditorToolTypeUpdate: (toolType: EditorToolType) => mixed,
	editorToolType: EditorToolType,
	onSelectPaintColor: (paintColor: number) => mixed,
	currentPaintColor: number,
	brushSize: number,
	onBrushSizeUpdate: (brushSize: number) => mixed,
}>;

export default function LevelToolbar(props: Props): React$Node {
	useHotkeys('v', () => props.onEditorToolTypeUpdate('SELECT'));
	useHotkeys('b', () => props.onEditorToolTypeUpdate('BRUSH'));
	useHotkeys('g', () => props.onEditorToolTypeUpdate('FILL'));
	useHotkeys('i', () => props.onEditorToolTypeUpdate('EYEDROPPER'));

	useHotkeys('[', () => {
		if (props.editorToolType === 'BRUSH') {
			props.onBrushSizeUpdate(Math.max(props.brushSize - 1, MIN_BRUSH_SIZE));
		}
	});
	useHotkeys(']', () => {
		if (props.editorToolType === 'BRUSH') {
			props.onBrushSizeUpdate(Math.min(props.brushSize + 1, MAX_BRUSH_SIZE));
		}
	});

	const toolTypes: Array<{type: EditorToolType, description: string}> = [
		{type: 'SELECT', description: 'Select (V)'},
		{type: 'BRUSH', description: 'Brush (B)'},
		{type: 'FILL', description: 'Fill (G)'},
		{type: 'EYEDROPPER', description: 'Eyedropper (I)'},
	];

	const colorDescription = TOOLBAR_COLOR_LOOKUP.get(props.currentPaintColor);

	return (
		<div className={styles.toolbar}>
			<div>
				Tools:
				<span className={styles.tools}>
					{toolTypes.map((toolType) => {
						return (
							<SelectableButton
								key={toolType.type}
								onClick={() => props.onEditorToolTypeUpdate(toolType.type)}
								selected={props.editorToolType === toolType.type}
							>
								{toolType.description}
							</SelectableButton>
						);
					})}
				</span>
			</div>

			<div className={props.editorToolType !== 'SELECT' ? '' : styles.hidden}>
				Current color:
				<div className={styles.colorContainer}>
					<span
						className={styles.colorDisplay}
						style={{
							background: EDITOR_UI_PIXEL_COLORS.get(props.currentPaintColor),
						}}
					/>
					{colorDescription != null ? colorDescription.description : 'N/A'}
				</div>
			</div>

			<div className={props.editorToolType === 'BRUSH' ? '' : styles.hidden}>
				Brush size: {props.brushSize}
				<input
					className={styles.range}
					max={MAX_BRUSH_SIZE}
					min={MIN_BRUSH_SIZE}
					onChange={(e) => {
						props.onBrushSizeUpdate(e.target.value);
					}}
					type="range"
					value={props.brushSize}
				/>
			</div>

			<div className={props.editorToolType !== 'SELECT' ? '' : styles.hidden}>
				Palette selection:
				{PIXEL_COLORS_EXPLANATIONS.map((color) => {
					return color.colors.map((colorIndex, arrayIndex) => {
						const colorDescription = TOOLBAR_COLOR_LOOKUP.get(colorIndex);
						let description = 'N/A';
						if (colorDescription != null) {
							description = colorDescription.description;
						}

						return (
							<SelectableButton
								className={styles.colorSelect}
								key={colorIndex}
								onClick={() => props.onSelectPaintColor(colorIndex)}
								selected={props.currentPaintColor === colorIndex}
							>
								<span
									className={styles.colorBox}
									style={{background: EDITOR_UI_PIXEL_COLORS.get(colorIndex)}}
								/>
								{description}
							</SelectableButton>
						);
					});
				})}
			</div>
		</div>
	);
}

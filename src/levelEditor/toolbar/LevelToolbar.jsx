// @flow strict

import {useEffect, useState} from 'react';
import SelectableButton from '../../common/SelectableButton';
import {
	PIXEL_COLORS,
	PIXEL_COLORS_EXPLANATIONS,
	TOOLBAR_COLOR_LOOKUP,
} from '../GeoConstants';
import type {ToolbarColorItem} from '../GeoConstants';
import type {EditorToolType} from '../types/EditorToolType';

import styles from './LevelToolbar.module.css';

type Props = $ReadOnly<{
	onEditorToolTypeUpdate: (toolType: EditorToolType) => mixed,
	editorToolType: EditorToolType,
	onSelectPaintColor: (paintColor: number) => mixed,
	currentPaintColor: number,
	brushSize: number,
	onBrushSizeUpdate: (brushSize: number) => mixed,
}>;

export default function LevelToolbar(props: Props): React$Node {
	const toolTypes = ['Select', 'Brush', 'Fill', 'Eyedropper'];

	const [colorDescription, setColorDescription] =
		useState<?ToolbarColorItem>(null);
	useEffect(() => {
		setColorDescription(TOOLBAR_COLOR_LOOKUP.get(props.currentPaintColor));
	}, [props.currentPaintColor]);

	return (
		<div className={styles.toolbar}>
			Tools:
			<span className={styles.tools}>
				{toolTypes.map((toolType, _) => {
					return (
						<SelectableButton
							key={toolType}
							selected={props.editorToolType === toolType}
							onClick={() => props.onEditorToolTypeUpdate(toolType)}
						>
							{toolType}
						</SelectableButton>
					);
				})}
			</span>
			<div>
				Current Color:
				<div className={styles.colorContainer}>
					<span
						className={styles.colorDisplay}
						style={{background: PIXEL_COLORS.get(props.currentPaintColor)}}
					/>
					{colorDescription != null ? colorDescription.description : 'N/A'}
				</div>
			</div>
			<div>
				Brush Size: <label>{props.brushSize}</label>
				<input
					type="range"
					min="1"
					max="20"
					value={props.brushSize}
					onChange={(e) => {
						props.onBrushSizeUpdate(e.target.value);
					}}
				/>
			</div>
			Palette Selection:
			{PIXEL_COLORS_EXPLANATIONS.map((color, _) => {
				return color.colors.map((colorIndex, arrayIndex) => {
					let description = color.description;
					if (description === 'Higher ground layers') {
						description = 'Height ' + arrayIndex;
					}

					return (
						<SelectableButton
							key={colorIndex}
							className={styles.colorSelect}
							selected={props.currentPaintColor === colorIndex}
							onClick={() => props.onSelectPaintColor(colorIndex)}
						>
							<span
								className={styles.colorBox}
								style={{background: PIXEL_COLORS.get(colorIndex)}}
							/>
							{description}
						</SelectableButton>
					);
				});
			})}
		</div>
	);
}

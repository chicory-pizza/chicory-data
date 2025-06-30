import {ActionIcon, Group, Slider, Tooltip} from '@mantine/core';
import {
	IconBrush,
	IconBucketDroplet,
	IconColorPicker,
	IconPointer,
} from '@tabler/icons-react';
import {memo} from 'react';
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

type Props = Readonly<{
	onEditorToolTypeUpdate: (toolType: EditorToolType) => void;
	editorToolType: EditorToolType;
	onSelectPaintColor: (paintColor: number) => void;
	currentPaintColor: number;
	brushSize: number;
	onBrushSizeUpdate: (brushSize: number) => void;
}>;

function LevelToolbar(props: Props) {
	useHotkeys('v', () => {
		props.onEditorToolTypeUpdate('SELECT');
	});
	useHotkeys('b', () => {
		props.onEditorToolTypeUpdate('BRUSH');
	});
	useHotkeys('g', () => {
		props.onEditorToolTypeUpdate('FILL');
	});
	useHotkeys('i', () => {
		props.onEditorToolTypeUpdate('EYEDROPPER');
	});

	useHotkeys(
		'[',
		() => {
			if (props.editorToolType === 'BRUSH') {
				props.onBrushSizeUpdate(Math.max(props.brushSize - 1, MIN_BRUSH_SIZE));
			}
		},
		{useKey: true}
	);
	useHotkeys(
		']',
		() => {
			if (props.editorToolType === 'BRUSH') {
				props.onBrushSizeUpdate(Math.min(props.brushSize + 1, MAX_BRUSH_SIZE));
			}
		},
		{useKey: true}
	);

	const toolTypes: Array<{
		type: EditorToolType;
		content: React.ReactNode;
		tooltip: string;
	}> = [
		{type: 'SELECT', content: <IconPointer size={24} />, tooltip: 'Select (V)'},
		{type: 'BRUSH', content: <IconBrush size={24} />, tooltip: 'Brush (B)'},
		{
			type: 'FILL',
			content: <IconBucketDroplet size={24} />,
			tooltip: 'Fill (G)',
		},
		{
			type: 'EYEDROPPER',
			content: <IconColorPicker size={24} />,
			tooltip: 'Eyedropper (I)',
		},
	];

	const colorDescription = TOOLBAR_COLOR_LOOKUP.get(props.currentPaintColor);

	return (
		<div className={styles.toolbar}>
			<Group justify="center">
				<ActionIcon.Group>
					{toolTypes.map((toolType) => {
						// SegmentedControl doesn't work well here :(
						return (
							<Tooltip
								key={toolType.type}
								label={toolType.tooltip}
								transitionProps={{transition: 'fade-up'}}
							>
								<ActionIcon
									onClick={() => {
										props.onEditorToolTypeUpdate(toolType.type);
									}}
									variant={
										props.editorToolType === toolType.type
											? 'filled'
											: 'default'
									}
									size="xl"
								>
									{toolType.content}
								</ActionIcon>
							</Tooltip>
						);
					})}
				</ActionIcon.Group>
			</Group>

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
				<Tooltip
					label="Press [ or ] to decrease or increase brush size"
					position="right"
					transitionProps={{transition: 'fade-right'}}
				>
					<Slider
						label={null}
						max={MAX_BRUSH_SIZE}
						min={MIN_BRUSH_SIZE}
						onChange={props.onBrushSizeUpdate}
						value={props.brushSize}
					/>
				</Tooltip>
			</div>

			<div className={props.editorToolType !== 'SELECT' ? '' : styles.hidden}>
				Palette selection:
				{PIXEL_COLORS_EXPLANATIONS.map((color) => {
					return color.colors.map((colorIndex) => {
						const colorDescription = TOOLBAR_COLOR_LOOKUP.get(colorIndex);
						let description = 'N/A';
						if (colorDescription != null) {
							description = colorDescription.description;
						}

						return (
							<SelectableButton
								className={styles.colorSelect}
								key={colorIndex}
								onClick={() => {
									props.onSelectPaintColor(colorIndex);
								}}
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

export default memo(LevelToolbar);

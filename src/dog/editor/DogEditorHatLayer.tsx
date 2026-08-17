import {ActionIcon, Tooltip} from '@mantine/core';
import {ArrowDownIcon} from '@phosphor-icons/react/dist/csr/ArrowDown';
import {ArrowUpIcon} from '@phosphor-icons/react/dist/csr/ArrowUp';
import {XIcon} from '@phosphor-icons/react/dist/csr/X';

import CustomColorPicker from '../../common/color/CustomColorPicker';
import type {ReducerAction} from '../DogEditorContext';
import type {ChosenHat} from '../drawDogToCanvas';

import DogCustomHatImageEditor from './customImage/DogCustomHatImageEditor';
import styles from './DogEditorHatLayer.module.css';
import DogHatSelectMenu from './DogHatSelectMenu';
import DogHatSelectModalLauncher from './DogHatSelectModalLauncher';

type Props = Readonly<{
	dispatch: (action: ReducerAction) => void;
	hat: ChosenHat;
	layer: number;
	previewColor: string | null;
	previewName: string | null;
	setPreviewColor: (layer: number, previewName: string | null) => void;
	setPreviewName: (layer: number, previewName: string | null) => void;
	totalHatsCount: number;
}>;

export default function DogEditorHatLayer({
	dispatch,
	hat,
	layer,
	previewColor,
	previewName,
	setPreviewColor,
	setPreviewName,
	totalHatsCount,
}: Props) {
	function onHatInfoChange(name: string) {
		if (hat.name === name) {
			return;
		}

		dispatch({
			type: 'setHatLayerProperties',
			layer,
			hat: {
				name,
			},
		});
	}

	function onPreviewNameChange(newPreviewName: string | null) {
		if (previewName === newPreviewName) {
			return;
		}

		setPreviewName(layer, newPreviewName);
	}

	function onPreviewColorChange(newPreviewColor: string | null) {
		if (previewColor === newPreviewColor) {
			return;
		}

		setPreviewColor(layer, newPreviewColor);
	}

	function moveLayerUp() {
		dispatch({
			type: 'moveHatLayerUp',
			layer,
		});
	}

	function moveLayerDown() {
		dispatch({
			type: 'moveHatLayerDown',
			layer,
		});
	}

	function deleteLayer() {
		dispatch({
			type: 'deleteHatLayer',
			layer,
		});
	}

	return (
		<>
			<div className={styles.label}>
				Hat
				{totalHatsCount > 1 ? ' (layer ' + (layer + 1).toString() + ')' : ''}:
			</div>

			<div className={styles.label}>
				{totalHatsCount > 1 ? (
					<ActionIcon.Group>
						<Tooltip label="Move this layer up">
							<ActionIcon
								disabled={layer === 0}
								onClick={moveLayerUp}
								size="input-sm"
								variant="default"
							>
								<ArrowUpIcon size="1em" />
							</ActionIcon>
						</Tooltip>

						<Tooltip label="Move this layer down">
							<ActionIcon
								disabled={totalHatsCount === layer + 1}
								onClick={moveLayerDown}
								size="input-sm"
								variant="default"
							>
								<ArrowDownIcon size="1em" />
							</ActionIcon>
						</Tooltip>

						<Tooltip label="Delete this layer">
							<ActionIcon
								onClick={deleteLayer}
								size="input-sm"
								variant="default"
							>
								<XIcon size="1em" />
							</ActionIcon>
						</Tooltip>
					</ActionIcon.Group>
				) : null}
			</div>

			<div className={styles.select}>
				<div className={styles.selectMenu}>
					<DogHatSelectMenu
						onChange={onHatInfoChange}
						onPreviewChange={onPreviewNameChange}
						value={hat.name}
					/>
				</div>
			</div>

			<DogHatSelectModalLauncher layer={layer} onChange={onHatInfoChange} />

			<div className={styles.controls}>
				<CustomColorPicker
					value={previewColor ?? hat.color}
					onChange={(newColor) => {
						onPreviewColorChange(null);

						if (newColor !== hat.color) {
							dispatch({
								type: 'setHatLayerProperties',
								layer,
								hat: {
									color: newColor,
								},
							});
						}
					}}
					onPreviewChange={onPreviewColorChange}
				/>

				{hat.name === 'Custom Hat' ? (
					<DogCustomHatImageEditor layer={layer} />
				) : null}
			</div>
		</>
	);
}

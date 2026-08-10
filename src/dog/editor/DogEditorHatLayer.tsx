import {ActionIcon, Tooltip} from '@mantine/core';
import {ArrowDownIcon} from '@phosphor-icons/react/dist/csr/ArrowDown';
import {ArrowUpIcon} from '@phosphor-icons/react/dist/csr/ArrowUp';
import {XIcon} from '@phosphor-icons/react/dist/csr/X';

import type {ReducerAction} from '../DogEditorContext';
import type {ChosenHat} from '../drawDogToCanvas';

import DogEditorCustomHatImageModalLauncher from './customImagePrompt/DogEditorCustomHatImageModalLauncher';
import styles from './DogEditorHatLayer.module.css';
import DogHatSelectMenu from './DogHatSelectMenu';
import DogHatSelectModalLauncher from './DogHatSelectModalLauncher';

type Props = Readonly<{
	dispatch: (action: ReducerAction) => void;
	hat: ChosenHat;
	layer: number;
	previewName: string | null;
	setPreviewName: (layer: number, previewName: string | null) => void;
	totalHatsCount: number;
}>;

export default function DogEditorHatLayer({
	dispatch,
	hat,
	layer,
	previewName,
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

	function onPreviewChange(newPreviewName: string | null) {
		if (previewName === newPreviewName) {
			return;
		}

		setPreviewName(layer, newPreviewName);
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
						onPreviewChange={onPreviewChange}
						value={hat.name}
					/>
				</div>
			</div>

			<div className={styles.selectModalLauncher}>
				<DogHatSelectModalLauncher layer={layer} onChange={onHatInfoChange} />
			</div>

			<div className={styles.controls}>
				<div>Color:</div>
				<div className={styles.color}>
					<input
						onChange={(ev) => {
							if (hat.color === ev.currentTarget.value) {
								return;
							}

							dispatch({
								type: 'setHatLayerProperties',
								layer,
								hat: {
									color: ev.currentTarget.value,
								},
							});
						}}
						type="color"
						value={hat.color}
					/>
				</div>

				{hat.name === 'Custom Hat' ? (
					<DogEditorCustomHatImageModalLauncher layer={layer} />
				) : null}
			</div>
		</>
	);
}

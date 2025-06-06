import {ActionIcon, Tooltip} from '@mantine/core';
import {IconArrowDown, IconArrowUp, IconX} from '@tabler/icons-react';
import {useCallback} from 'react';

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
	const onHatInfoChange = useCallback(
		(name: string) => {
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
		},
		[dispatch, hat, layer]
	);

	const onPreviewChange = useCallback(
		(newPreviewName: string | null) => {
			if (previewName === newPreviewName) {
				return;
			}

			setPreviewName(layer, newPreviewName);
		},
		[layer, previewName, setPreviewName]
	);

	const moveLayerUp = useCallback(() => {
		dispatch({
			type: 'moveHatLayerUp',
			layer,
		});
	}, [dispatch, layer]);

	const moveLayerDown = useCallback(() => {
		dispatch({
			type: 'moveHatLayerDown',
			layer,
		});
	}, [dispatch, layer]);

	const deleteLayer = useCallback(() => {
		dispatch({
			type: 'deleteHatLayer',
			layer,
		});
	}, [dispatch, layer]);

	return (
		<>
			<div className={styles.label}>
				<span className={styles.layerName}>
					Hat{totalHatsCount > 1 ? ' (layer ' + (layer + 1) + ')' : ''}:
				</span>
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
								<IconArrowUp size="1.1em" />
							</ActionIcon>
						</Tooltip>

						<Tooltip label="Move this layer down">
							<ActionIcon
								disabled={totalHatsCount === layer + 1}
								onClick={moveLayerDown}
								size="input-sm"
								variant="default"
							>
								<IconArrowDown size="1.1em" />
							</ActionIcon>
						</Tooltip>

						<Tooltip label="Delete this layer">
							<ActionIcon
								onClick={deleteLayer}
								size="input-sm"
								variant="default"
							>
								<IconX size="1.1em" />
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
						onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
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

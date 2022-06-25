// @flow strict

import {useCallback} from 'react';

import CloseIcon from '../../common/CloseIcon';
import type {
	ChosenHatWithPreview,
	HatReducerAction,
} from '../DogEditorHatReducer';
import {
	CUSTOM_CLOTHES_HEIGHT,
	CUSTOM_CLOTHES_WIDTH,
	CUSTOM_HAT_WIDTH,
	SIZE,
} from '../drawDogToCanvas';

import DogEditorFileInput from './DogEditorFileInput';
import styles from './DogEditorHatLayer.module.css';
import DogHatSelect from './DogHatSelect';

type Props = $ReadOnly<{
	dispatchHats: (action: HatReducerAction) => void,
	hat: ChosenHatWithPreview,
	layer: number,
	totalHatsCount: number,
}>;

export default function DogEditorHatLayer({
	dispatchHats,
	hat,
	layer,
	totalHatsCount,
}: Props): React$Node {
	const onHatInfoChange = useCallback(
		(name) => {
			if (hat.name === name) {
				return;
			}

			dispatchHats({
				type: 'setLayerProperties',
				layer,
				hat: {
					name,
				},
			});
		},
		[dispatchHats, hat, layer]
	);

	const onPreviewChange = useCallback(
		(previewName) => {
			if (hat.previewName === previewName) {
				return;
			}

			dispatchHats({
				type: 'setLayerProperties',
				layer,
				hat: {
					previewName,
				},
			});
		},
		[dispatchHats, hat, layer]
	);

	const moveLayerUp = useCallback(() => {
		dispatchHats({
			type: 'moveLayerUp',
			layer,
		});
	}, [dispatchHats, layer]);

	const moveLayerDown = useCallback(() => {
		dispatchHats({
			type: 'moveLayerDown',
			layer,
		});
	}, [dispatchHats, layer]);

	const deleteLayer = useCallback(() => {
		dispatchHats({
			type: 'deleteLayer',
			layer,
		});
	}, [dispatchHats, layer]);

	const onNewHatImage = useCallback(
		(dataUrl: string) => {
			const img = new Image();

			img.onload = () => {
				if (
					img.width === CUSTOM_CLOTHES_WIDTH &&
					img.height === CUSTOM_CLOTHES_HEIGHT
				) {
					alert(
						'It looks like you are loading custom clothes as the custom hat, this is probably not what you intended.'
					);
					return;
				}

				dispatchHats({
					type: 'setLayerProperties',
					layer,
					hat: {
						name: 'Custom Hat',
						customImage: dataUrl,
					},
				});
			};

			img.onerror = () => {
				alert('There was a problem loading the image.');
			};

			img.src = dataUrl;
		},
		[dispatchHats, layer]
	);

	return (
		<>
			<div className={styles.label}>
				<span className={styles.layerName}>
					Hat{totalHatsCount > 1 ? ' (layer ' + (layer + 1) + ')' : ''}:
				</span>
			</div>

			<div className={styles.label}>
				{totalHatsCount > 1 ? (
					<>
						<button
							className={styles.layerButton}
							disabled={layer === 0}
							onClick={moveLayerUp}
							title="Move this layer up"
							type="button"
						>
							↑
						</button>

						<button
							className={styles.layerButton}
							disabled={totalHatsCount === layer + 1}
							onClick={moveLayerDown}
							title="Move this layer down"
							type="button"
						>
							↓
						</button>

						<button
							className={styles.layerButton}
							onClick={deleteLayer}
							title="Delete this layer"
							type="button"
						>
							<CloseIcon color="#000" size="0.6em" />
						</button>
					</>
				) : null}
			</div>

			<div className={styles.select}>
				<DogHatSelect
					onChange={onHatInfoChange}
					onPreviewChange={onPreviewChange}
					value={hat.name}
				/>
			</div>

			<div className={styles.controls}>
				<div className={styles.controlLabel}>Color:</div>
				<div className={styles.color}>
					<input
						type="color"
						value={hat.color}
						onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
							if (hat.color === ev.currentTarget.value) {
								return;
							}

							dispatchHats({
								type: 'setLayerProperties',
								layer,
								hat: {
									color: ev.currentTarget.value,
								},
							});
						}}
					/>
				</div>

				<div className={styles.controlLabel}>Custom hat:</div>
				<DogEditorFileInput onFileLoad={onNewHatImage} />
				<div className={styles.dimensions}>
					({CUSTOM_HAT_WIDTH}×{CUSTOM_HAT_WIDTH} or {SIZE}×{SIZE})
				</div>
			</div>
		</>
	);
}

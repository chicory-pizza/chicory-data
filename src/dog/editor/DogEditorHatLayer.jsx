// @flow strict

import {useCallback} from 'react';

import CloseIcon from '../../common/icons/CloseIcon';
import type {ReducerAction} from '../DogEditorContext';
import {
	CUSTOM_CLOTHES_HEIGHT,
	CUSTOM_CLOTHES_WIDTH,
	CUSTOM_HAT_WIDTH,
	SIZE,
} from '../drawDogToCanvas';
import type {ChosenHat} from '../drawDogToCanvas';

import DogEditorFileInput from './DogEditorFileInput';
import styles from './DogEditorHatLayer.module.css';
import DogHatSelect from './DogHatSelect';

type Props = $ReadOnly<{
	dispatch: (action: ReducerAction) => void,
	hat: ChosenHat,
	layer: number,
	previewName: ?string,
	setPreviewName: (layer: number, previewName: ?string) => mixed,
	totalHatsCount: number,
}>;

export default function DogEditorHatLayer({
	dispatch,
	hat,
	layer,
	previewName,
	setPreviewName,
	totalHatsCount,
}: Props): React$MixedElement {
	const onHatInfoChange = useCallback(
		(name) => {
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
		(newPreviewName) => {
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

				dispatch({
					type: 'setHatLayerProperties',
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
		[dispatch, layer]
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
							<CloseIcon size="0.6em" />
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

							dispatch({
								type: 'setHatLayerProperties',
								layer,
								hat: {
									color: ev.currentTarget.value,
								},
							});
						}}
					/>
				</div>

				{hat.name === 'Custom Hat' ? (
					<>
						<div className={styles.controlLabel}>Custom hat:</div>
						<DogEditorFileInput onFileLoad={onNewHatImage} />
						<div className={styles.dimensions}>
							({CUSTOM_HAT_WIDTH}×{CUSTOM_HAT_WIDTH} or {SIZE}×{SIZE})
						</div>
					</>
				) : null}
			</div>
		</>
	);
}

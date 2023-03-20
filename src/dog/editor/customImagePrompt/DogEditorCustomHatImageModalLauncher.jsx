// @flow strict

import {useCallback, useState} from 'react';

import CustomModal from '../../../common/CustomModal';
import ErrorBoundary from '../../../common/ErrorBoundary';
import MessageBox from '../../../common/MessageBox';
import {useDogEditorContext} from '../../DogEditorContext';
import {
	CUSTOM_CLOTHES_HEIGHT,
	CUSTOM_CLOTHES_WIDTH,
	CUSTOM_HAT_HEIGHT,
	CUSTOM_HAT_WIDTH,
	SIZE,
} from '../../drawDogToCanvas';
import templateImage from '../../images/sprDog_head_0.png';
import DogPreview from '../../preview/DogPreview';
import convertDogEditorStateToDogPreview from '../convertDogEditorStateToDogPreview';
import DogEditorFileInput from '../DogEditorFileInput';

import styles from './DogEditorCustomHatImageModalLauncher.module.css';

type Props = $ReadOnly<{
	layer: number,
}>;

export default function DogEditorCustomHatImageModalLauncher({
	layer,
}: Props): React$MixedElement {
	const {dispatch, dogState} = useDogEditorContext();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const onModalRequestClose = useCallback(() => {
		setImageDataUrl(null);
		setErrorMessage(null);

		setIsModalOpen(false);
	}, []);

	const [imageDataUrl, setImageDataUrl] = useState<?string>(null);
	const [errorMessage, setErrorMessage] = useState<?string>(null);

	const onNewHatImage = useCallback((dataUrl: string) => {
		setImageDataUrl(null);
		setErrorMessage(null);

		const img = new Image();

		img.onload = () => {
			if (
				img.width === CUSTOM_CLOTHES_WIDTH &&
				img.height === CUSTOM_CLOTHES_HEIGHT
			) {
				setErrorMessage(
					'It looks like you are loading custom clothes as the custom hat, this is probably not what you intended.'
				);
				return;
			}

			setImageDataUrl(dataUrl);
		};

		img.onerror = () => {
			setErrorMessage('There was a problem loading the image.');
		};

		img.src = dataUrl;
	}, []);

	const onConfirmButtonClick = useCallback(() => {
		dispatch({
			type: 'setHatLayerProperties',
			layer,
			hat: {
				name: 'Custom Hat',
				customImage: imageDataUrl,
			},
		});

		onModalRequestClose();
	}, [dispatch, imageDataUrl, layer, onModalRequestClose]);

	return (
		<>
			<button onClick={() => setIsModalOpen(true)} type="button">
				Select image
			</button>

			<CustomModal
				isOpen={isModalOpen}
				onRequestClose={onModalRequestClose}
				titleText="Select custom hat image"
			>
				{isModalOpen ? (
					<ErrorBoundary>
						<p className={styles.explanation}>
							Save and use this template face to draw a custom hat.
						</p>

						<p className={styles.explanation}>
							Your exported image should be a PNG and have a resolution of{' '}
							{CUSTOM_HAT_WIDTH}×{CUSTOM_HAT_HEIGHT} or {SIZE}×{SIZE}.
						</p>

						<p className={styles.explanation}>
							Remember to hide the template face when exporting your final
							image.
						</p>

						<img
							alt="Custom hat template"
							className={styles.templateImage}
							height={CUSTOM_HAT_HEIGHT}
							src={templateImage}
							width={CUSTOM_HAT_WIDTH}
						/>

						<DogEditorFileInput onFileLoad={onNewHatImage} />

						{errorMessage != null ? (
							<div className={styles.errorMessage}>
								<MessageBox message={errorMessage} type="ERROR" />
							</div>
						) : null}

						{imageDataUrl != null ? (
							<div className={styles.previewArea}>
								<p className={styles.explanation}>
									Preview your custom hat, confirm if everything looks good.
								</p>

								<DogPreview
									{...convertDogEditorStateToDogPreview(dogState)}
									animation="idle"
									animationIndex={0}
									canvasClassName={styles.dogPreview}
									hats={dogState.hats
										.slice(0, layer)
										.concat({
											name: dogState.hats[layer].name,
											color: dogState.hats[layer].color,
											customImage: imageDataUrl,
										})
										.concat(dogState.hats.slice(layer + 1))}
									showBody={true}
								/>

								<button onClick={onConfirmButtonClick} type="button">
									Confirm
								</button>
							</div>
						) : null}
					</ErrorBoundary>
				) : null}
			</CustomModal>
		</>
	);
}

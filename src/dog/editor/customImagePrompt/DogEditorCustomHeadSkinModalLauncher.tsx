import {Button, Modal} from '@mantine/core';
import {useCallback, useState} from 'react';

import ErrorBoundary from '../../../common/ErrorBoundary';
import CloseIcon from '../../../common/icons/CloseIcon';
import MessageBox from '../../../common/MessageBox';
import {useDogEditorContext} from '../../DogEditorContext';
import {CUSTOM_HAT_HEIGHT, CUSTOM_HAT_WIDTH} from '../../drawDogToCanvas';
import templateImage from '../../images/sprDog_head_0.png';
import DogPreview from '../../preview/DogPreview';
import convertDogEditorStateToDogPreview from '../convertDogEditorStateToDogPreview';
import DogEditorFileInput from '../DogEditorFileInput';

import styles from './DogEditorCustomHeadSkinModalLauncher.module.css';

export default function DogEditorCustomHeadSkinModalLauncher() {
	const {dispatch, dogState} = useDogEditorContext();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const onModalRequestClose = useCallback(() => {
		setImageDataUrl(null);
		setErrorMessage(null);

		setIsModalOpen(false);
	}, []);

	const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const onNewHeadOverlayImage = useCallback((dataUrl: string) => {
		setImageDataUrl(null);
		setErrorMessage(null);

		const img = new Image();

		img.onload = () => {
			if (img.width !== CUSTOM_HAT_WIDTH || img.height !== CUSTOM_HAT_HEIGHT) {
				setErrorMessage(
					'The image resolution should be ' +
						CUSTOM_HAT_WIDTH +
						'×' +
						CUSTOM_HAT_HEIGHT +
						'.'
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
			type: 'setProperties',
			properties: {
				headSkinImage: imageDataUrl,
			},
		});

		onModalRequestClose();
	}, [dispatch, imageDataUrl, onModalRequestClose]);

	const onRemoveButtonClick = useCallback(() => {
		dispatch({
			type: 'setProperties',
			properties: {
				headSkinImage: null,
			},
		});
	}, [dispatch]);

	return (
		<>
			<div className={styles.editorUiButtons}>
				<button onClick={() => setIsModalOpen(true)} type="button">
					Select image
				</button>

				{dogState.headSkinImage != null ? (
					<button
						aria-label="Remove head skin"
						onClick={onRemoveButtonClick}
						title="Remove head skin"
						type="button"
					>
						<CloseIcon size="0.6em" />
					</button>
				) : null}
			</div>

			<Modal
				onClose={onModalRequestClose}
				opened={isModalOpen}
				size="auto"
				title="Select head skin image"
			>
				<ErrorBoundary>
					<ol className={styles.list}>
						<li className={styles.explanation}>
							Save this image to use as a template.
						</li>

						<li className={styles.explanation}>
							Your drawing will be applied on the head as a skin.
						</li>

						<li className={styles.explanation}>
							Hide the template face before exporting your image.
						</li>

						<li className={styles.explanation}>
							Export your image as a PNG with resolution of {CUSTOM_HAT_WIDTH}×
							{CUSTOM_HAT_HEIGHT}.
						</li>
					</ol>

					<img
						alt="Head template"
						className={styles.templateImage}
						height={CUSTOM_HAT_HEIGHT}
						src={templateImage}
						width={CUSTOM_HAT_WIDTH}
					/>

					<DogEditorFileInput onFileLoad={onNewHeadOverlayImage} />

					{errorMessage != null ? (
						<div className={styles.errorMessage}>
							<MessageBox message={errorMessage} type="ERROR" />
						</div>
					) : null}

					{imageDataUrl != null ? (
						<div className={styles.previewArea}>
							<p className={styles.explanation}>
								Preview your head skin, confirm if everything looks good.
							</p>

							<DogPreview
								{...convertDogEditorStateToDogPreview(dogState)}
								animation="idle"
								animationIndex={0}
								canvasClassName={styles.dogPreview}
								hats={dogState.hats}
								headSkinImage={imageDataUrl}
								showBody={true}
							/>

							<Button onClick={onConfirmButtonClick}>Confirm</Button>
						</div>
					) : null}
				</ErrorBoundary>
			</Modal>
		</>
	);
}

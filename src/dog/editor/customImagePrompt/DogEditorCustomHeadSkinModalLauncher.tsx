import {Button, Modal} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {useState} from 'react';

import ErrorBoundary from '../../../common/ErrorBoundary';
import MessageBox from '../../../common/MessageBox';
import {useDogEditorContext} from '../../DogEditorContext';
import {CUSTOM_HAT_HEIGHT, CUSTOM_HAT_WIDTH} from '../../drawDogToCanvas';
import templateImage from '../../images/sprDog_head_0.png';
import DogPreview from '../../preview/DogPreview';
import convertDogEditorStateToDogPreview from '../convertDogEditorStateToDogPreview';
import DogCustomImageMenu from '../DogCustomImageMenu';
import DogEditorFileInput from '../DogEditorFileInput';

import styles from './DogEditorCustomHeadSkinModalLauncher.module.css';

export default function DogEditorCustomHeadSkinModalLauncher() {
	const {dispatch, dogState} = useDogEditorContext();

	const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const [isModalOpen, {open: openModal, close: closeModal}] =
		useDisclosure(false);
	function onModalExitTransitionEnd() {
		setImageDataUrl(null);
		setErrorMessage(null);
	}

	function onNewHeadOverlayImage(dataUrl: string) {
		setImageDataUrl(null);
		setErrorMessage(null);

		const img = new Image();

		img.onload = () => {
			if (img.width !== CUSTOM_HAT_WIDTH || img.height !== CUSTOM_HAT_HEIGHT) {
				setErrorMessage(
					`The image resolution should be ${[CUSTOM_HAT_WIDTH, CUSTOM_HAT_HEIGHT].join('×')}.`,
				);
				return;
			}

			setImageDataUrl(dataUrl);
		};

		img.onerror = () => {
			setErrorMessage('There was a problem loading the image.');
		};

		img.src = dataUrl;
	}

	function onConfirmButtonClick() {
		dispatch({
			type: 'setProperties',
			properties: {
				headSkinImage: imageDataUrl,
			},
		});

		closeModal();
	}

	function onRemove() {
		dispatch({
			type: 'setProperties',
			properties: {
				headSkinImage: null,
			},
		});
	}

	return (
		<>
			<Button.Group>
				{dogState.headSkinImage == null ? (
					<Button onClick={openModal} variant="default">
						Select image
					</Button>
				) : (
					<DogCustomImageMenu
						buttonTooltip="Head skin image options"
						downloadFileName="Head skin image.png"
						downloadModalTitle="Head skin image preview"
						imageUrl={dogState.headSkinImage}
						onRemove={onRemove}
						onSelectNew={openModal}
					/>
				)}
			</Button.Group>

			<Modal
				onExitTransitionEnd={onModalExitTransitionEnd}
				onClose={closeModal}
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

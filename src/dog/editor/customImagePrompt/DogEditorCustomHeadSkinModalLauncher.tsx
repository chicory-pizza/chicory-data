import {Button, Modal, Tooltip} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {IconX} from '@tabler/icons-react';
import {useCallback, useState} from 'react';

import ErrorBoundary from '../../../common/ErrorBoundary';
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

	const [isModalOpen, {open: openModal, close: closeModal}] =
		useDisclosure(false);
	const onModalExitTransitionEnd = useCallback(() => {
		setImageDataUrl(null);
		setErrorMessage(null);
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
					`The image resolution should be ${[CUSTOM_HAT_WIDTH, CUSTOM_HAT_HEIGHT].join('×')}.`
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

		closeModal();
	}, [closeModal, dispatch, imageDataUrl]);

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
			<Button.Group>
				<Button onClick={openModal} variant="default">
					Select image
				</Button>

				{dogState.headSkinImage != null ? (
					<Tooltip label="Remove head skin">
						<Button onClick={onRemoveButtonClick} px="xs" variant="default">
							<IconX size="1.1em" />
						</Button>
					</Tooltip>
				) : null}
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

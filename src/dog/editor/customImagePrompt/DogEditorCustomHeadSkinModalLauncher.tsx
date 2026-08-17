import {Button, Divider, Modal, Stack} from '@mantine/core';
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

	function onImageLoad(dataUrl: string) {
		setImageDataUrl(null);
		setErrorMessage(null);

		const img = new Image();

		img.onload = () => {
			if (img.width !== CUSTOM_HAT_WIDTH || img.height !== CUSTOM_HAT_HEIGHT) {
				setErrorMessage(
					`The image resolution should be ${CUSTOM_HAT_WIDTH.toString()}×${CUSTOM_HAT_HEIGHT.toString()}.`,
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
					<Stack>
						<Stack gap="xs">
							<p>
								Save and use this template face, your drawing will be applied on
								the head as a skin.
							</p>

							<p>
								Export your image as a PNG with a resolution of{' '}
								{CUSTOM_HAT_WIDTH}×{CUSTOM_HAT_HEIGHT}.
							</p>

							<p>
								Remember to hide the template face when exporting your final
								image.
							</p>
						</Stack>

						<img
							alt="Head template"
							className={styles.templateImage}
							height={CUSTOM_HAT_HEIGHT}
							src={templateImage}
							width={CUSTOM_HAT_WIDTH}
						/>

						<div>
							<DogEditorFileInput onFileLoad={onImageLoad} />
						</div>

						{errorMessage != null ? (
							<MessageBox message={errorMessage} type="ERROR" />
						) : null}

						{imageDataUrl != null ? (
							<>
								<Divider />

								<p>
									Preview your head skin, confirm that everything looks good.
								</p>

								<DogPreview
									{...convertDogEditorStateToDogPreview(dogState)}
									animation="idle"
									animationIndex={0}
									canvasClassName={styles.dogPreview}
									headSkinImage={imageDataUrl}
									showBody={true}
								/>

								<div>
									<Button onClick={onConfirmButtonClick}>Confirm</Button>
								</div>
							</>
						) : null}
					</Stack>
				</ErrorBoundary>
			</Modal>
		</>
	);
}

import {Button, Divider, Modal, Stack} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {useState} from 'react';

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
import templateImage from '../../images/sprDog_blankshirt.png';
import DogPreview from '../../preview/DogPreview';
import convertDogEditorStateToDogPreview from '../convertDogEditorStateToDogPreview';
import DogCustomImageMenu from '../DogCustomImageMenu';
import DogEditorFileInput from '../DogEditorFileInput';

import styles from './DogCustomClothesImageEditor.module.css';

export default function DogCustomClothesImageEditor() {
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
			if (img.width === CUSTOM_HAT_WIDTH && img.height === CUSTOM_HAT_HEIGHT) {
				setErrorMessage(
					'It looks like you are loading a custom hat as the custom tee, this is probably not what you intended.',
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
				clothes: 'Custom Tee',
				customClothesImage: imageDataUrl,
			},
		});

		closeModal();
	}

	function onRemove() {
		dispatch({
			type: 'setProperties',
			properties: {
				customClothesImage: null,
			},
		});
	}

	return (
		<>
			{dogState.customClothesImage == null ? (
				<Button autoContrast onClick={openModal} variant="filled">
					Select image
				</Button>
			) : (
				<DogCustomImageMenu
					buttonTooltip="Custom tee image options"
					downloadFileName="Custom tee image.png"
					downloadModalTitle="Custom tee image preview"
					imageUrl={dogState.customClothesImage}
					onRemove={onRemove}
					onSelectNew={openModal}
				/>
			)}

			<Modal
				onExitTransitionEnd={onModalExitTransitionEnd}
				onClose={closeModal}
				opened={isModalOpen}
				size="auto"
				title="Select custom tee image"
			>
				<ErrorBoundary>
					<Stack>
						<Stack gap="xs">
							<p>Save and use this template tee to draw a custom tee.</p>

							<p>
								Export your image as a PNG with a resolution of{' '}
								{CUSTOM_CLOTHES_WIDTH.toString()}×
								{CUSTOM_CLOTHES_HEIGHT.toString()} or {SIZE.toString()}×
								{SIZE.toString()}.
							</p>

							<p>
								Remember to hide the template tee when exporting your final
								image.
							</p>
						</Stack>

						<img
							alt="Custom tee template"
							className={styles.templateImage}
							height={CUSTOM_CLOTHES_HEIGHT}
							src={templateImage}
							width={CUSTOM_CLOTHES_WIDTH}
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
									Preview your custom tee, confirm that everything looks good.
								</p>

								<DogPreview
									{...convertDogEditorStateToDogPreview(dogState)}
									animation="idle"
									animationIndex={0}
									canvasClassName={styles.dogPreview}
									clothes="Custom Tee"
									customClothesImage={imageDataUrl}
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

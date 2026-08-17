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
import templateImage from '../../images/sprDog_head_0.png';
import DogPreview from '../../preview/DogPreview';
import convertDogEditorStateToDogPreview from '../convertDogEditorStateToDogPreview';
import DogCustomImageMenu from '../DogCustomImageMenu';
import DogEditorFileInput from '../DogEditorFileInput';

import styles from './DogEditorCustomHatImageModalLauncher.module.css';

type Props = Readonly<{
	layer: number;
}>;

export default function DogEditorCustomHatImageModalLauncher({layer}: Props) {
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
			if (
				img.width === CUSTOM_CLOTHES_WIDTH &&
				img.height === CUSTOM_CLOTHES_HEIGHT
			) {
				setErrorMessage(
					'It looks like you are loading a custom tee as the custom hat, this is probably not what you intended.',
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
			type: 'setHatLayerProperties',
			layer,
			hat: {
				name: 'Custom Hat',
				customImage: imageDataUrl,
			},
		});

		closeModal();
	}

	function onRemove() {
		dispatch({
			type: 'setHatLayerProperties',
			layer,
			hat: {
				name: 'Custom Hat',
				customImage: null,
			},
		});
	}

	return (
		<>
			{dogState.hats[layer].customImage == null ? (
				<Button autoContrast onClick={openModal} variant="filled">
					Select image
				</Button>
			) : (
				<DogCustomImageMenu
					buttonTooltip="Custom hat image options"
					downloadFileName="Custom hat image.png"
					downloadModalTitle="Custom hat image preview"
					imageUrl={dogState.hats[layer].customImage}
					onRemove={onRemove}
					onSelectNew={openModal}
				/>
			)}

			<Modal
				onExitTransitionEnd={onModalExitTransitionEnd}
				onClose={closeModal}
				opened={isModalOpen}
				size="auto"
				title="Select custom hat image"
			>
				<ErrorBoundary>
					<Stack>
						<Stack gap="xs">
							<p>Save and use this template face to draw a custom hat.</p>

							<p>
								Export your image as a PNG with a resolution of{' '}
								{CUSTOM_HAT_WIDTH.toString()}×{CUSTOM_HAT_HEIGHT.toString()} or{' '}
								{SIZE.toString()}×{SIZE.toString()}.
							</p>

							<p>
								Remember to hide the template face when exporting your final
								image.
							</p>
						</Stack>

						<img
							alt="Custom hat template"
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
									Preview your custom hat, confirm that everything looks good.
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

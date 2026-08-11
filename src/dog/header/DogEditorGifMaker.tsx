import {Button, Modal} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import GIF from 'gif.js';
import {useRef, useState} from 'react';

import ErrorBoundary from '../../common/ErrorBoundary';
import {useDogEditorContext} from '../DogEditorContext';
import {SIZE} from '../drawDogToCanvas';
import convertDogEditorStateToDogPreview from '../editor/convertDogEditorStateToDogPreview';
import DogPreview from '../preview/DogPreview';
import DOG_ANIMATIONS from '../types/DogAnimations';

import styles from './DogEditorGifMaker.module.css';

export default function DogEditorGifMaker() {
	const {dogState} = useDogEditorContext();

	const [saving, setSaving] = useState(false);
	const gifRef = useRef<GIF>(null);
	const [animationIndex, setAnimationIndex] = useState(0);

	const [finalGifUrl, setFinalGifUrl] = useState<string | null>(null);
	const [isModalOpen, {open: openModal, close: closeModal}] =
		useDisclosure(false);

	const animation = 'idle'; // only this for now

	function onGifSave() {
		gifRef.current = new GIF({
			quality: 10,
			workers: 2,
			workerScript: new URL(
				'gif.js/dist/gif.worker.js',
				import.meta.url,
			).toString(),
		});

		setAnimationIndex(0);
		setSaving(true);
	}

	function onCanvasFrameDrawn(
		canvasRef: HTMLCanvasElement,
		animationIndexFromCanvas: number,
	) {
		const gif = gifRef.current;
		if (!gif || !saving || animationIndexFromCanvas !== animationIndex) {
			return;
		}

		gif.addFrame(canvasRef, {
			copy: true,
			delay: 200,
		});

		// Do next frame
		const animationInfo = DOG_ANIMATIONS.get(animation);
		if (animationInfo == null) {
			throw new Error('Invalid animation ' + animation);
		}

		if (animationIndex < animationInfo.headAnim.length - 1) {
			setAnimationIndex(animationIndex + 1);
			return;
		}

		gif.once('finished', (blob) => {
			setFinalGifUrl(window.URL.createObjectURL(blob));
			openModal();

			setSaving(false);
		});

		gif.render();
	}

	function onModalExitTransitionEnd() {
		if (finalGifUrl != null) {
			window.URL.revokeObjectURL(finalGifUrl);
		}
		setFinalGifUrl(null);

		gifRef.current = null;
	}

	return (
		<>
			<Button loading={saving} onClick={onGifSave} variant="default">
				Create GIF
			</Button>

			{saving ? (
				<div hidden>
					<DogPreview
						{...convertDogEditorStateToDogPreview(dogState)}
						animation={animation}
						animationIndex={animationIndex}
						backgroundFillColor="#fff"
						onCanvasFrameDrawn={onCanvasFrameDrawn}
						showBody={dogState.bodyShow}
					/>
				</div>
			) : null}

			<Modal
				onExitTransitionEnd={onModalExitTransitionEnd}
				onClose={closeModal}
				opened={isModalOpen}
				size="auto"
				title="GIF created"
			>
				<ErrorBoundary>
					{finalGifUrl != null ? (
						<>
							<Button
								component="a"
								href={finalGifUrl}
								download="Drawdog.gif"
								variant="default"
								mb="md"
							>
								Download
							</Button>

							<img
								alt="Drawdog GIF"
								className={styles.image}
								height={SIZE}
								src={finalGifUrl}
								width={SIZE}
							/>
						</>
					) : null}
				</ErrorBoundary>
			</Modal>
		</>
	);
}

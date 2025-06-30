import {Button} from '@mantine/core';
import GIF from 'gif.js';
import {useRef, useState} from 'react';

import {useDogEditorContext} from '../DogEditorContext';
import convertDogEditorStateToDogPreview from '../editor/convertDogEditorStateToDogPreview';
import DogPreview from '../preview/DogPreview';
import DOG_ANIMATIONS from '../types/DogAnimations';

export default function DogEditorGifMaker() {
	const {dogState} = useDogEditorContext();

	const [saving, setSaving] = useState(false);
	const gifRef = useRef<GIF>(null);
	const [animationIndex, setAnimationIndex] = useState(0);

	const animation = 'idle'; // only this for now

	function onGifSave() {
		gifRef.current = new GIF({
			quality: 10,
			workers: 2,
			workerScript: new URL(
				'gif.js/dist/gif.worker.js',
				import.meta.url
			).toString(),
		});

		setSaving(true);
		setAnimationIndex(0);
	}

	function onCanvasFrameDrawn(
		canvasRef: HTMLCanvasElement,
		animationIndexFromCanvas: number
	) {
		const gif = gifRef.current;
		if (!gif || animationIndexFromCanvas !== animationIndex) {
			return;
		}

		if (saving) {
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
			} else {
				gif.once('finished', (blob: Blob) => {
					window.open(URL.createObjectURL(blob));

					setSaving(false);
				});

				gif.render();
			}
		}
	}

	return (
		<>
			<Button disabled={saving} onClick={onGifSave} variant="default">
				Save as GIF
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
		</>
	);
}

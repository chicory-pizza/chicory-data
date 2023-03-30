// @flow strict

import {encode} from 'base64-arraybuffer';
import {fileOpen, fileSave} from 'browser-fs-access';
import {deflate} from 'pako';
import {useState} from 'react';
// $FlowFixMe[untyped-import]
import tinycolor from 'tinycolor2';

import CustomModal from '../../common/CustomModal';
import MessageBox from '../../common/MessageBox';
import ColorGrid from '../../palette/ColorGrid';
import type {Palette} from '../../palette/ColorGrid';
import getCanvasRenderingContext from '../../util/getCanvasRenderingContext';
import GeoPreview from '../common/GeoPreview';
import {useCurrentCoordinatesNonNullable} from '../CurrentCoordinatesContext';
import {
	GEO_HEIGHT,
	GEO_WIDTH,
	PIXEL_COLORS,
	PIXEL_COLORS_EXPLANATIONS,
} from '../GeoConstants';
import type {LevelType} from '../types/LevelType';
import decodeGeoString from '../util/decodeGeoString';
import drawGeoToCanvas from '../util/drawGeoToCanvas';
import {useWorldDataNonNullable} from '../WorldDataContext';

import styles from './LevelTerrainEditorModal.module.css';

function prepareCanvas(): HTMLCanvasElement {
	const canvas = document.createElement('canvas');
	canvas.width = GEO_WIDTH;
	canvas.height = GEO_HEIGHT;

	return canvas;
}

function generateColorsToGameBytes() {
	const bytes = [];

	PIXEL_COLORS.forEach((color, byte) => {
		const colorObj = tinycolor(color);
		const rgb: {r: number, g: number, b: number} = colorObj.toRgb();

		// Browser canvas has annoyingly imprecise color :(
		// Fuzz the numbers a bit and hope for the best
		for (let r = -2; r <= 2; r += 1) {
			for (let g = -2; g <= 2; g += 1) {
				for (let b = -2; b <= 2; b += 1) {
					bytes.push({
						byte,
						r: rgb.r + r,
						g: rgb.g + g,
						b: rgb.b + b,
					});
				}
			}
		}
	});

	return bytes;
}

type Props = $ReadOnly<{
	isOpen: boolean,
	level: LevelType,
	onModalRequestClose: () => void,
}>;

export default function LevelTerrainEditorModal(props: Props): React$Node {
	const [currentCoordinates] = useCurrentCoordinatesNonNullable();
	const {dispatch} = useWorldDataNonNullable();

	const [errorMessage, setErrorMessage] = useState<?string>(null);

	// Palettes
	const palettes: $ReadOnlyArray<Palette> = PIXEL_COLORS_EXPLANATIONS.map(
		(explanation) => {
			return {
				description: explanation.description,
				colors: explanation.colors.map((colorIndex) => {
					const colorObj = tinycolor(PIXEL_COLORS.get(colorIndex));
					const rgb = colorObj.toRgb();

					return [rgb.r, rgb.g, rgb.b];
				}),
			};
		}
	);

	async function openFile() {
		const blob = await fileOpen({
			extensions: ['.png'],
			description: 'PNG image',
		});

		setErrorMessage(null);

		if (blob.type === 'image/jpeg') {
			setErrorMessage(
				"Please don't use JPEG, it is likely to lose precise color info"
			);
			return;
		}

		const img = new Image();
		img.onload = () => {
			try {
				if (img.width !== GEO_WIDTH || img.height !== GEO_HEIGHT) {
					throw new Error(
						`Incorrect image resolution, it should be ${GEO_WIDTH}×${GEO_HEIGHT}`
					);
				}

				const colorToBytes = generateColorsToGameBytes();

				const canvas = prepareCanvas();
				const ctx = getCanvasRenderingContext(canvas, false);
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0);

				const pixels = [];
				for (let y = 0; y < img.height; y += 1) {
					for (let x = 0; x < img.width; x += 1) {
						const pixel = ctx.getImageData(x, y, 1, 1).data;

						if (pixel[3] !== 255) {
							throw new Error(
								'Transparency is unsupported, please make sure the image is fully opaque'
							);
						}

						const colorInfo = colorToBytes.find((info) => {
							return (
								info.r === pixel[0] &&
								info.g === pixel[1] &&
								info.b === pixel[2]
							);
						});

						if (colorInfo == null) {
							throw new Error(
								`Unsupported color found (R: ${pixel[0]} G: ${pixel[1]} B: ${
									pixel[2]
								}) at pixel (X: ${x + 1}, Y: ${y + 1})`
							);
						}

						pixels.push(colorInfo.byte);
					}
				}

				URL.revokeObjectURL(img.src);

				const encoded = new Uint8Array(pixels);
				const deflated = deflate(encoded);

				dispatch({
					type: 'setLevelProperty',
					coordinates: currentCoordinates,
					key: 'geo',
					// $FlowFixMe[incompatible-call]
					value: encode(deflated),
				});
				props.onModalRequestClose();
			} catch (ex) {
				if (ex instanceof Error) {
					setErrorMessage(ex.message);
				}

				throw ex;
			}
		};
		img.onerror = () => {
			setErrorMessage('There was a problem loading the image.');
		};
		img.src = URL.createObjectURL(blob);
	}

	function saveFile() {
		const decodedGeo = decodeGeoString(props.level.geo);

		const canvas = prepareCanvas();
		const ctx = getCanvasRenderingContext(canvas, false);
		drawGeoToCanvas({
			canvas,
			ctx,
			geo: decodedGeo,
			scale: 1,
			geoPaintBuffer: null,
		});

		canvas.toBlob((blob) => {
			fileSave(blob, {
				fileName: `Level Geometry (${currentCoordinates[0]}_${currentCoordinates[1]}_${currentCoordinates[2]})`,
				extensions: ['.png'],
				description: 'PNG image',
			}).catch((ex) => {
				if (ex.name !== 'AbortError') {
					console.error(ex);
					alert('There was a problem saving the level terrain image.');
				}
			});
		});
	}

	return (
		<CustomModal
			isOpen={props.isOpen}
			onRequestClose={props.onModalRequestClose}
			titleText="Edit level terrain"
		>
			{props.isOpen ? (
				<div className={styles.content}>
					<div>
						<p className={styles.explanation}>
							Save this current terrain and use your image editor:
						</p>

						<div className={styles.geoPreview}>
							<GeoPreview
								geoPaintBuffer={null}
								level={props.level}
								mapMouseMoveCoordinates={null}
								paintBufferUpdate={null}
								scale={1}
								useDevicePixelRatio={false}
							/>

							<button
								className={styles.geoPreviewSaveButton}
								onClick={saveFile}
								type="button"
							>
								Save
							</button>
						</div>

						<p className={styles.explanation}>
							Or to start from scratch, create a {GEO_WIDTH}×{GEO_HEIGHT}{' '}
							resolution PNG image.
						</p>

						<p className={styles.explanation}>Use these colors for terrain:</p>

						<ColorGrid palettes={palettes} />
					</div>

					<div className={styles.contentRight}>
						<p className={styles.explanation}>Then load your image:</p>

						<div className={styles.fileInput}>
							<button onClick={openFile} type="button">
								Load image
							</button>
						</div>

						{errorMessage != null ? (
							<div className={styles.errorMessage}>
								<MessageBox message={errorMessage} type="ERROR" />
							</div>
						) : null}
					</div>
				</div>
			) : null}
		</CustomModal>
	);
}

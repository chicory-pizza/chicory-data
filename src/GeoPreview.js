// @flow strict

// $FlowFixMe[untyped-import]
import {decode} from 'base64-arraybuffer';
// $FlowFixMe[untyped-import]
import {inflate} from 'pako';
import {useEffect, useMemo, useRef} from 'react';

import styles from './GeoPreview.module.css';
import type {LevelType} from './types/LevelType';

export const SCREEN_WIDTH = 1920;
export const SCREEN_HEIGHT = 1080;
export const GEO_WIDTH = 81;
export const GEO_HEIGHT = 46;

const PIXEL_COLORS: {[pixel: string]: string} = {
	// higher ground layers
	'255': '#eee',
	'254': '#ddd',
	'253': '#ccc',
	'252': '#bbb',
	'251': '#aaa',
	'250': '#999',
	'249': '#888',
	'248': '#777',
	'247': '#666', // [0, 3, 2]
	'246': '#555', // [0, -2, -14]
	'244': '#444', // [0, 5, 1]
	'243': '#333', // [0, 6, 1]
	'242': '#222', // [0, 6, 1]

	'6': 'blue', // water
	'5': 'brown', // unwalkable collision
	'4': 'lightblue', // sky
	'3': 'pink', // climbable wall
	'2': '#555', // unclimbable wall
	'1': '#eee', // ramp
	'0': '#fff', // walkable
};

type Props = $ReadOnly<{
	level: LevelType,
	mapMouseMoveCoordinates: ?[number, number],
	scale: number,
}>;

export default function GeoPreview(props: Props): React$Node {
	const canvasRef = useRef<?HTMLCanvasElement>(null);

	// todo use error boundary
	const decodedGeo: ?Uint8Array = useMemo(() => {
		try {
			return inflate(decode(props.level.geo));
		} catch (ex) {
			console.error(ex);
		}

		return null;
	}, [props.level.geo]);

	const dpr = window.devicePixelRatio || 1;

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!decodedGeo || !canvas) {
			return;
		}

		// https://github.com/facebook/flow/issues/8689
		// $FlowFixMe[method-unbinding]
		if (typeof canvas.getContext === 'undefined') {
			return;
		}

		const ctx = canvas.getContext('2d', {alpha: false});
		ctx.mozImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;

		ctx.scale(props.scale * dpr, props.scale * dpr);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// pixels
		decodedGeo.forEach((pixel, index) => {
			let fill = PIXEL_COLORS[pixel.toString()];
			if (fill == null) {
				console.warn('unknown pixel color' + pixel);
				return null;
			}

			ctx.fillStyle = fill;
			ctx.fillRect(index % GEO_WIDTH, Math.floor(index / GEO_WIDTH), 1, 1);
		});

		// mouse move
		const mouse = props.mapMouseMoveCoordinates;
		if (mouse != null) {
			ctx.fillStyle = 'red';

			ctx.fillRect(
				(mouse[0] / SCREEN_WIDTH) * GEO_WIDTH - 1,
				(mouse[1] / SCREEN_HEIGHT) * GEO_HEIGHT,
				3,
				1
			);

			ctx.fillRect(
				(mouse[0] / SCREEN_WIDTH) * GEO_WIDTH,
				(mouse[1] / SCREEN_HEIGHT) * GEO_HEIGHT - 1,
				1,
				3
			);
		}

		ctx.setTransform(1, 0, 0, 1, 0, 0);
	}, [decodedGeo, dpr, props.mapMouseMoveCoordinates, props.scale]);

	if (decodedGeo == null) {
		return "Can't generate map preview";
	}

	return (
		<div>
			<canvas
				className={styles.canvas}
				ref={canvasRef}
				width={GEO_WIDTH * props.scale * dpr}
				height={GEO_HEIGHT * props.scale * dpr}
				style={{
					width: GEO_WIDTH * props.scale,
					height: GEO_HEIGHT * props.scale,
				}}
			/>
		</div>
	);
}

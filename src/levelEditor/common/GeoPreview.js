// @flow strict

import {useEffect, useMemo, useRef} from 'react';

import getCanvasRenderingContext from '../../util/getCanvasRenderingContext';
import {
	GEO_HEIGHT,
	GEO_WIDTH,
	SCREEN_WIDTH,
	SCREEN_HEIGHT,
} from '../GeoConstants';
import type {LevelType} from '../types/LevelType';
import decodeGeoString from '../util/decodeGeoString';
import drawGeoToCanvas from '../util/drawGeoToCanvas';

import styles from './GeoPreview.module.css';

type Props = $ReadOnly<{
	level: LevelType,
	mapMouseMoveCoordinates: ?[number, number],
	scale: number,
	useDevicePixelRatio: boolean,
}>;

export default function GeoPreview(props: Props): React$Node {
	const canvasRef = useRef<?HTMLCanvasElement>(null);

	// todo use error boundary
	const decodedGeo = useMemo(() => {
		try {
			return decodeGeoString(props.level.geo);
		} catch (ex) {
			console.error(ex);
		}

		return null;
	}, [props.level.geo]);

	const dpr = props.useDevicePixelRatio ? window.devicePixelRatio || 1 : 1;

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!decodedGeo || !canvas) {
			return;
		}

		const ctx = getCanvasRenderingContext(canvas);

		drawGeoToCanvas({
			canvas,
			ctx,
			geo: decodedGeo,
			scale: props.scale * dpr,
		});

		ctx.scale(props.scale * dpr, props.scale * dpr);

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
		return "⚠️ Can't generate map preview";
	}

	return (
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
	);
}

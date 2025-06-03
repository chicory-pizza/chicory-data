import getCanvasRenderingContext from '../../util/getCanvasRenderingContext';
import {EDITOR_UI_PIXEL_COLORS, GEO_HEIGHT, GEO_WIDTH} from '../GeoConstants';
import decodeGeoString from '../util/decodeGeoString';
import drawGeoToCanvas from '../util/drawGeoToCanvas';

const cache: Record<string, string> = {};

export default function getWorldMapGeoPreviewCache(geo: string): string {
	const dpr = window.devicePixelRatio || 1;

	if (cache[dpr + '|' + geo]) {
		return cache[dpr + '|' + geo];
	}

	const decodedGeo = decodeGeoString(geo);

	const canvas = document.createElement('canvas');
	canvas.width = GEO_WIDTH * dpr;
	canvas.height = GEO_HEIGHT * dpr;

	const ctx = getCanvasRenderingContext(canvas, false);
	drawGeoToCanvas({
		canvas,
		colors: EDITOR_UI_PIXEL_COLORS,
		ctx,
		geo: decodedGeo,
		scale: dpr,
		geoPaintBuffer: null,
	});

	const url = canvas.toDataURL();
	cache[dpr + '|' + geo] = url;

	return url;
}

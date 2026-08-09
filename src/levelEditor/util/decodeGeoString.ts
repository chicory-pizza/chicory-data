import {inflate} from 'pako';
import {z} from 'zod/mini';

export default function decodeGeoString(geo: string): Uint8Array<ArrayBuffer> {
	return inflate(z.util.base64ToUint8Array(geo));
}

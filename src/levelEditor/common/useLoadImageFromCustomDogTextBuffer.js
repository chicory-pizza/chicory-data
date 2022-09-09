// @flow strict

import {decode} from 'base64-arraybuffer';
import {inflate} from 'pako';
import {useEffect, useState} from 'react';
import {usePrevious} from 'react-use';

export default function useLoadImageFromCustomDogTextBuffer(
	text: ?string
): ?string {
	const [blobUrl, setBlobUrl] = useState<?string>(null);
	const previousText = usePrevious(text);

	// Clean up old blob URL
	if (text !== previousText && blobUrl != null) {
		URL.revokeObjectURL(blobUrl);
		setBlobUrl(null);
	}

	useEffect(() => {
		if (text == null) {
			return;
		}

		const blob = new Blob([inflate(decode(text))], {
			type: 'image/png',
		});

		setBlobUrl(URL.createObjectURL(blob));
	}, [text]);

	return blobUrl;
}

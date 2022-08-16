// @flow strict

import {useEffect, useRef, useState} from 'react';

export default function useLoadImage(currentSrc: ?string): ?HTMLImageElement {
	const [loadedSrc, setLoadedSrc] = useState<?string>(null);
	const img = useRef<?HTMLImageElement>(null);

	useEffect(() => {
		if (currentSrc == null) {
			return;
		}

		img.current = document.createElement('img');
		const imgRef = img.current;

		// todo need onerror state
		function onLoad() {
			setLoadedSrc(currentSrc);
		}

		imgRef.addEventListener('load', onLoad);
		imgRef.src = currentSrc;

		return () => {
			imgRef.removeEventListener('load', onLoad);
			img.current = null;
		};
	}, [currentSrc]);

	if (
		currentSrc == null ||
		loadedSrc !== currentSrc ||
		img.current == null ||
		img.current.src !== currentSrc // src of previous image may not be fully loaded yet and useEffect hasn't got the chance to run yet, returning it will result in 0x0 image
	) {
		return null;
	}

	return img.current;
}

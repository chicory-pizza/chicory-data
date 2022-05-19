// @flow strict

import {useEffect, useRef, useState} from 'react';

export default function useLoadImage(currentSrc: ?string): ?HTMLImageElement {
	const [loadedSrc, setLoadedSrc] = useState<?string>(null);
	const img = useRef<?HTMLImageElement>(null);

	useEffect(() => {
		if (currentSrc == null) {
			return;
		}

		const imgRef = document.createElement('img');
		img.current = imgRef;

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

	if (currentSrc == null || loadedSrc !== currentSrc) {
		return null;
	}

	return img.current;
}

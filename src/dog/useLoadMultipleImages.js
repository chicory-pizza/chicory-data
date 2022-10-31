// @flow strict

import {useEffect, useRef, useState} from 'react';

// This destroys and reloads pairs of images and is less peformant than just one
export default function useLoadMultipleImages(currentSrcs: {
	[key: string]: ?string,
}): ?{[key: string]: ?HTMLImageElement} {
	const [loadedSrcs, setLoadedSrcs] = useState<{[key: string]: ?string}>({});
	const imgs = useRef<{[key: string]: ?HTMLImageElement}>({});
	const onLoads = useRef<{[key: string]: () => mixed}>({});

	useEffect(() => {
		const newLoadedSrcs: {[key: string]: ?string} = {};
		Object.keys(currentSrcs).forEach((key) => {
			const src = currentSrcs[key];
			if (src == null) {
				newLoadedSrcs[key] = null;
				return;
			}

			const imgRef = document.createElement('img');
			imgs.current[key] = imgRef;

			// todo need onerror state
			onLoads.current[key] = () => {
				setLoadedSrcs((loadedSrcs) => {
					return {
						...loadedSrcs,
						[key]: currentSrcs[key],
					};
				});
			};

			imgRef.addEventListener('load', onLoads.current[key]);
			imgRef.src = src;
		});
		setLoadedSrcs(newLoadedSrcs);

		return () => {
			// Ideally, we should try to recycle/cache but it gets really complicated...
			setLoadedSrcs({});

			Object.keys(currentSrcs).forEach((key) => {
				if (imgs.current[key]) {
					imgs.current[key].removeEventListener('load', onLoads.current[key]);

					// eslint-disable-next-line react-hooks/exhaustive-deps
					delete onLoads.current[key];

					// eslint-disable-next-line react-hooks/exhaustive-deps
					delete imgs.current[key];
				}
			});
		};
	}, [currentSrcs]);

	const currentSrcKeys = Object.keys(currentSrcs);
	const loadedSrcKeys = Object.keys(loadedSrcs);
	if (currentSrcKeys.length !== loadedSrcKeys.length) {
		return null;
	}

	if (!currentSrcKeys.every((key) => currentSrcs[key] === loadedSrcs[key])) {
		return null;
	}

	return imgs.current;
}

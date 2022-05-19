// @flow strict

import {useCallback, useEffect, useState} from 'react';

export default function usePageVisibility(): boolean {
	const [isVisible, setIsVisible] = useState(!document.hidden);

	const onVisibilityChange = useCallback(
		() => setIsVisible(!document.hidden),
		[]
	);

	useEffect(() => {
		document.addEventListener('visibilitychange', onVisibilityChange);

		return () => {
			document.removeEventListener('visibilitychange', onVisibilityChange);
		};
	});

	return isVisible;
}

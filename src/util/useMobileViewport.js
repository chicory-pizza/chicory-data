// @flow strict

import {useEffect} from 'react';

export default function useEnableMobileViewport() {
	useEffect(() => {
		const viewportTag = document.querySelector('meta[name="viewport"]');
		if (!viewportTag) {
			return;
		}

		const oldViewport = viewportTag.getAttribute('content');
		viewportTag.setAttribute('content', 'width=device-width, initial-scale=1');

		return () => {
			viewportTag.setAttribute(
				'content',
				oldViewport ?? 'width=980, initial-scale=1'
			);
		};
	});
}

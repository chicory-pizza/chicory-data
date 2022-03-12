// @flow strict

import {useEffect, useRef} from 'react';

// From https://overreacted.io/making-setinterval-declarative-with-react-hooks/
//
// Licensed under MIT License
// https://github.com/gaearon/overreacted.io/blob/ffe443cf6f70d247ab6531e06f176afd7f8145b9/LICENSE-code-snippets

export default function useInterval(callback: () => mixed, delay: ?number) {
	const savedCallback = useRef();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			if (savedCallback.current) {
				savedCallback.current();
			}
		}

		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

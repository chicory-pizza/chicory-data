// @flow strict

import type {Action, Location} from 'history';
import {useCallback, useEffect} from 'react';
import {
	// $FlowFixMe[missing-export]
	unstable_useBlocker,
	// $FlowFixMe[missing-export]
	useBeforeUnload,
} from 'react-router-dom';

export type BlockerFunction = {
	currentLocation: Location,
	historyAction: Action,
	nextLocation: Location,
};

/**
 * Forked from https://github.com/remix-run/react-router/blob/f85e0b33536645aa14c9d7cc6e3f9e09f63373da/packages/react-router-dom/index.tsx#L1297
 *
 * Wrapper around useBlocker to show a window.confirm prompt to users instead
 * of building a custom UI with useBlocker.
 *
 * Warning: This has *a lot of rough edges* and behaves very differently (and
 * very incorrectly in some cases) across browsers if user click addition
 * back/forward navigations while the confirm is open.  Use at your own risk.
 */
export function usePrompt(
	message: string,
	when: boolean,
	condition: (args: BlockerFunction) => boolean
) {
	const blocker = unstable_useBlocker((args: BlockerFunction) => {
		return when && condition(args);
	});

	useEffect(() => {
		if (blocker.state === 'blocked' && !when) {
			blocker.reset();
		}
	}, [blocker, when]);

	useEffect(() => {
		if (blocker.state === 'blocked') {
			if (window.confirm(message)) {
				setTimeout(blocker.proceed, 0);
			} else {
				blocker.reset();
			}
		}
	}, [blocker, message]);

	useBeforeUnload(
		useCallback(
			(ev) => {
				if (when) {
					ev.preventDefault();
					ev.returnValue = message;
				}
			},
			[message, when]
		)
	);
}

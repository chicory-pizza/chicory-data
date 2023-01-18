// @flow strict

// Based on https://gist.github.com/rmorse/426ffcc579922a82749934826fa9f743
// https://github.com/remix-run/history/blob/dev/docs/blocking-transitions.md

/**
 * These hooks re-implement the now removed useBlocker and usePrompt hooks in 'react-router-dom'.
 * Thanks for the idea @piecyk https://github.com/remix-run/react-router/issues/8139#issuecomment-953816315
 * Source: https://github.com/remix-run/react-router/commit/256cad70d3fd4500b1abcfea66f3ee622fb90874#diff-b60f1a2d4276b2a605c05e19816634111de2e8a4186fe9dd7de8e344b65ed4d3L344-L381
 */

import type {Action, Location} from 'history';
import {useContext, useEffect, useCallback} from 'react';
// $FlowFixMe[missing-export]
import {UNSAFE_NavigationContext as NavigationContext} from 'react-router-dom';

export type Blocker = {
	action: Action,
	location: Location,
	retry: () => void,
};

/**
 * Blocks all navigation attempts. This is useful for preventing the page from
 * changing until some condition is met, like saving form data.
 *
 * @see https://reactrouter.com/api/useBlocker
 */
function useBlocker(blocker: (transition: Blocker) => mixed, when: boolean) {
	const {navigator} = useContext(NavigationContext);

	useEffect(() => {
		if (!when) {
			return;
		}

		const unblock: () => void = navigator.block((transition) => {
			blocker({
				...transition,
				retry() {
					// Automatically unblock the transition so it can play all the way
					// through before retrying it. TODO: Figure out how to re-enable
					// this block if the transition is cancelled for some reason.
					unblock();
					transition.retry();
				},
			});
		});

		return unblock;
	}, [blocker, navigator, when]);
}

/**
 * Prompts the user with an Alert before they leave the current screen.
 *
 * @param  message
 * @param  when
 */
export function usePrompt(
	message: string,
	when: boolean,
	condition?: (tx: Blocker) => boolean
) {
	const blocker = useCallback(
		(transition: Blocker) => {
			if (condition != null && !condition(transition)) {
				transition.retry();
				return;
			}

			if (window.confirm(message)) {
				transition.retry();
			}
		},
		[condition, message]
	);

	useBlocker(blocker, when);
}

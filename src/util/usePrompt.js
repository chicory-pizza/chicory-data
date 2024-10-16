// @flow strict

import type {Action, Location} from 'history';
import {useCallback} from 'react';
import {
	// $FlowFixMe[missing-export]
	unstable_usePrompt,
	// $FlowFixMe[missing-export]
	useBeforeUnload,
} from 'react-router-dom';

export type BlockerFunction = {
	currentLocation: Location,
	historyAction: Action,
	nextLocation: Location,
};

export function usePrompt(
	message: string,
	when: boolean,
	condition: (args: BlockerFunction) => boolean
) {
	unstable_usePrompt({
		message,
		when: (args: BlockerFunction) => {
			return when && condition(args);
		},
	});

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

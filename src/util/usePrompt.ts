import type {Action, Location} from 'history';
import {useCallback} from 'react';
import {unstable_usePrompt, useBeforeUnload} from 'react-router-dom';

export type BlockerFunction = {
	currentLocation: Location;
	historyAction: Action;
	nextLocation: Location;
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

					// eslint-disable-next-line @typescript-eslint/no-deprecated
					ev.returnValue = message;
				}
			},
			[message, when]
		)
	);
}

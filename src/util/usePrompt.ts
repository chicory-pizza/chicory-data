import {useCallback} from 'react';
import {
	unstable_usePrompt,
	useBeforeUnload,
	type BlockerFunction,
} from 'react-router-dom';

export function usePrompt(
	message: string,
	when: boolean,
	condition: (args: Parameters<BlockerFunction>[0]) => boolean
) {
	unstable_usePrompt({
		message,
		when: (args) => {
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

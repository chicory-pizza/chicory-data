import {type ShouldBlockFn, useBlocker} from '@tanstack/react-router';

export function usePrompt(
	message: string,
	when: boolean,
	condition: (args: Parameters<ShouldBlockFn>[0]) => boolean,
) {
	useBlocker({
		shouldBlockFn(args) {
			if (!condition(args)) {
				return false;
			}

			return !confirm(message);
		},
		enableBeforeUnload: true,
		disabled: !when,
	});
}

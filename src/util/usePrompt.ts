import {modals} from '@mantine/modals';
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

			return new Promise((resolve) => {
				modals.openConfirmModal({
					modalId: 'useBlocker',
					title: message,
					labels: {confirm: 'Discard', cancel: 'Cancel'},
					onConfirm() {
						resolve(false);
					},
					onClose() {
						resolve(true);
					},
				});
			});
		},
		enableBeforeUnload: true,
		disabled: !when,
	});
}

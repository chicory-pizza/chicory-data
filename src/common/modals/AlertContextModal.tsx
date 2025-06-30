import {Button, Group} from '@mantine/core';
import type {ContextModalProps} from '@mantine/modals';

type Props = Readonly<
	ContextModalProps<{
		content: React.ReactNode;
	}>
>;

export default function AlertContextModal({context, id, innerProps}: Props) {
	return (
		<>
			{typeof innerProps.content === 'string' ? (
				<p>{innerProps.content}</p>
			) : (
				innerProps.content
			)}

			<Group justify="flex-end" mt="md">
				<Button
					data-autofocus
					onClick={() => {
						context.closeModal(id);
					}}
				>
					Close
				</Button>
			</Group>
		</>
	);
}

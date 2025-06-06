import {ActionIcon, Tooltip} from '@mantine/core';
import {IconArrowsMaximize} from '@tabler/icons-react';

type Props = Readonly<
	{
		label: string;
	} & React.ComponentProps<'button'>
>;

export default function ModalLauncherButton({label, ...otherProps}: Props) {
	return (
		<Tooltip label={label}>
			<ActionIcon size="input-sm" variant="default" {...otherProps}>
				<IconArrowsMaximize size="1.1em" />
			</ActionIcon>
		</Tooltip>
	);
}

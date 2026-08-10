import {ActionIcon, Tooltip} from '@mantine/core';
import {ArrowsOutIcon} from '@phosphor-icons/react/dist/csr/ArrowsOut';

type Props = Readonly<
	{
		label: string;
	} & React.ComponentProps<'button'>
>;

export default function ModalLauncherButton({label, ...otherProps}: Props) {
	return (
		<Tooltip label={label}>
			<ActionIcon size="input-sm" variant="default" {...otherProps}>
				<ArrowsOutIcon size="1.2em" />
			</ActionIcon>
		</Tooltip>
	);
}

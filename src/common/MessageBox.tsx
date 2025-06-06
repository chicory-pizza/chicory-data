import {Alert} from '@mantine/core';
import {IconExclamationCircle, IconInfoCircle} from '@tabler/icons-react';

type Props = Readonly<{
	message: React.ReactNode;
	type: 'ERROR' | 'INFO';
}>;

export default function MessageBox({message, type}: Props) {
	return (
		<Alert
			color={type === 'ERROR' ? 'luncheonOrange' : ''}
			icon={type === 'ERROR' ? <IconExclamationCircle /> : <IconInfoCircle />}
			variant={type === 'ERROR' ? 'light' : 'default'}
		>
			{message}
		</Alert>
	);
}

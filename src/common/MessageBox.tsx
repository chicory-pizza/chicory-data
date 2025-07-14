import {Alert} from '@mantine/core';
import {IconExclamationCircle, IconInfoCircle} from '@tabler/icons-react';
import type React from 'react';

type Props = Readonly<
	{
		message: React.ReactNode;
		type: 'ERROR' | 'INFO';
	} & React.ComponentProps<typeof Alert>
>;

export default function MessageBox({message, type, ...otherProps}: Props) {
	return (
		<Alert
			color={type === 'ERROR' ? 'luncheonOrange' : ''}
			icon={type === 'ERROR' ? <IconExclamationCircle /> : <IconInfoCircle />}
			variant={type === 'ERROR' ? 'light' : 'default'}
			{...otherProps}
		>
			{message}
		</Alert>
	);
}

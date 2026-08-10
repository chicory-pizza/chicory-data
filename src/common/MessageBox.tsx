import {Alert} from '@mantine/core';
import {InfoIcon} from '@phosphor-icons/react/dist/csr/Info';
import {WarningCircleIcon} from '@phosphor-icons/react/dist/csr/WarningCircle';
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
			icon={
				type === 'ERROR' ? (
					<WarningCircleIcon size={20} />
				) : (
					<InfoIcon size={20} />
				)
			}
			variant={type === 'ERROR' ? 'light' : 'default'}
			{...otherProps}
		>
			{message}
		</Alert>
	);
}

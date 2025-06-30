import {HeadlessMantineProvider} from '@mantine/core';
import {ModalsProvider} from '@mantine/modals';

import mantineModals from '../common/modals/mantineModals';

type Props = Readonly<{
	children: React.ReactNode;
}>;

export default function CustomMantine(props: Props) {
	return (
		<HeadlessMantineProvider
			env={import.meta.env.MODE === 'test' ? 'test' : undefined}
		>
			<ModalsProvider modals={mantineModals}>{props.children}</ModalsProvider>
		</HeadlessMantineProvider>
	);
}

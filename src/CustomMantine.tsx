import '@mantine/core/styles.css';

import {
	createTheme,
	type MantineColorsTuple,
	MantineProvider,
	Modal,
} from '@mantine/core';

// https://mantine.dev/colors-generator/?color=b69aff
const luncheonPurple: MantineColorsTuple = [
	'#f1e9ff',
	'#ddcfff',
	'#b69aff',
	'#8f65fe',
	'#6e37fd',
	'#591afd',
	'#4e0bfe',
	'#3f00e3',
	'#3700cb',
	'#2c00b3',
];

const components =
	import.meta.env.MODE === 'test'
		? {
				Modal: Modal.extend({
					defaultProps: {
						transitionProps: {duration: 0},
					},
				}),
			}
		: {};

const theme = createTheme({
	components,
	colors: {luncheonPurple},
	fontFamily:
		"Domigorgon, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
	fontSmoothing: false,
	cursorType: 'pointer',
	primaryColor: 'luncheonPurple',
	primaryShade: 2,
});

type Props = Readonly<{
	children: React.ReactNode;
}>;

export default function CustomMantine(props: Props) {
	return (
		<MantineProvider defaultColorScheme="auto" theme={theme}>
			{props.children}
		</MantineProvider>
	);
}

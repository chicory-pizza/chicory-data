import '@mantine/core/styles.css';

import {
	createTheme,
	type CSSVariablesResolver,
	type MantineColorsTuple,
	MantineProvider,
	Modal,
} from '@mantine/core';
import {ModalsProvider} from '@mantine/modals';

import AlertContextModal from './AlertContextModal';

// Theme
const cssVariablesResolver: CSSVariablesResolver = () => ({
	variables: {},
	light: {
		'--mantine-color-body': '#eee',
	},
	dark: {
		'--mantine-color-body': '#1c1c1c',
		'--mantine-color-text': '#fff',
	},
});

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

// Modals
const modals = {
	alert: AlertContextModal,
};

declare module '@mantine/modals' {
	export interface MantineModalsOverride {
		modals: typeof modals;
	}
}

type Props = Readonly<{
	children: React.ReactNode;
}>;

export default function CustomMantine(props: Props) {
	return (
		<MantineProvider
			cssVariablesResolver={cssVariablesResolver}
			defaultColorScheme="auto"
			theme={theme}
		>
			<ModalsProvider modals={modals}>{props.children}</ModalsProvider>
		</MantineProvider>
	);
}

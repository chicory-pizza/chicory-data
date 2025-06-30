import '@mantine/core/styles.css';

import {
	createTheme,
	type CSSVariablesResolver,
	MantineProvider,
} from '@mantine/core';
import {ModalsProvider} from '@mantine/modals';

import mantineModals from './common/modals/mantineModals';

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

const theme = createTheme({
	colors: {
		// https://mantine.dev/colors-generator/
		luncheonPurple: [
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
		],
		luncheonOrange: [
			'#ffece6',
			'#ffd7ce',
			'#ffa694',
			'#fe7f65',
			'#fd5937',
			'#fe411a',
			'#fe340b',
			'#e32600',
			'#cb1f00',
			'#b11300',
		],
	},
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
		<MantineProvider
			cssVariablesResolver={cssVariablesResolver}
			defaultColorScheme="auto"
			theme={theme}
		>
			<ModalsProvider modals={mantineModals}>{props.children}</ModalsProvider>
		</MantineProvider>
	);
}

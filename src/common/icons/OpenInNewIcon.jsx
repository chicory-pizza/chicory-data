// @flow strict

import styles from './Icon.module.css';

type Props = $ReadOnly<{
	size: string,
}>;

// https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Aopen_in_new%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4048
export default function OpenInNewIcon(props: Props): React$Node {
	return (
		<svg
			className={styles.svg}
			style={{width: props.size, height: props.size}}
			viewBox="0 0 48 48"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z" />
		</svg>
	);
}

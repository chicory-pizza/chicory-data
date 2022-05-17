// @flow strict

import styles from './Spinner.module.css';

type Props = $ReadOnly<{
	size: number,
}>;

export default function Spinner(props: Props): React$Node {
	return (
		<div
			className={styles.spinner}
			style={{
				width: props.size,
				height: props.size,
			}}
		/>
	);
}

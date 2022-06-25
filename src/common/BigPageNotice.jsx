// @flow strict

import styles from './BigPageNotice.module.css';

type Props = $ReadOnly<{
	heading: React$Node,
	children: ?React$Node,
}>;

export default function BigPageNotice(props: Props): React$Node {
	return (
		<div className={styles.root}>
			<div className={styles.heading}>{props.heading}</div>

			{props.children}
		</div>
	);
}

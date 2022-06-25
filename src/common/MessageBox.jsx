// @flow strict

import styles from './MessageBox.module.css';

type Props = $ReadOnly<{
	message: React$Node,
	type: 'ERROR' | 'INFO',
}>;

export default function MessageBox(props: Props): React$Node {
	return (
		<div className={styles.box}>
			{props.type === 'ERROR' ? '⚠️' : props.type === 'INFO' ? 'ℹ️' : ''}️{' '}
			{props.message}
		</div>
	);
}

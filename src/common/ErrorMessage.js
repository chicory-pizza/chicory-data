// @flow strict

import styles from './ErrorMessage.module.css';

type Props = $ReadOnly<{
	message: string,
	type?: 'ERROR' | 'INFO',
}>;

export default function ErrorMessage(props: Props): React$Node {
	const type = props.type ?? 'ERROR';

	return (
		<div className={styles.box}>
			{type === 'ERROR' ? '⚠' : 'ℹ️'}️ {props.message}
		</div>
	);
}

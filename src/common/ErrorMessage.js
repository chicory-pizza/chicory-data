// @flow strict

import styles from './ErrorMessage.module.css';

type Props = $ReadOnly<{
	message: string,
}>;

export default function ErrorMessage({message}: Props): React$Node {
	return <div className={styles.box}>⚠️ {message}</div>;
}

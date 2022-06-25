// @flow strict

import styles from './CloseButton.module.css';
import CloseIcon from './CloseIcon';

type Props = $ReadOnly<{
	color: string,
	label: string,
	onClick: (ev: SyntheticMouseEvent<HTMLButtonElement>) => mixed,
	size: string,
}>;

export default function CloseButton(props: Props): React$Node {
	return (
		<button
			aria-label={props.label}
			className={styles.button}
			onClick={props.onClick}
			title={props.label}
			type="button"
		>
			<CloseIcon color={props.color} size={props.size} />
		</button>
	);
}

// @flow strict

import styles from './CloseButton.module.css';
import CloseIcon from './icons/CloseIcon';

type Props = $ReadOnly<{
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
			<CloseIcon size={props.size} />
		</button>
	);
}

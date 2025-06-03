import styles from './CloseButton.module.css';
import CloseIcon from './icons/CloseIcon';

type Props = Readonly<{
	label: string;
	onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
	size: string;
}>;

export default function CloseButton(props: Props) {
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

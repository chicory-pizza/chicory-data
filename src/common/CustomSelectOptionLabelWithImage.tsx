import styles from './CustomSelectOptionLabelWithImage.module.css';

type Props = Readonly<{
	image: React.ReactNode;
	label: React.ReactNode;
}>;

export default function CustomSelectOptionLabelWithImage(props: Props) {
	return (
		<div className={styles.wrap}>
			{props.image}
			<span className={styles.label}>{props.label}</span>
		</div>
	);
}

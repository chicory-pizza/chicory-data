import styles from './Spinner.module.css';

type Props = Readonly<{
	size: number;
}>;

export default function Spinner(props: Props) {
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

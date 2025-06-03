import styles from './BigPageNotice.module.css';

type Props = Readonly<{
	heading: React.ReactNode;
	children?: React.ReactNode;
}>;

export default function BigPageNotice(props: Props) {
	return (
		<div className={styles.root}>
			<div className={styles.heading}>{props.heading}</div>

			{props.children}
		</div>
	);
}

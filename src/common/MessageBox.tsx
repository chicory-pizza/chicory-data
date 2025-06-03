import styles from './MessageBox.module.css';

type Props = Readonly<{
	message: React.ReactNode;
	type: 'ERROR' | 'INFO';
}>;

export default function MessageBox(props: Props) {
	return (
		<div className={styles.box}>
			{props.type === 'ERROR' ? '⚠️' : props.type === 'INFO' ? 'ℹ️' : ''}️{' '}
			{props.message}
		</div>
	);
}

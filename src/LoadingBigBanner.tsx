import styles from './LoadingBigBanner.module.css';

export default function LoadingBigBanner() {
	return (
		<div className={styles.root}>
			<span className={styles.text1}>L</span>
			<span className={styles.text2}>o</span>
			<span className={styles.text3}>a</span>
			<span className={styles.text4}>d</span>
			<span className={styles.text1}>i</span>
			<span className={styles.text2}>n</span>
			<span className={styles.text3}>g</span>
			<span className={styles.text4}>.</span>
			<span className={styles.text1}>.</span>
			<span className={styles.text2}>.</span>
		</div>
	);
}

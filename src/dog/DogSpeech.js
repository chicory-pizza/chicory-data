// @flow strict

import styles from './DogSpeech.module.css';

export default function DogSpeech(): React$Node {
	return (
		<div className={styles.speechOuter}>
			<div className={styles.speechWrap}>
				<div className={styles.speechBody} contentEditable={true}>
					Hello!
				</div>

				<div className={styles.speechArrow}></div>
			</div>
		</div>
	);
}

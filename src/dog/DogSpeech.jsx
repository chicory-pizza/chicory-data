// @flow strict

import getFontStyle from '../fonts/getFontStyle';

import styles from './DogSpeech.module.css';

type Props = $ReadOnly<{
	font: string,
	text: string,
}>;

export default function DogSpeech(props: Props): React$Node {
	const fontStyle = getFontStyle(props.font);

	return (
		<div className={styles.speechOuter}>
			<div className={styles.speechWrap}>
				<div className={styles.speechBody + ' ' + fontStyle}>{props.text}</div>

				<div className={styles.speechArrow}></div>
			</div>
		</div>
	);
}

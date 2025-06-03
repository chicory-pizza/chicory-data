import getFontStyle from '../fonts/getFontStyle';

import styles from './DogSpeech.module.css';

type Props = Readonly<{
	font: string;
	text: string;
}>;

export default function DogSpeech(props: Props) {
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

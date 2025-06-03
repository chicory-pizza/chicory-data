import pizza from './levelpreview-noviews.png';
import styles from './LevelPreviewNoViews.module.css';

export default function LevelPreviewNoViews() {
	return (
		<div className={styles.root}>
			<img
				alt=""
				className={styles.image}
				height={236 / 2}
				src={pizza}
				width={306 / 2}
			/>
			No view selected
		</div>
	);
}

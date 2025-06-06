import MessageBox from '../../common/MessageBox';
import {SCREEN_WIDTH} from '../GeoConstants';
import {AVAILABLE_IN_GAME_SCREENSHOTS} from '../types/AvailableInGameScreenshots';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';

import styles from './LevelInGamePreview.module.css';

type Props = Readonly<{
	currentCoordinates: [number, number, number];
	semiTransparent: boolean;
}>;

export default function LevelInGamePreview({
	currentCoordinates,
	semiTransparent,
}: Props) {
	const levelId = convertCoordinatesToLevelId(currentCoordinates);

	if (!AVAILABLE_IN_GAME_SCREENSHOTS.includes(levelId)) {
		return (
			<div className={styles.root}>
				<MessageBox
					message={`In-game screenshot for level ${currentCoordinates.join(
						', '
					)} is not available yet`}
					type="INFO"
				/>
			</div>
		);
	}

	const urlPrefix = import.meta.env.VITE_IN_GAME_SCREENSHOT_URL_PREFIX;
	if (urlPrefix == null) {
		return (
			<div className={styles.root}>
				<MessageBox
					message="In-game screenshots are not available on this app build, contact the website owner about this problem"
					type="ERROR"
				/>
			</div>
		);
	}

	const src = urlPrefix + levelId + '.png';

	return (
		<div
			className={
				styles.root + ' ' + (semiTransparent ? styles.semiTransparent : '')
			}
		>
			<img
				alt={`Level preview for level ${currentCoordinates.join(', ')}`}
				className={styles.image}
				draggable={false}
				height={1080}
				// force reload
				key={levelId}
				src={src}
				width={SCREEN_WIDTH}
			/>
		</div>
	);
}

// @flow strict

import MessageBox from '../../common/MessageBox';
import {SCREEN_WIDTH} from '../GeoConstants';
import {AVAILABLE_IN_GAME_SCREENSHOTS} from '../types/AvailableInGameScreenshots';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';

import styles from './LevelInGamePreview.module.css';

type Props = $ReadOnly<{
	currentCoordinates: [number, number, number],
}>;

export default function LevelInGamePreview({
	currentCoordinates,
}: Props): React$Node {
	const levelId = convertCoordinatesToLevelId(currentCoordinates);

	if (!AVAILABLE_IN_GAME_SCREENSHOTS.includes(levelId)) {
		return (
			<MessageBox
				message={`In-game screenshot for level ${currentCoordinates.join(
					', '
				)} is not available yet`}
				type="INFO"
			/>
		);
	}

	const urlPrefix = process.env.REACT_APP_IN_GAME_SCREENSHOT_URL_PREFIX;
	if (urlPrefix == null) {
		return (
			<MessageBox
				message="This feature is not available on this app build, contact the website owner for details"
				type="ERROR"
			/>
		);
	}

	const src = urlPrefix + levelId + '.png';

	return (
		<img
			alt={`Level preview for level ${currentCoordinates.join(', ')}`}
			className={styles.image}
			height={1080}
			// force reload
			key={levelId}
			src={src}
			width={SCREEN_WIDTH}
		/>
	);
}

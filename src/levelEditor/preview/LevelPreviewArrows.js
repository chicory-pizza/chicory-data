// @flow strict

import {useCurrentCoordinatesNonNullable} from '../CurrentCoordinatesContext';

import styles from './LevelPreviewArrows.module.css';

type Props = $ReadOnly<{}>;

export default function LevelPreviewArrows(props: Props): React$Node {
	const [currentCoordinates, setNewCoordinates] =
		useCurrentCoordinatesNonNullable();

	const goUp = [
		currentCoordinates[0],
		currentCoordinates[1],
		currentCoordinates[2] - 1,
	];
	const goLeft = [
		currentCoordinates[0],
		currentCoordinates[1] - 1,
		currentCoordinates[2],
	];
	const goRight = [
		currentCoordinates[0],
		currentCoordinates[1] + 1,
		currentCoordinates[2],
	];
	const goBottom = [
		currentCoordinates[0],
		currentCoordinates[1],
		currentCoordinates[2] + 1,
	];

	return (
		<>
			<button
				className={styles.arrowBox + ' ' + styles.top}
				onClick={() => setNewCoordinates(goUp)}
				title={'Go up to level ' + goUp.join(', ')}
				type="button"
			>
				↑
			</button>

			<button
				className={styles.arrowBox + ' ' + styles.left}
				onClick={() => setNewCoordinates(goLeft)}
				title={'Go left to level ' + goLeft.join(', ')}
				type="button"
			>
				←
			</button>

			<button
				className={styles.arrowBox + ' ' + styles.right}
				onClick={() => setNewCoordinates(goRight)}
				title={'Go right to level ' + goRight.join(', ')}
				type="button"
			>
				→
			</button>

			<button
				className={styles.arrowBox + ' ' + styles.bottom}
				onClick={() => setNewCoordinates(goBottom)}
				title={'Go bottom to level ' + goBottom.join(', ')}
				type="button"
			>
				↓
			</button>
		</>
	);
}

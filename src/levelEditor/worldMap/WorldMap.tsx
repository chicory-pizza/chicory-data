import {useCurrentCoordinates} from '../CurrentCoordinatesContext';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';
import convertLevelIdToCoordinates from '../util/convertLevelIdToCoordinates';
import isSameCoordinates from '../util/isSameCoordinates';
import sortCompareCoordinates from '../util/sortCompareCoordinates';
import {useWorldDataNonNullable} from '../WorldDataContext';

import styles from './WorldMap.module.css';
import WorldMapButton from './WorldMapButton';

export default function WorldMap() {
	const {worldData} = useWorldDataNonNullable();
	const [currentCoordinates, setNewCoordinates] = useCurrentCoordinates();

	let minX = 0;
	let minY = 0;

	const maybePlaceholderLevelId = currentCoordinates
		? convertCoordinatesToLevelId(currentCoordinates)
		: null;
	const levels = Object.keys(worldData)
		.concat(
			maybePlaceholderLevelId != null &&
				worldData[maybePlaceholderLevelId] == null
				? [maybePlaceholderLevelId]
				: []
		)
		.reduce<Array<[number, number, number]>>((previous, levelId) => {
			const coordinates = convertLevelIdToCoordinates(levelId);

			// check layer
			const currentLayer = currentCoordinates ? currentCoordinates[0] : 0;
			if (coordinates[0] !== currentLayer) {
				return previous;
			}

			minX = Math.min(minX, coordinates[1]);
			minY = Math.min(minY, coordinates[2]);

			previous.push(coordinates);
			return previous;
		}, [])
		.sort((a, b) => {
			return sortCompareCoordinates(a, b);
		});

	return (
		<div className={styles.root}>
			{levels.map((coordinates) => {
				const levelId = convertCoordinatesToLevelId(coordinates);
				const level = worldData[levelId];

				return (
					<WorldMapButton
						isCurrent={
							currentCoordinates != null &&
							isSameCoordinates(currentCoordinates, coordinates)
						}
						// optimization: try to recycle if possible
						key={coordinates[1].toString() + '_' + coordinates[2].toString()}
						level={level}
						levelId={levelId}
						minX={minX}
						minY={minY}
						onSetNewCoordinates={setNewCoordinates}
					/>
				);
			})}
		</div>
	);
}

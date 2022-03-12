// @flow strict

import {useCurrentCoordinates} from '../CurrentCoordinatesContext';
import type {LevelType} from '../types/LevelType';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';
import convertLevelIdToCoordinates from '../util/convertLevelIdToCoordinates';
import isSameCoordinates from '../util/isSameCoordinates';
import sortCompareCoordinates from '../util/sortCompareCoordinates';
import {useWorldDataNonNullable} from '../WorldDataContext';

import styles from './WorldMap.module.css';
import WorldMapButton from './WorldMapButton';

type Props = $ReadOnly<{
	drawPreviews: boolean,
}>;

export default function WorldMap(props: Props): React$Node {
	const [worldData] = useWorldDataNonNullable();
	const [currentCoordinates, setNewCoordinates] = useCurrentCoordinates();

	let minX = 0;
	let minY = 0;

	const maybePlaceholderLevelId =
		convertCoordinatesToLevelId(currentCoordinates);
	const levels = Object.keys(worldData)
		.concat(
			worldData[maybePlaceholderLevelId] == null
				? [maybePlaceholderLevelId]
				: []
		)
		.map((levelId) => {
			const coordinates = convertLevelIdToCoordinates(levelId);

			// check layer
			if (coordinates[0] !== currentCoordinates[0]) {
				return null;
			}

			minX = Math.min(minX, coordinates[1]);
			minY = Math.min(minY, coordinates[2]);

			return coordinates;
		})
		.filter(Boolean)
		.sort((a, b) => {
			return sortCompareCoordinates(a, b);
		});

	return (
		<div
			className={
				styles.root + ' ' + (props.drawPreviews ? styles.drawPreviews : '')
			}
		>
			{levels.map((coordinates) => {
				const levelId = convertCoordinatesToLevelId(coordinates);
				const level: ?LevelType = worldData[levelId];

				return (
					<WorldMapButton
						drawPreviews={props.drawPreviews}
						isCurrent={isSameCoordinates(currentCoordinates, coordinates)}
						level={level}
						levelId={levelId}
						// optimization: try to recycle if possible
						key={coordinates[1] + '_' + coordinates[2]}
						minX={minX}
						minY={minY}
						onSetNewCoordinates={setNewCoordinates}
					/>
				);
			})}
		</div>
	);
}

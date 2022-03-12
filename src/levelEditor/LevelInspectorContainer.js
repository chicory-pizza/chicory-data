// @flow strict

import {useCurrentCoordinatesNonNullable} from './CurrentCoordinatesContext';
import LevelInspector from './LevelInspector';
import LevelNotExist from './LevelNotExist';
import convertCoordinatesToLevelId from './util/convertCoordinatesToLevelId';
import {useWorldDataNonNullable} from './WorldDataContext';

export default function LevelInspectorContainer(): React$Node {
	const [currentCoordinates] = useCurrentCoordinatesNonNullable();
	const [worldData] = useWorldDataNonNullable();

	const level = worldData[convertCoordinatesToLevelId(currentCoordinates)];
	if (level == null) {
		return <LevelNotExist />;
	}

	return (
		<LevelInspector currentCoordinates={currentCoordinates} level={level} />
	);
}

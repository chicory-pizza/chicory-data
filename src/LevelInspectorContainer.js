// @flow strict

import {useCurrentCoordinates} from './CurrentCoordinatesContext';
import LevelInspector from './LevelInspector';
import type {LevelType} from './types/LevelType';
import convertCoordinatesToLevelId from './util/convertCoordinatesToLevelId';

type Props = $ReadOnly<{
	levels: {[levelId: string]: LevelType},
	setLevelsData: ({[levelId: string]: LevelType}) => mixed,
}>;

export default function LevelInspectorContainer(props: Props): React$Node {
	const [currentCoordinates] = useCurrentCoordinates();

	function setSingleLevelData(newLevelData: LevelType) {
		props.setLevelsData({
			...props.levels,
			[convertCoordinatesToLevelId(currentCoordinates)]: newLevelData,
		});
	}

	return (
		<LevelInspector
			level={props.levels[convertCoordinatesToLevelId(currentCoordinates)]}
			setSingleLevelData={setSingleLevelData}
		/>
	);
}

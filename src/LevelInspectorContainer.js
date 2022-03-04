// @flow strict

import {useCurrentCoordinates} from './CurrentCoordinatesContext';
import LevelInspector from './LevelInspector';
import LevelNotExist from './LevelNotExist';
import type {LevelType} from './types/LevelType';
import convertCoordinatesToLevelId from './util/convertCoordinatesToLevelId';

type Props = $ReadOnly<{
	levels: {[levelId: string]: LevelType},
	setLevelsData: ({[levelId: string]: LevelType}) => mixed,
}>;

export default function LevelInspectorContainer(props: Props): React$Node {
	const [currentCoordinates] = useCurrentCoordinates();

	function setSingleLevelData(newLevelData: ?LevelType) {
		// delete level
		if (newLevelData == null) {
			const newLevels = {...props.levels};
			delete newLevels[convertCoordinatesToLevelId(currentCoordinates)];
			props.setLevelsData(newLevels);

			return;
		}

		props.setLevelsData({
			...props.levels,
			[convertCoordinatesToLevelId(currentCoordinates)]: newLevelData,
		});
	}

	function onCreateButtonClick() {
		props.setLevelsData({
			...props.levels,
			[convertCoordinatesToLevelId(currentCoordinates)]: {
				ambiance: '-1',
				objects: [],
				geo: 'eJztwTEBAAAAwqD1T20LL6AAAADgbQ6OAAE=',
				foley: '0 ',
				palette: '',
				area: '',
				transition: '0',
				music: '-1',
				decos: [],
				object_id: '',
				name: '',
			},
		});
	}

	const level = props.levels[convertCoordinatesToLevelId(currentCoordinates)];
	if (level == null) {
		return <LevelNotExist onCreateButtonClick={onCreateButtonClick} />;
	}

	return (
		<LevelInspector level={level} setSingleLevelData={setSingleLevelData} />
	);
}

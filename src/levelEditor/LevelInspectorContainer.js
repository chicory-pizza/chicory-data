// @flow strict

import {useCurrentCoordinates} from './CurrentCoordinatesContext';
import LevelInspector from './LevelInspector';
import LevelNotExist from './LevelNotExist';
import type {LevelType} from './types/LevelType';
import convertCoordinatesToLevelId from './util/convertCoordinatesToLevelId';
import {useWorldDataNonNullable} from './WorldDataContext';

export default function LevelInspectorContainer(): React$Node {
	const [currentCoordinates] = useCurrentCoordinates();
	const [worldData, setWorldData] = useWorldDataNonNullable();

	function setSingleLevelData(newLevelData: ?LevelType) {
		// delete level
		if (newLevelData == null) {
			const newLevels = {...worldData};
			delete newLevels[convertCoordinatesToLevelId(currentCoordinates)];
			setWorldData(newLevels);

			return;
		}

		setWorldData({
			...worldData,
			[convertCoordinatesToLevelId(currentCoordinates)]: newLevelData,
		});
	}

	function onCreateButtonClick() {
		setWorldData({
			...worldData,
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

	const level = worldData[convertCoordinatesToLevelId(currentCoordinates)];
	if (level == null) {
		return <LevelNotExist onCreateButtonClick={onCreateButtonClick} />;
	}

	return (
		<LevelInspector
			currentCoordinates={currentCoordinates}
			level={level}
			setSingleLevelData={setSingleLevelData}
		/>
	);
}

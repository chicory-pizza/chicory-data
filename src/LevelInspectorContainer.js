// @flow strict

import type {LevelType} from './types/LevelType';

import convertCoordinatesToLevelId from './util/convertCoordinatesToLevelId';
import {useCurrentCoordinates} from './CurrentCoordinatesContext';
import LevelInspector from './LevelInspector';
import React from 'react';

type Props = {
	levels: {[levelId: string]: LevelType},
};

export default function LevelInspectorContainer(props: Props): React$Node {
	const [currentCoordinates] = useCurrentCoordinates();

	return (
		<LevelInspector
			level={props.levels[convertCoordinatesToLevelId(currentCoordinates)]}
		/>
	);
}

// @flow strict

import React from 'react';

import {useCurrentCoordinates} from './CurrentCoordinatesContext';
import LevelInspector from './LevelInspector';
import type {LevelType} from './types/LevelType';
import convertCoordinatesToLevelId from './util/convertCoordinatesToLevelId';

type Props = $ReadOnly<{
	levels: {[levelId: string]: LevelType},
}>;

export default function LevelInspectorContainer(props: Props): React$Node {
	const [currentCoordinates] = useCurrentCoordinates();

	return (
		<LevelInspector
			level={props.levels[convertCoordinatesToLevelId(currentCoordinates)]}
		/>
	);
}

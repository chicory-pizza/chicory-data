// @flow strict

import type {LevelType} from '../types/LevelType';

import convertCoordinatesToLevelId from './convertCoordinatesToLevelId';

export default function getLevelLabel(
	coordinates: [number, number, number],
	level: ?LevelType
): string {
	const coordinatesText = coordinates.join(', ');

	const sublabel =
		level != null
			? level.name !== convertCoordinatesToLevelId(coordinates)
				? level.name
				: level.area !== 'none'
				? level.area
				: level.palette
			: '';

	return coordinatesText + (sublabel !== '' ? ` (${sublabel})` : '');
}

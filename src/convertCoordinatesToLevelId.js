// @flow strict

export default function convertCoordinatesToLevelId(
	coordinates: [number, number, number]
): string {
	return coordinates.join('_');
}

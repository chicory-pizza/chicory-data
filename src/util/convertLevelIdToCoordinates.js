// @flow strict

const VALID_ID_REGEX = /^(-?\d+)_(-?\d+)_(-?\d+)$/;

export default function convertLevelIdToCoordinates(
	levelId: string
): [number, number, number] {
	const coordinates = levelId.match(VALID_ID_REGEX);

	if (coordinates == null) {
		throw new Error('Not a valid level ID');
	}

	return [
		parseInt(coordinates[1], 10),
		parseInt(coordinates[2], 10),
		parseInt(coordinates[3], 10),
	];
}

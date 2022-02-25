// @flow strict

export default function convertLevelIdToCoordinates(
	levelId: string
): [number, number, number] {
	const split = levelId.split('_');

	if (split.length !== 3) {
		throw new Error('Not a valid level ID');
	}

	return [
		parseInt(split[0], 10),
		parseInt(split[1], 10),
		parseInt(split[2], 10),
	];
}

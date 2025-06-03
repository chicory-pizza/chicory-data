export default function convertNullableCoordinatesToNonNull(
	coordinates: [number | null, number | null, number | null]
): [number, number, number] | null {
	if (
		coordinates[0] != null &&
		coordinates[1] != null &&
		coordinates[2] != null
	) {
		return [coordinates[0], coordinates[1], coordinates[2]];
	}

	return null;
}

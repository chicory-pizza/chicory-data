import convertNullableCoordinatesToNonNull from '../convertNullableCoordinatesToNonNull';

test('converts valid', () => {
	expect(convertNullableCoordinatesToNonNull([1, 2, 3])).toEqual([1, 2, 3]);
});

test('returns null for invalid', () => {
	expect(convertNullableCoordinatesToNonNull([1, 2, null])).toBeNull();
});

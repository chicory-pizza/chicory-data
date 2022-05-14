// @flow strict

import convertNullableCoordinatesToNonNull from '../convertNullableCoordinatesToNonNull';

test('converts valid', async () => {
	expect(convertNullableCoordinatesToNonNull([1, 2, 3])).toEqual([1, 2, 3]);
});

test('returns null for invalid', async () => {
	expect(convertNullableCoordinatesToNonNull([1, 2, null])).toBeNull();
});

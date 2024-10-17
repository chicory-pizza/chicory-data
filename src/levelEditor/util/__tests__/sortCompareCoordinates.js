// @flow strict

import sortCompareCoordinates from '../sortCompareCoordinates';

test('sort coordinates', async () => {
	// layer
	expect(sortCompareCoordinates([1, 0, 0], [2, 0, 0])).toBe(-1);
	expect(sortCompareCoordinates([2, 0, 0], [1, 0, 0])).toBe(1);

	// x
	expect(sortCompareCoordinates([0, 1, 0], [0, 2, 0])).toBe(-1);
	expect(sortCompareCoordinates([0, 2, 0], [0, 1, 0])).toBe(1);

	// y
	expect(sortCompareCoordinates([0, 0, 1], [0, 0, 2])).toBe(-1);
	expect(sortCompareCoordinates([0, 0, 2], [0, 0, 1])).toBe(1);

	expect(sortCompareCoordinates([1, 2, 3], [1, 2, 3])).toBe(0);
});

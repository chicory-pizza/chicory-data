// @flow strict

import sortCompareCoordinates from '../sortCompareCoordinates';

test('sort coordinates', async () => {
	// layer
	expect(sortCompareCoordinates([1, 0, 0], [2, 0, 0])).toEqual(-1);
	expect(sortCompareCoordinates([2, 0, 0], [1, 0, 0])).toEqual(1);

	// x
	expect(sortCompareCoordinates([0, 1, 0], [0, 2, 0])).toEqual(-1);
	expect(sortCompareCoordinates([0, 2, 0], [0, 1, 0])).toEqual(1);

	// y
	expect(sortCompareCoordinates([0, 0, 1], [0, 0, 2])).toEqual(-1);
	expect(sortCompareCoordinates([0, 0, 2], [0, 0, 1])).toEqual(1);

	expect(sortCompareCoordinates([1, 2, 3], [1, 2, 3])).toEqual(0);
});

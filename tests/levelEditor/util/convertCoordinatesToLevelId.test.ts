import {expect, test} from 'vitest';

import convertCoordinatesToLevelId from '../../../src/levelEditor/util/convertCoordinatesToLevelId';

test('converts coordinates', () => {
	expect(convertCoordinatesToLevelId([1, 2, 3])).toBe('1_2_3');
});

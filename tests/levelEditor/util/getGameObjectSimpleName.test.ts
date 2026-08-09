import {expect, test} from 'vitest';

import getGameObjectSimpleName from '../../../src/levelEditor/util/getGameObjectSimpleName';

test('returns the simplified game object name', () => {
	expect(getGameObjectSimpleName('objDog')).toBe('Dog');
	expect(getGameObjectSimpleName('custom')).toBe('custom');
});

// @flow strict

import getGameObjectSimpleName from '../getGameObjectSimpleName';

test('returns the simplified game object name', async () => {
	expect(getGameObjectSimpleName('objDog')).toEqual('Dog');
	expect(getGameObjectSimpleName('custom')).toEqual('custom');
});

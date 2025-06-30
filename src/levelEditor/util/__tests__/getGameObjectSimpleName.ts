import getGameObjectSimpleName from '../getGameObjectSimpleName';

test('returns the simplified game object name', () => {
	expect(getGameObjectSimpleName('objDog')).toBe('Dog');
	expect(getGameObjectSimpleName('custom')).toBe('custom');
});

import isSameCoordinates from '../isSameCoordinates';

test('same coordinates', () => {
	expect(isSameCoordinates([1, 2, 3], [1, 2, 3])).toBe(true);

	expect(isSameCoordinates([1, 2, 3], [1, 2, 0])).toBe(false);
});

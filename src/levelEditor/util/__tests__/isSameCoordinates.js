import isSameCoordinates from '../isSameCoordinates';

test('same coordinates', async () => {
	expect(isSameCoordinates([1, 2, 3], [1, 2, 3])).toEqual(true);

	expect(isSameCoordinates([1, 2, 3], [1, 2, 0])).toEqual(false);
});

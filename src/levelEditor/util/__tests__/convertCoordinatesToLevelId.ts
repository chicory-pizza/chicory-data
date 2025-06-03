import convertCoordinatesToLevelId from '../convertCoordinatesToLevelId';

test('converts coordinates', async () => {
	expect(convertCoordinatesToLevelId([1, 2, 3])).toBe('1_2_3');
});

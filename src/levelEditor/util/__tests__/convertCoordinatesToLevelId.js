import convertCoordinatesToLevelId from '../convertCoordinatesToLevelId';

test('converts coordinates', async () => {
	expect(convertCoordinatesToLevelId([1, 2, 3])).toEqual('1_2_3');
});

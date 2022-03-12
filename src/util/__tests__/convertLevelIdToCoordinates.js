import convertLevelIdToCoordinates from '../convertLevelIdToCoordinates';

test('converts level IDs', async () => {
	expect(convertLevelIdToCoordinates('1_2_3')).toEqual([1, 2, 3]);
	expect(convertLevelIdToCoordinates('-1_-2_-3')).toEqual([-1, -2, -3]);
	expect(convertLevelIdToCoordinates('10000_20000_30000')).toEqual([
		10000, 20000, 30000,
	]);

	// Should fail
	expect(() => {
		convertLevelIdToCoordinates('1_');
	}).toThrow('Not a valid level ID');

	expect(() => {
		convertLevelIdToCoordinates('1_2_');
	}).toThrow('Not a valid level ID');

	expect(() => {
		convertLevelIdToCoordinates('1_2_3_4');
	}).toThrow('Not a valid level ID');

	expect(() => {
		convertLevelIdToCoordinates('1_2_3,');
	}).toThrow('Not a valid level ID');
});

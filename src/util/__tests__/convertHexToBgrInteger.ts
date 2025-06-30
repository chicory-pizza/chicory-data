import convertHexToBgrInteger from '../convertHexToBgrInteger';

test('converts hex to BGR integers', () => {
	expect(convertHexToBgrInteger('#b69aff')).toBe(16751286);
	expect(convertHexToBgrInteger('#ffa694')).toBe(9742079);
	expect(convertHexToBgrInteger('#00f3dd')).toBe(14545664);

	expect(convertHexToBgrInteger('#000001')).toBe(65536);
	expect(convertHexToBgrInteger('#010000')).toBe(1);
});

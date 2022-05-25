// @flow strict

import convertHexToBgrInteger from '../convertHexToBgrInteger';

test('converts hex to BGR integers', async () => {
	expect(convertHexToBgrInteger('#b69aff')).toEqual(16751286);
	expect(convertHexToBgrInteger('#ffa694')).toEqual(9742079);
	expect(convertHexToBgrInteger('#00f3dd')).toEqual(14545664);

	expect(convertHexToBgrInteger('#000001')).toEqual(65536);
	expect(convertHexToBgrInteger('#010000')).toEqual(1);
});

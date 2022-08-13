// @flow strict

import convertRgbArrayToString from '../convertRgbArrayToString';

test('converts an array of 3 numbers to HEX', async () => {
	expect(convertRgbArrayToString([1, 2, 3])).toEqual('#010203');

	expect(convertRgbArrayToString([182, 154, 255])).toEqual('#b69aff');
	expect(convertRgbArrayToString([255, 166, 148])).toEqual('#ffa694');
	expect(convertRgbArrayToString([0, 243, 221])).toEqual('#00f3dd');

	expect(convertRgbArrayToString([0, 0, 1])).toEqual('#000001');
	expect(convertRgbArrayToString([1, 0, 0])).toEqual('#010000');
});

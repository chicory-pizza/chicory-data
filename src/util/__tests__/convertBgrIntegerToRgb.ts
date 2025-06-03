import convertBgrIntegerToRgb from '../convertBgrIntegerToRgb';

test('converts BGR colors to RGB', async () => {
	expect(convertBgrIntegerToRgb(16751286)).toEqual([182, 154, 255]); // b69aff
	expect(convertBgrIntegerToRgb(9742079)).toEqual([255, 166, 148]); // ffa694
	expect(convertBgrIntegerToRgb(14545664)).toEqual([0, 243, 221]); // 00f3dd

	expect(convertBgrIntegerToRgb(65536)).toEqual([0, 0, 1]); // 000001
	expect(convertBgrIntegerToRgb(1)).toEqual([1, 0, 0]); // 010000
});

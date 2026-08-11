import {expect, test} from 'vitest';

import convertBgrIntegerToRgbArray from '../../src/util/convertBgrIntegerToRgbArray';

test('converts BGR colors to RGB', () => {
	expect(convertBgrIntegerToRgbArray(16751286)).toEqual([182, 154, 255]); // b69aff
	expect(convertBgrIntegerToRgbArray(9742079)).toEqual([255, 166, 148]); // ffa694
	expect(convertBgrIntegerToRgbArray(14545664)).toEqual([0, 243, 221]); // 00f3dd

	expect(convertBgrIntegerToRgbArray(65536)).toEqual([0, 0, 1]); // 000001
	expect(convertBgrIntegerToRgbArray(1)).toEqual([1, 0, 0]); // 010000
});

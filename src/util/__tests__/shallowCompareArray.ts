import shallowCompareArray from '../shallowCompareArray';

test('old array is returned if both arrays have same values', () => {
	const oldArr = [1, 2, 3, 'abc'];
	const newArr = [1, 2, 3, 'abc'];
	expect(shallowCompareArray(oldArr, newArr)).toBe(oldArr);
});

test('new array is returned if new array length is different', () => {
	const oldArr = [1, 2, 3];
	const newArr = [1, 2, 3, 4];
	expect(shallowCompareArray(oldArr, newArr)).toBe(newArr);
});

test('new array is returned if new array values are different', () => {
	const oldArr = [1, 2, 3];
	const newArr = [1, 2, 4];
	expect(shallowCompareArray(oldArr, newArr)).toBe(newArr);
});

test('new array is returned if new array types are different', () => {
	// [].join() fails this
	const oldArr = [1, 2, 3];
	const newArr = [1, '2', 3];
	expect(shallowCompareArray(oldArr, newArr)).toBe(newArr);
});

test('sparse: old array is returned if both arrays have same values', () => {
	const oldArr = Array(5);
	oldArr[4] = 'test';

	const newArr = Array(5);
	newArr[4] = 'test';
	expect(shallowCompareArray(oldArr, newArr)).toBe(oldArr);
});

test('sparse: new array is returned if new array values are different', () => {
	// [].every() fails this
	const oldArr = Array(5);
	oldArr[4] = 'test';

	const newArr = Array(5);
	newArr[3] = 'no';
	newArr[4] = 'test';
	expect(shallowCompareArray(oldArr, newArr)).toBe(newArr);
});

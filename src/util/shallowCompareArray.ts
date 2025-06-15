// If both arrays are the same, return the old array reference as optimization
export default function shallowCompareArray<T>(
	oldArr: ReadonlyArray<T>,
	newArr: ReadonlyArray<T>
): ReadonlyArray<T> {
	if (oldArr.length !== newArr.length) {
		return newArr;
	}

	for (let i = 0; i < oldArr.length; i += 1) {
		if (oldArr[i] !== newArr[i]) {
			return newArr;
		}
	}

	return oldArr;
}

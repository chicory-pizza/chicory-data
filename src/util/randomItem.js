// @flow strict

export default function randomItem<T>(arr: $ReadOnlyArray<T>): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

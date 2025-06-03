export default function randomItem<T>(arr: ReadonlyArray<T>): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

// @flow strict

declare module 'react-use' {
	declare hook useInterval(callback: () => mixed, delay?: ?number): boolean;

	declare hook useMedia(query: string, defaultState?: boolean): boolean;

	declare hook usePrevious<T>(state: T): T;

	declare hook useTitle(
		title: string,
		options?: {
			restoreOnUnmount?: boolean,
		}
	): void;
}

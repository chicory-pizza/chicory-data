declare module 'react-use' {
	declare function useInterval(callback: () => mixed, delay?: ?number): boolean;

	declare function useMedia(query: string, defaultState?: boolean): boolean;

	declare function usePrevious<T>(state: T): T;
}

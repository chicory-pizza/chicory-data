declare module 'react-dom/client' {
	declare type RootType = {
		render(children: React$Node): void,
		unmount(): void,
		...
	};

	declare type CreateRootOptions = {
		unstable_strictMode?: boolean,
		unstable_concurrentUpdatesByDefault?: boolean,
		identifierPrefix?: string,
		onRecoverableError?: (error: mixed) => void,
		...
	};

	declare function createRoot(
		container: Element | DocumentFragment,
		options?: CreateRootOptions
	): RootType;
}

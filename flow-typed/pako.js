// @flow strict

type StrategyValues = 1 | 2 | 3 | 4 | 0;

type DeflateFunctionOptions = {
	level?: ?(-1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9),
	windowBits?: ?number,
	memLevel?: ?number,
	strategy?: ?StrategyValues,
	dictionary?: any,
	raw?: ?boolean,
};

type InflateFunctionOptions = {
	windowBits?: ?number,
	raw?: ?boolean,
	to?: ?'string',
};

declare module 'pako' {
	/**
	 * Compress data with deflate algorithm and options.
	 */
	declare function deflate(
		data: Uint8Array | ArrayBuffer | string,
		options?: DeflateFunctionOptions
	): Uint8Array;

	/**
	 * The same as deflate, but creates raw data, without wrapper (header and adler32 crc).
	 */
	declare function deflateRaw(
		data: Uint8Array | ArrayBuffer | string,
		options?: DeflateFunctionOptions
	): Uint8Array;

	/**
	 * Decompress data with inflate/ungzip and options. Autodetect format via wrapper header
	 * by default. That's why we don't provide separate ungzip method.
	 */
	declare function inflate(
		data: Uint8Array | ArrayBuffer,
		options: InflateFunctionOptions & {to: 'string'}
	): string;

	declare function inflate(
		data: Uint8Array | ArrayBuffer,
		options?: InflateFunctionOptions
	): Uint8Array;
}

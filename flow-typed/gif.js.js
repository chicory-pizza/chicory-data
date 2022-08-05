// @flow strict

declare module 'gif.js' {
	declare type DitherMethod =
		| 'FloydSteinberg'
		| 'FloydSteinberg-serpentine'
		| 'FalseFloydSteinberg'
		| 'FalseFloydSteinberg-serpentine'
		| 'Stucki'
		| 'Stucki-serpentine'
		| 'Atkinson'
		| 'Atkinson-serpentine';

	declare export default class GIF {
		constructor(options: {
			repeat?: number,
			quality?: number,
			workers?: number,
			workerScript?: string,
			background?: string,
			width?: ?number,
			height?: ?number,
			transparent?: ?string,
			dither?: DitherMethod | boolean | null,
			debug?: boolean,
		}): GIF;

		addFrame(
			image:
				| CanvasImageSource
				| CanvasRenderingContext2D
				| WebGLRenderingContext
				| ImageData,
			options?: {
				delay?: number,
				copy?: boolean,
				dispose?: number,
			}
		): void;

		on(
			event: 'finished',
			listener: (image: Blob, data: Uint8Array) => void
		): this;

		once(
			event: 'finished',
			listener: (image: Blob, data: Uint8Array) => void
		): this;

		render(): void;
	}
}

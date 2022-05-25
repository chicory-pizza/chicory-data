// @flow strict

type FileSystemHandleKind = 'directory' | 'file';

declare class FileSystemHandle {
	+kind: FileSystemHandleKind;
	+name: string;
	isSameEntry(other: FileSystemHandle): boolean;
}

declare class FileSystemFileHandle extends FileSystemHandle {
	+kind: 'file';
	getFile(): Promise<File>;
}

declare class FileWithHandle extends File {
	handle?: FileSystemFileHandle;
}

type WellKnownDirectory =
	| 'desktop'
	| 'documents'
	| 'downloads'
	| 'music'
	| 'pictures'
	| 'videos';

declare module 'browser-fs-access' {
	/**
	 * For opening files, dynamically either loads the File System Access API module
	 * or the legacy method.
	 */
	declare function fileOpen(options?: {
		// Set to `true` for allowing multiple files, defaults to `false`.
		multiple?: boolean,

		// Suggested directory in which the file picker opens. A well-known directory or a file handle.
		startIn?: WellKnownDirectory,

		// By specifying an ID, the user agent can remember different directories for different IDs.
		id?: string,

		// Include an option to not apply any filter in the file picker, defaults to `false`.
		excludeAcceptAllOption?: boolean,

		// List of allowed file extensions (with leading '.'), defaults to `''`.
		extensions?: Array<string>,

		// Textual description for file dialog , defaults to `''`.
		description?: string,

		// List of allowed MIME types, defaults to `*/*`.
		mimeTypes?: Array<string>,
	}): Promise<FileWithHandle>;

	/**
	 * For saving files, dynamically either loads the File System Access API module
	 * or the legacy method.
	 */
	declare function fileSave(
		blobOrPromiseBlobOrResponse: Blob | Promise<Blob> | Response,
		options?: {
			// Suggested file name to use, defaults to `''`.
			fileName?: string,

			// Suggested directory in which the file picker opens. A well-known directory or a file handle.
			startIn?: WellKnownDirectory,

			// By specifying an ID, the user agent can remember different directories for different IDs.
			id?: string,

			// Include an option to not apply any filter in the file picker, defaults to `false`.
			excludeAcceptAllOption?: boolean,

			// Suggested file extensions (with leading '.'), defaults to `''`.
			extensions?: Array<string>,
		},
		existingHandle?: ?any, // FileSystemFileHandle
		throwIfExistingHandleNotGood?: boolean,
		filePickerShown?: ?() => void
	): Promise<?FileSystemFileHandle>;
}

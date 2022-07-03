// @flow strict

type FileSystemHandlePermissionDescriptor = {
	mode?: 'read' | 'readwrite',
};

declare class FileSystemHandle {
	+kind: 'directory' | 'file';
	+name: string;

	isSameEntry(other: FileSystemHandle): boolean;

	queryPermission: (
		descriptor?: FileSystemHandlePermissionDescriptor
	) => Promise<PermissionState>;
	requestPermission: (
		descriptor?: FileSystemHandlePermissionDescriptor
	) => Promise<PermissionState>;
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
	 * Opens file(s) from disk.
	 */
	declare function fileOpen(options?: {
		// Allow multiple files to be selected. Defaults to `false`.
		multiple?: boolean,

		startIn?: WellKnownDirectory | FileSystemHandle,

		// By specifying an ID, the user agent can remember different directories for different IDs.
		id?: string,

		excludeAcceptAllOption?: boolean,

		// Acceptable file extensions. Defaults to `[""]`.
		extensions?: Array<string>,

		// Suggested file description. Defaults to `""`.
		description: string,

		// Acceptable MIME types. Defaults to `[]`.
		mimeTypes?: Array<string>,
	}): Promise<FileWithHandle>;

	/**
	 * Saves a file to disk.
	 */
	declare function fileSave(
		// To-be-saved `Blob` or `Response`
		blobOrPromiseBlobOrResponse: Blob | Promise<Blob> | Response,

		options?: {
			// Suggested file name. Defaults to `"Untitled"`.
			fileName?: string,

			startIn?: WellKnownDirectory | FileSystemHandle,

			// By specifying an ID, the user agent can remember different directories for different IDs.
			id?: string,

			excludeAcceptAllOption?: boolean,

			// Acceptable file extensions. Defaults to `[""]`.
			extensions?: Array<string>,

			// Suggested file description. Defaults to `""`.
			description: string,

			// Acceptable MIME types. Defaults to `[]`.
			mimeTypes?: Array<string>,
		},

		// A potentially existing file handle for a file to save to. Defaults to `null`.
		existingHandle?: ?FileSystemFileHandle,

		// Determines whether to throw (rather than open a new file save dialog) when `existingHandle` is no longer good. Defaults to `false`.
		throwIfExistingHandleNotGood?: boolean,

		// A callback to be called when the file picker was shown (which only happens when no `existingHandle` is provided). Defaults to `null`.
		filePickerShown?: ?(handle: ?FileSystemFileHandle) => void
	): Promise<?FileSystemFileHandle>;
}

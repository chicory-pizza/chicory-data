// @flow strict

declare module 'react-hotkeys-hook' {
	declare type FormTags =
		| 'input'
		| 'textarea'
		| 'select'
		| 'INPUT'
		| 'TEXTAREA'
		| 'SELECT';

	declare type Scopes = string | string[];

	declare type KeyboardModifiers = {
		alt?: boolean,
		ctrl?: boolean,
		meta?: boolean,
		shift?: boolean,
		mod?: boolean,
	};
	declare type Hotkey = KeyboardModifiers & {
		keys?: string[],
		scopes?: Scopes,
		description?: string,
	};
	declare type HotkeysEvent = Hotkey;

	declare type Trigger =
		| boolean
		| ((keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) => boolean);

	declare hook useHotkeys(
		keys: string | string[],

		callback: (
			keyboardEvent: KeyboardEvent,
			hotkeysEvent: HotkeysEvent
		) => mixed,

		options?: {
			enabled?: Trigger, // Main setting that determines if the hotkey is enabled or not. (Default: true)
			enableOnFormTags?: FormTags[] | boolean, // Enable hotkeys on a list of tags. (Default: false)
			enableOnContentEditable?: boolean, // Enable hotkeys on tags with contentEditable props. (Default: false)
			combinationKey?: string, // Character to split keys in hotkeys combinations. (Default: +)
			splitKey?: string, // Character to separate different hotkeys. (Default: ,)
			scopes?: Scopes, // Scope
			keyup?: boolean, // Trigger on keyup event? (Default: undefined)
			keydown?: boolean, // Trigger on keydown event? (Default: true)
			preventDefault?: Trigger, // Prevent default browser behavior? (Default: false)
			description?: string, // Use this option to describe what the hotkey does. (Default: undefined)
			document?: Document, // Listen to events on the document instead of the window. (Default: false)
			ignoreModifiers?: boolean, // Ignore modifiers when matching hotkeys. (Default: false)
		},

		dependencies?: ?$ReadOnlyArray<mixed>
	): {current: HTMLElement};
}

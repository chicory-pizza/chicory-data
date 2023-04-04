// @flow strict

export default function getCtrlKeyboardModifier(): string {
	if (navigator.userAgent.includes(' Mac OS X ')) {
		return 'meta';
	}

	return 'ctrl';
}

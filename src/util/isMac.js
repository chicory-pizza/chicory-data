// @flow strict

export default function isMac(): boolean {
	return navigator.userAgent.includes(' Mac OS X ');
}

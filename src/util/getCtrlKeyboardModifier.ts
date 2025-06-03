import isMac from './isMac';

export default function getCtrlKeyboardModifier(): string {
	return isMac() ? 'meta' : 'ctrl';
}

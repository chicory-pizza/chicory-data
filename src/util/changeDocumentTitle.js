// @flow strict

const APP_TITLE = 'Chicory: A Colorful Data';

export default function changeDocumentTitle(text: string) {
	document.title =
		(text !== '' ? text + ' - ' : '') +
		(process.env.NODE_ENV === 'development' ? '(DEV) ' : '') +
		APP_TITLE;
}

// @flow strict

const APP_TITLE = 'Chicory: A Colorful Modding';

export default function changeDocumentTitle(text: string) {
	document.title =
		(text !== '' ? text + ' - ' : '') +
		(import.meta.env.MODE === 'development' ? '(DEV) ' : '') +
		APP_TITLE;
}

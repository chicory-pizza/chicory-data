import {useTitle} from 'react-use';

const APP_TITLE = 'Chicory: A Colorful Modding';

// Use this hook instead of using useTitle directly from react-use
// so the app title is appended too
export default function useDocumentTitle(text: string) {
	useTitle(
		(text !== '' ? text + ' - ' : '') +
			(import.meta.env.MODE === 'development' ? '(DEV) ' : '') +
			APP_TITLE
	);
}

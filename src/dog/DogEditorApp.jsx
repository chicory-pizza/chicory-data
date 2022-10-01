// @flow strict

import ErrorBoundary from '../common/ErrorBoundary';
import useDocumentTitle from '../util/useDocumentTitle';
import useMobileViewport from '../util/useMobileViewport';

import {DogEditorProvider} from './DogEditorContext';
import DogEditorUI from './DogEditorUI';

export default function DogEditorApp(): React$MixedElement {
	useMobileViewport();

	useDocumentTitle('Drawdog maker');

	return (
		<ErrorBoundary>
			<DogEditorProvider>
				<DogEditorUI />
			</DogEditorProvider>
		</ErrorBoundary>
	);
}

// @flow strict

import {useEffect} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import changeDocumentTitle from '../util/changeDocumentTitle';
import useMobileViewport from '../util/useMobileViewport';

import {DogEditorProvider} from './DogEditorContext';
import DogEditorUI from './DogEditorUI.jsx';

export default function DogEditorApp(): React$MixedElement {
	useMobileViewport();

	useEffect(() => {
		changeDocumentTitle('Drawdog maker');
	}, []);

	return (
		<ErrorBoundary>
			<DogEditorProvider>
				<DogEditorUI />
			</DogEditorProvider>
		</ErrorBoundary>
	);
}

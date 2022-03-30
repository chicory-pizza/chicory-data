// @flow strict

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import ReactModal from 'react-modal';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import './util/shimRequestIdleCallback';

import {routes} from './routes';
import {paintdogConsoleText} from './util/paintdogConsoleText';

// Start
console.log(paintdogConsoleText);

const container = document.getElementById('root');
if (container == null) {
	throw new Error('App root container is missing');
}

// https://reactcommunity.org/react-modal/accessibility/#app-element
ReactModal.setAppElement(container);

const root = createRoot(container);
root.render(
	<StrictMode>
		<BrowserRouter>{routes}</BrowserRouter>
	</StrictMode>
);

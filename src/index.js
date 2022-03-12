// @flow strict

import {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import './index.css';
import {BrowserRouter} from 'react-router-dom';

import {routes} from './routes';
import {paintdogConsoleText} from './util/paintdogConsoleText';

// Start
console.log(paintdogConsoleText);

const root = document.getElementById('root');
if (root == null) {
	throw new Error('App root container is missing');
}

// https://reactcommunity.org/react-modal/accessibility/#app-element
ReactModal.setAppElement(root);

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>{routes}</BrowserRouter>
	</StrictMode>,
	root
);

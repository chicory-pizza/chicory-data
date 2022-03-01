// @flow strict

import {StrictMode} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import {paintdogConsoleText} from './util/paintdogConsoleText';

// Start
console.log(paintdogConsoleText);

const root = document.getElementById('root');
if (root == null) {
	throw new Error('App root container is missing');
}

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	root
);

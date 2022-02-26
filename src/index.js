// @flow strict

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const root = document.getElementById('root');
if (root == null) {
	throw new Error('App root container is missing');
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	root
);

// @flow strict

import {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import './index.css';
import {
	BrowserRouter,
	// $FlowFixMe missing definition in flow-typed
	Navigate,
	Route,
	Routes,
} from 'react-router-dom';

import App from './App';
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
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate replace to="/level/0_0_0" />} />

				<Route path="level">
					<Route index element={<Navigate replace to="/level/0_0_0" />} />
					<Route path=":levelId" element={<App />} />
				</Route>

				<Route path="*" element={<div>Page not found</div>} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
	root
);

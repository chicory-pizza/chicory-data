// @flow strict

import {Navigate, Route, Routes} from 'react-router-dom';

import App from './App';
import PageNotFound from './PageNotFound';

const routes: React$Node = (
	<Routes>
		<Route path="/" element={<Navigate replace to="/level/0_0_0" />} />

		<Route path="level">
			<Route index element={<Navigate replace to="/level/0_0_0" />} />
			<Route path=":levelId" element={<App />} />
		</Route>

		<Route path="*" element={<PageNotFound />} />
	</Routes>
);

export {routes};

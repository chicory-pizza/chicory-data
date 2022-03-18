// @flow strict

import {Suspense, lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import LoadingBigBanner from './LoadingBigBanner';

const App = lazy(() => import('./App'));
const PageNotFound = lazy(() => import('./PageNotFound'));

const routes: React$Node = (
	<Suspense fallback={<LoadingBigBanner />}>
		<Routes>
			<Route path="/" element={<Navigate replace to="/level/0_0_0" />} />

			<Route path="level">
				<Route index element={<Navigate replace to="/level/0_0_0" />} />
				<Route path=":levelId" element={<App />} />
			</Route>

			<Route path="*" element={<PageNotFound />} />
		</Routes>
	</Suspense>
);

export {routes};

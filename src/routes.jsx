// @flow strict

import {Suspense, lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import LoadingBigBanner from './LoadingBigBanner';

const DogEditorApp = lazy(() => import('./dog/DogEditorApp'));
const LevelEditorApp = lazy(() => import('./levelEditor/LevelEditorApp'));
const SplashScreen = lazy(() => import('./splash/SplashScreen'));
const PaletteApp = lazy(() => import('./palette/PaletteApp'));
const PageNotFound = lazy(() => import('./PageNotFound'));

/* eslint-disable react/jsx-sort-props */
const routes: React$Node = (
	<Suspense fallback={<LoadingBigBanner />}>
		<Routes>
			<Route path="/" element={<SplashScreen />} />

			<Route path="level">
				<Route index element={<Navigate replace to="/level/0_0_0" />} />
				<Route path=":levelId" element={<LevelEditorApp />} />
			</Route>

			<Route path="dog">
				<Route index element={<DogEditorApp />} />
			</Route>

			<Route path="palette">
				<Route index element={<PaletteApp />} />
			</Route>

			<Route path="*" element={<PageNotFound />} />
		</Routes>
	</Suspense>
);

export {routes};

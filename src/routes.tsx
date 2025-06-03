import {lazy} from 'react';
import {Navigate} from 'react-router-dom';
import type {RouteObject} from 'react-router-dom';

const DogEditorApp = lazy(() => import('./dog/DogEditorApp'));
const LevelEditorApp = lazy(() => import('./levelEditor/LevelEditorApp'));
const SplashScreen = lazy(() => import('./splash/SplashScreen'));
const PaletteApp = lazy(() => import('./palette/PaletteApp'));
const PageNotFound = lazy(() => import('./PageNotFound'));

const routes: Array<RouteObject> = [
	{
		element: <SplashScreen />,
		path: '/',
	},
	{
		element: <Navigate replace to="/level/0_0_0" />,
		index: true,
		path: '/level',
	},
	{
		element: <LevelEditorApp />,
		path: '/level/:levelId',
	},
	{
		element: <DogEditorApp />,
		index: true,
		path: '/dog',
	},
	{
		element: <PaletteApp />,
		index: true,
		path: '/palette',
	},
	{
		element: <PageNotFound />,
		path: '*',
	},
];

export {routes};

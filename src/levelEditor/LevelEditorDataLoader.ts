import {useEffect, useRef} from 'react';

import ConsoleNoJest from '../util/ConsoleNoJest';

import {useWorldDataNullable, type WorldType} from './WorldDataContext';

type Props = Readonly<{
	children: React.ReactNode;
}>;

declare global {
	interface Window {
		levelsData: WorldType | null;
	}
}

export default function LevelEditorDataLoader(props: Props) {
	const {worldData, dispatch} = useWorldDataNullable();
	const consoleMessageShownRef = useRef(false);

	useEffect(() => {
		window.levelsData = worldData;
	}, [worldData]);

	useEffect(() => {
		if (!consoleMessageShownRef.current) {
			ConsoleNoJest.log('Use `window.levelsData` for your custom queries!');

			consoleMessageShownRef.current = true;
		}
	}, []);

	// Do first load
	useEffect(() => {
		if (worldData == null) {
			import('./level_data.json')
				.then((initialWorldData) => {
					dispatch({
						type: 'setWorldData',
						// @ts-expect-error todo validate properly
						worldData: initialWorldData.default,
					});

					dispatch({
						type: 'clearUndoHistory',
					});
				})
				.catch((ex) => {
					console.error(ex);
					alert('There was a problem loading the original level data.');
				});
		}
	}, [dispatch, worldData]);

	return props.children;
}

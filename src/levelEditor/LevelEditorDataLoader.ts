import {useEffect, useRef} from 'react';

import ConsoleNoJest from '../util/ConsoleNoJest';

import type {WorldType} from './types/WorldType';
import loadLevelData from './util/loadLevelData';
import {useWorldDataNullable} from './WorldDataContext';

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
			loadLevelData()
				.then((initialWorldData) => {
					dispatch({
						type: 'setWorldData',
						worldData: initialWorldData,
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

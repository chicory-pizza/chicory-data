// @flow strict

import {useEffect, useState} from 'react';

import ConsoleNoJest from '../util/ConsoleNoJest';

import {useWorldData} from './WorldDataContext';

type Props = $ReadOnly<{
	children: React$Node,
}>;

export default function LevelEditorDataLoader(props: Props): React$Node {
	const [worldData, dispatch] = useWorldData();
	const [consoleMessageShown, setConsoleMessageShown] = useState(false);

	useEffect(() => {
		window.levelsData = worldData;
	}, [worldData]);

	useEffect(() => {
		if (!consoleMessageShown) {
			ConsoleNoJest.log('Use `window.levelsData` for your custom queries!');

			setConsoleMessageShown(true);
		}
	}, [consoleMessageShown]);

	// Do first load
	useEffect(() => {
		if (worldData == null) {
			// $FlowFixMe[untyped-import]
			import('./level_data.json').then((initialWorldData) => {
				dispatch({
					type: 'setWorldData',
					worldData: initialWorldData.default,
				});
			});
		}
	}, [dispatch, worldData]);

	return props.children;
}

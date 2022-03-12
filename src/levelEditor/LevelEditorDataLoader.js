// @flow strict

import {useEffect, useState} from 'react';

import ConsoleNoJest from '../util/ConsoleNoJest';

import {useWorldData} from './WorldDataContext';

type Props = $ReadOnly<{
	children: React$Node,
}>;

export default function LevelEditorDataLoader(props: Props): React$Node {
	const [worldData, setWorldData] = useWorldData();
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
		// $FlowFixMe[untyped-import]
		import('./level_data.json').then((initialWorldData) =>
			setWorldData(initialWorldData.default)
		);
	}, [setWorldData]);

	return props.children;
}

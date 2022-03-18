// @flow strict

import {useEffect, useRef} from 'react';

import {useWorldDataNullable} from './WorldDataContext';

function prompt(ev: BeforeUnloadEvent) {
	ev.returnValue = 'You have unsaved changes to this level data';
}

type Props = $ReadOnly<{
	lastSaveTime: ?number,
}>;

export default function LevelEditorBeforeUnloadPrompt(props: Props): null {
	const {worldData} = useWorldDataNullable();
	const prevWorldDataRef = useRef(worldData);

	useEffect(() => {
		// Ignore first load
		if (prevWorldDataRef.current == null) {
			prevWorldDataRef.current = worldData;
			return;
		}

		if (worldData !== prevWorldDataRef.current) {
			prevWorldDataRef.current = worldData;

			if (
				props.lastSaveTime == null ||
				props.lastSaveTime + 3 <= Date.now() / 1000
			) {
				window.addEventListener('beforeunload', prompt);
			}
		}
	}, [props.lastSaveTime, worldData]);

	useEffect(() => {
		window.removeEventListener('beforeunload', prompt);
	}, [props.lastSaveTime]);

	return null;
}

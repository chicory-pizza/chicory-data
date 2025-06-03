import {useEffect, useRef, useState} from 'react';

import {usePrompt} from '../util/usePrompt';
import type {BlockerFunction} from '../util/usePrompt';

import {useWorldDataNullable} from './WorldDataContext';

const MESSAGE = 'You have unsaved changes to this level data';

type Props = Readonly<{
	lastSaveTime: number | null;
}>;

/**
 * If you are editing this logic, be aware of these scenarios.
 * Test both browser reload and going back
 *
 * 1. Fresh load, then immediately reloading/going back
 *    Should not prompt
 *
 * 2. Same as 1, but navigating to a few levels
 *    Should not prompt
 *
 * 3. Edit the level, then reload
 *    Should prompt
 *
 * 4. Edit the level, save changes, then reload
 *    Should not prompt
 *
 * 5. Edit the level, save changes, make more edits, then reload
 *    Should prompt
 */
export default function LevelEditorBeforeUnloadPrompt(props: Props): null {
	const {worldData} = useWorldDataNullable();
	const prevWorldDataRef = useRef(worldData);

	const [hasDirtyChanges, setHasDirtyChanges] = useState(false);
	const prevSaveTime = useRef(props.lastSaveTime);

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
				setHasDirtyChanges(true);
			} else {
				setHasDirtyChanges(false);
			}
			return;
		}

		// Just saved, so we can assume there are no dirty changes
		if (props.lastSaveTime !== prevSaveTime.current) {
			prevSaveTime.current = props.lastSaveTime;

			setHasDirtyChanges(false);
		}
	}, [hasDirtyChanges, props.lastSaveTime, worldData]);

	// Don't memo with useCallback, intentionally recreating the function every time
	// to ensure the block listener is re-added each time
	usePrompt(MESSAGE, hasDirtyChanges, (args: BlockerFunction) => {
		return !args.nextLocation.pathname.startsWith('/level/');
	});

	return null;
}

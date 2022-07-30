// @flow strict

import AppHeaderUndoRedo from '../../header/AppHeaderUndoRedo.jsx';
import {useWorldDataNullable} from '../WorldDataContext';

export default function LevelEditorUndoRedo(): React$MixedElement {
	const {dispatch, canUndo, canRedo} = useWorldDataNullable();

	return (
		<AppHeaderUndoRedo
			canRedo={canRedo}
			canUndo={canUndo}
			dispatch={dispatch}
		/>
	);
}

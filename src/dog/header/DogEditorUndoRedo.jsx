// @flow strict

import AppHeaderUndoRedo from '../../header/AppHeaderUndoRedo';
import {useDogEditorContext} from '../DogEditorContext';

export default function DogEditorUndoRedo(): React$MixedElement {
	const {dispatch, canUndo, canRedo} = useDogEditorContext();

	return (
		<AppHeaderUndoRedo
			canRedo={canRedo}
			canUndo={canUndo}
			dispatch={dispatch}
		/>
	);
}

import AppHeaderUndoRedo from '../../header/AppHeaderUndoRedo';
import {useWorldDataNullable} from '../WorldDataContext';

export default function LevelEditorUndoRedo() {
	const {dispatch, canUndo, canRedo} = useWorldDataNullable();

	return (
		<AppHeaderUndoRedo
			canRedo={canRedo}
			canUndo={canUndo}
			dispatch={dispatch}
		/>
	);
}

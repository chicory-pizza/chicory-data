import {memo} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';

import getCtrlKeyboardModifier from '../util/getCtrlKeyboardModifier';
import isMac from '../util/isMac';
import type {UndoReducerAction} from '../util/useUndoRedoReducer';

import styles from './AppHeaderUndoRedo.module.css';

type Props = Readonly<{
	canRedo: boolean;
	canUndo: boolean;
	dispatch: (action: UndoReducerAction) => void;
}>;

function AppHeaderUndoRedo(props: Props) {
	useHotkeys(getCtrlKeyboardModifier() + '+z', undo, {
		enabled: props.canUndo,
		preventDefault: true,
	});

	useHotkeys(
		`${getCtrlKeyboardModifier()}+y, ${getCtrlKeyboardModifier()}+shift+z`,
		redo,
		{
			enabled: props.canRedo,
			preventDefault: true,
		}
	);

	function undo() {
		props.dispatch({type: 'undo'});
	}

	function redo() {
		props.dispatch({type: 'redo'});
	}

	return (
		<div className={styles.root}>
			<button
				className={styles.space}
				disabled={!props.canUndo}
				onClick={undo}
				title={isMac() ? 'Command-Z' : 'Ctrl-Z'}
				type="button"
			>
				Undo
			</button>

			<button
				disabled={!props.canRedo}
				onClick={redo}
				title={isMac() ? 'Command-Shift-Z' : 'Ctrl-Shift-Z or Ctrl-Y'}
				type="button"
			>
				Redo
			</button>
		</div>
	);
}

export default memo(AppHeaderUndoRedo);

// @flow strict

import {useWorldDataNullable} from '../WorldDataContext';

import styles from './LevelEditorUndoRedo.module.css';

export default function LevelEditorUndoRedo(): React$Node {
	const {dispatch, canUndo, canRedo} = useWorldDataNullable();

	function undo() {
		dispatch({type: 'undo'});
	}

	function redo() {
		dispatch({type: 'redo'});
	}

	return (
		<div className={styles.root}>
			<button
				className={styles.space}
				disabled={!canUndo}
				type="button"
				onClick={undo}
			>
				Undo
			</button>

			<button
				className={styles.space}
				disabled={!canRedo}
				onClick={redo}
				type="button"
			>
				Redo
			</button>
		</div>
	);
}

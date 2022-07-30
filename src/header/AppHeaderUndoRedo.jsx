// @flow strict

import type {UndoReducerAction} from '../util/useUndoRedoReducer';

import styles from './AppHeaderUndoRedo.module.css';

type Props = $ReadOnly<{
	canRedo: boolean,
	canUndo: boolean,
	dispatch: (action: UndoReducerAction) => mixed,
}>;

export default function AppHeaderUndoRedo(props: Props): React$MixedElement {
	return (
		<div className={styles.root}>
			<button
				className={styles.space}
				disabled={!props.canUndo}
				type="button"
				onClick={() => {
					props.dispatch({type: 'undo'});
				}}
			>
				Undo
			</button>

			<button
				disabled={!props.canRedo}
				onClick={() => {
					props.dispatch({type: 'redo'});
				}}
				type="button"
			>
				Redo
			</button>
		</div>
	);
}

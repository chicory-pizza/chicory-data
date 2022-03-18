// @flow strict

import {useReducer} from 'react';

type UndoState<T> = {
	history: Array<T>,
	currentIndex: number,
};

export type UndoReducerAction =
	| {type: 'undo'}
	| {type: 'redo'}
	| {type: 'clearUndoHistory'};

export default function useUndoRedoReducer<T, ReducerAction: {...}>(
	reducer: (state: T, action: ReducerAction) => T,
	initialPresent: T
): {
	currentState: T,
	dispatch: (action: UndoReducerAction | ReducerAction) => void,
	canUndo: boolean,
	canRedo: boolean,
} {
	const [state, dispatch] = useReducer(handleUndoReducer(reducer), {
		history: [initialPresent],
		currentIndex: 0,
	});

	const canUndo = state.currentIndex > 0;
	const canRedo = state.currentIndex < state.history.length - 1;

	return {
		currentState: state.history[state.currentIndex],
		dispatch,

		canUndo,
		canRedo,
	};
}

function handleUndoReducer<T, ReducerAction: {...}>(
	reducer: (state: T, action: ReducerAction) => T
): (
	state: UndoState<T>,
	action: UndoReducerAction | ReducerAction
) => UndoState<T> {
	return function (state, action) {
		if (action.type === 'undo') {
			return {
				...state,
				currentIndex: state.currentIndex - 1,
			};
		} else if (action.type === 'redo') {
			return {
				...state,
				currentIndex: state.currentIndex + 1,
			};
		} else if (action.type === 'clearUndoHistory') {
			return {
				history: [state.history[state.currentIndex]],
				currentIndex: 0,
			};
		}

		// Delegate to main reducer
		const prevPresent = state.history[state.currentIndex];
		const newPresent = reducer(prevPresent, action);

		if (prevPresent === newPresent) {
			return state;
		}

		const newIndex = state.currentIndex + 1;

		return {
			history: state.history.slice(0, newIndex).concat(newPresent),
			currentIndex: newIndex,
		};
	};
}

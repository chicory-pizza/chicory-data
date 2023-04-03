// @flow strict

import {useReducer} from 'react';

export type ListItemsExpandedReducerAction =
	| {type: 'expand', indexes: Array<number>}
	| {type: 'collapse', indexes: Array<number>}
	| {type: 'collapseAll'}
	| {type: 'remove', index: number};

function reducer(
	state: Map<number, number>,
	action: ListItemsExpandedReducerAction
) {
	switch (action.type) {
		case 'expand': {
			if (action.indexes.length === 0) {
				return state;
			}

			const newState = new Map(state);
			for (const index of action.indexes) {
				newState.set(index, Date.now());
			}
			return newState;
		}

		case 'collapse': {
			if (action.indexes.length === 0) {
				return state;
			}

			const newState = new Map(state);
			for (const index of action.indexes) {
				newState.delete(index);
			}
			return newState;
		}

		case 'collapseAll':
			return new Map<number, number>();

		case 'remove': {
			const deletedIndex = action.index;

			const newState = new Map<number, number>();
			for (const [currentIndex, currentValue] of state) {
				// Skip deleted object index
				if (currentIndex === deletedIndex) {
					continue;
				}

				// Anything after the deleted object index needs to decrement
				if (currentIndex > deletedIndex) {
					newState.set(currentIndex - 1, currentValue);
				} else {
					newState.set(currentIndex, currentValue);
				}
			}
			return newState;
		}

		default:
			throw new Error(
				'Unknown useListItemsExpandedReducer action ' + action.type
			);
	}
}

export default function useListItemsExpandedReducer(): [
	Map<number, number>,
	(action: ListItemsExpandedReducerAction) => void
] {
	return useReducer(reducer, new Map());
}

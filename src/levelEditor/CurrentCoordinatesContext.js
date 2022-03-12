// @flow strict

import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useReducer,
} from 'react';

import isSameCoordinates from './util/isSameCoordinates';

const CurrentCoordinatesContext = createContext();

type ReducerAction = {type: 'change', coordinates: [number, number, number]};

function reducer(state: [number, number, number], action: ReducerAction) {
	switch (action.type) {
		case 'change':
			if (isSameCoordinates(state, action.coordinates)) {
				return state;
			}

			return action.coordinates;

		default:
			throw new Error(
				'Unknown CurrentCoordinates reducer action ' + action.type
			);
	}
}

type Props = $ReadOnly<{
	children: React$Node,
}>;

export function CurrentCoordinatesProvider({children}: Props): React$Node {
	const [currentCoordinates, dispatch] = useReducer(reducer, [0, 0, 0]);

	const contextValue = useMemo(() => {
		return {currentCoordinates, dispatch};
	}, [currentCoordinates, dispatch]);

	return (
		<CurrentCoordinatesContext.Provider value={contextValue}>
			{children}
		</CurrentCoordinatesContext.Provider>
	);
}

export function useCurrentCoordinates(): [
	[number, number, number],
	(newCoordinates: [number, number, number]) => mixed
] {
	const context = useContext(CurrentCoordinatesContext);

	if (!context) {
		throw new Error(
			'useCurrentCoordinates must be used within a CurrentCoordinatesProvider'
		);
	}

	const dispatch = context.dispatch;
	const setCoordinates = useCallback(
		(coordinates: [number, number, number]) => {
			dispatch({type: 'change', coordinates});
		},
		[dispatch]
	);

	return [context.currentCoordinates, setCoordinates];
}

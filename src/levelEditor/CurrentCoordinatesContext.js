// @flow strict

import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useReducer,
} from 'react';
// $FlowFixMe
import {useNavigate} from 'react-router-dom';

import convertCoordinatesToLevelId from './util/convertCoordinatesToLevelId';
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
	defaultCoordinates: [number, number, number],
	children: React$Node,
}>;

export function CurrentCoordinatesProvider({
	defaultCoordinates,
	children,
}: Props): React$Node {
	const [currentCoordinates, dispatch] = useReducer(
		reducer,
		defaultCoordinates
	);

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
	const navigate = useNavigate();

	if (!context) {
		throw new Error(
			'useCurrentCoordinates must be used within a CurrentCoordinatesProvider'
		);
	}

	const dispatch = context.dispatch;
	const setCoordinates = useCallback(
		(coordinates: [number, number, number]) => {
			dispatch({type: 'change', coordinates});

			navigate('/level/' + convertCoordinatesToLevelId(coordinates));
		},
		[dispatch, navigate]
	);

	return [context.currentCoordinates, setCoordinates];
}

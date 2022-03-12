// @flow strict

import {createContext, useContext, useState} from 'react';

import isSameCoordinates from './util/isSameCoordinates';

const CurrentCoordinatesContext = createContext();

type Props = $ReadOnly<{
	children: ?React$Node,
}>;

export function CurrentCoordinatesProvider({children}: Props): React$Node {
	const [currentCordinates, setCurrentCoordinates] = useState<
		[number, number, number]
	>([0, 0, 0]);

	return (
		<CurrentCoordinatesContext.Provider
			value={{
				coordinates: currentCordinates,
				setCoordinates(newCoordinates: [number, number, number]) {
					if (isSameCoordinates(currentCordinates, newCoordinates)) {
						return;
					}

					setCurrentCoordinates(newCoordinates);
				},
			}}
		>
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
			`useCurrentCoordinates must be used within a CurrentCoordinatesProvider`
		);
	}

	return [context.coordinates, context.setCoordinates];
}

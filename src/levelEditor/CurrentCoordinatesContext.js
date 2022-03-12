// @flow strict

import {useCallback, useMemo} from 'react';
import {
	// $FlowFixMe[missing-export] missing definition in flow-typed
	useNavigate,
	useParams,
} from 'react-router-dom';

import convertCoordinatesToLevelId from './util/convertCoordinatesToLevelId';
import convertLevelIdToCoordinates from './util/convertLevelIdToCoordinates';

export function useCurrentCoordinates(): [
	?[number, number, number],
	(newCoordinates: [number, number, number]) => mixed
] {
	const {levelId} = useParams();

	const coordinates = useMemo(() => {
		try {
			return convertLevelIdToCoordinates(levelId);
		} catch (ex) {
			return null;
		}
	}, [levelId]);

	const navigate = useNavigate();
	const setCoordinates = useCallback(
		(coordinates: [number, number, number]) => {
			navigate('/level/' + convertCoordinatesToLevelId(coordinates));
		},
		[navigate]
	);

	return [coordinates, setCoordinates];
}

export function useCurrentCoordinatesNonNullable(): [
	[number, number, number],
	(newCoordinates: [number, number, number]) => mixed
] {
	const hook = useCurrentCoordinates();

	if (hook[0] == null) {
		throw new Error('Current coordinates are invalid');
	}

	return [hook[0], hook[1]];
}

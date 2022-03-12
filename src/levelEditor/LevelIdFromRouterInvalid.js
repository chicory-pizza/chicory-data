// @flow strict

import BigPageNotice from '../common/BigPageNotice';

import {useCurrentCoordinates} from './CurrentCoordinatesContext';

export default function LevelIdFromRouterInvalid(): React$Node {
	const [, setNewCoordinates] = useCurrentCoordinates();

	return (
		<BigPageNotice heading="⚠️ Not a valid level ID">
			<button type="button" onClick={() => setNewCoordinates([0, 0, 0])}>
				Teleport to Luncheon
			</button>
		</BigPageNotice>
	);
}

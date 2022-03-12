// @flow strict

import BigPageNotice from './common/BigPageNotice';
import {useCurrentCoordinates} from './levelEditor/CurrentCoordinatesContext';

export default function PageNotFound(): React$Node {
	const [, setNewCoordinates] = useCurrentCoordinates();

	return (
		<BigPageNotice heading="⚠️ Page not found">
			<button type="button" onClick={() => setNewCoordinates([0, 0, 0])}>
				Teleport to Luncheon
			</button>
		</BigPageNotice>
	);
}

// @flow strict

import BigPageNotice from '../common/BigPageNotice';

import {useCurrentCoordinatesNonNullable} from './CurrentCoordinatesContext';
import {useWorldDataNonNullable} from './WorldDataContext';

export default function LevelNotExist(): React$Node {
	const [currentCoordinates] = useCurrentCoordinatesNonNullable();
	const {dispatch} = useWorldDataNonNullable();

	function onCreateButtonClick() {
		dispatch({
			type: 'newBlankLevel',
			coordinates: currentCoordinates,
		});
	}

	return (
		<BigPageNotice
			heading={`ℹ️ Level ${currentCoordinates.join(', ')} doesn't exist`}
		>
			<button type="button" onClick={onCreateButtonClick}>
				Create
			</button>
		</BigPageNotice>
	);
}

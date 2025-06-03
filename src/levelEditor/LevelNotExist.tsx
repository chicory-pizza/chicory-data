import BigPageNotice from '../common/BigPageNotice';

import {useCurrentCoordinatesNonNullable} from './CurrentCoordinatesContext';
import {useWorldDataNonNullable} from './WorldDataContext';

export default function LevelNotExist() {
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
			<button onClick={onCreateButtonClick} type="button">
				Create
			</button>
		</BigPageNotice>
	);
}

import {Button} from '@mantine/core';

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
			<Button onClick={onCreateButtonClick} variant="default">
				Create
			</Button>
		</BigPageNotice>
	);
}

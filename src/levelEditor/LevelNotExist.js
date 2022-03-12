// @flow strict

import {useCurrentCoordinates} from './CurrentCoordinatesContext';
import styles from './LevelNotExist.module.css';
import {useWorldDataNonNullable} from './WorldDataContext';

export default function LevelNotExist(): React$Node {
	const [currentCoordinates] = useCurrentCoordinates();
	const [, dispatch] = useWorldDataNonNullable();

	function onCreateButtonClick() {
		dispatch({
			type: 'newBlankLevel',
			coordinates: currentCoordinates,
		});
	}

	return (
		<div className={styles.root}>
			<div className={styles.text}>
				Level {currentCoordinates[0]}, {currentCoordinates[1]},{' '}
				{currentCoordinates[2]} doesn{"'"}t exist
			</div>

			<button type="button" onClick={onCreateButtonClick}>
				Create
			</button>
		</div>
	);
}

// @flow strict

import {useCurrentCoordinates} from './CurrentCoordinatesContext';
import styles from './LevelNotExist.module.css';

type Props = $ReadOnly<{
	onCreateButtonClick: () => mixed,
}>;

export default function LevelNotExist(props: Props): React$Node {
	const [currentCoordinates] = useCurrentCoordinates();

	return (
		<div className={styles.root}>
			<div className={styles.text}>
				Level {currentCoordinates[0]}, {currentCoordinates[1]},{' '}
				{currentCoordinates[2]} doesn{"'"}t exist
			</div>

			<button type="button" onClick={props.onCreateButtonClick}>
				Create
			</button>
		</div>
	);
}

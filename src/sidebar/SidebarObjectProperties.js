// @flow strict

import {useCurrentCoordinates} from '../CurrentCoordinatesContext';
import type {LevelType} from '../types/LevelType';

import styles from './SidebarObjectProperties.module.css';

function withoutObjectsAndDecos(
	level: LevelType
): $Diff<LevelType, {geo: string}> {
	const {objects, decos, geo, ...otherProps} = level;
	return otherProps;
}

type Props = $ReadOnly<{
	level: LevelType,
	objectIndexHover: ?number,
	onLevelDelete: () => mixed,
}>;

export default function SidebarObjectProperties(props: Props): React$Node {
	const [currentCoordinates] = useCurrentCoordinates();

	const levelObjects = props.level.objects;

	const currentObject =
		levelObjects != null && props.objectIndexHover != null
			? levelObjects[props.objectIndexHover]
			: null;

	function onDeleteLevelButtonClick() {
		if (
			!window.confirm(
				`Are you sure you want to delete level ${currentCoordinates[0]}, ${currentCoordinates[1]}, ${currentCoordinates[2]}?`
			)
		) {
			return;
		}

		props.onLevelDelete();
	}

	return (
		<div className={styles.root}>
			{currentObject ? (
				<>
					<div>{currentObject.obj} properties</div>

					<pre>
						<code>{JSON.stringify(currentObject, null, 2)}</code>
					</pre>
				</>
			) : (
				<>
					<div>Level properties</div>

					<pre>
						<code>
							{JSON.stringify(withoutObjectsAndDecos(props.level), null, 2)}
						</code>
					</pre>

					<div className={styles.actions}>
						<button onClick={onDeleteLevelButtonClick} type="button">
							Delete level
						</button>
					</div>
				</>
			)}
		</div>
	);
}

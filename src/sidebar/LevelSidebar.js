// @flow strict

import ErrorBoundary from '../ErrorBoundary';
import GeoPreview from '../GeoPreview';
import type {GameObjectEntityType} from '../types/GameObjectEntityType';
import type {LevelType} from '../types/LevelType';

import styles from './LevelSidebar.module.css';
import SidebarMouseMoveCoordinates from './SidebarMouseMoveCoordinates';
import SidebarObjectAdder from './SidebarObjectAdder';
import SidebarObjectsList from './SidebarObjectsList';

function withoutObjectsAndDecos(
	level: LevelType
): $Diff<LevelType, {geo: string}> {
	const {objects, decos, geo, ...otherProps} = level;
	return otherProps;
}

type Props = $ReadOnly<{
	level: LevelType,
	mapMouseMoveCoordinates: ?[number, number],
	objectIndexHover: ?number,
	onAddingObjectEntity: (entity: GameObjectEntityType) => mixed,
	onObjectDelete: (objectIndex: number) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
}>;

export default function LevelSidebar(props: Props): React$Node {
	const levelObjects = props.level.objects;

	const currentObject =
		levelObjects != null && props.objectIndexHover != null
			? levelObjects[props.objectIndexHover]
			: null;

	return (
		<div className={styles.sidebar}>
			<GeoPreview
				level={props.level}
				mapMouseMoveCoordinates={props.mapMouseMoveCoordinates}
				scale={4}
			/>

			<div className={styles.group + ' ' + styles.properties}>
				<div>{currentObject ? 'Object properties' : 'Level properties'}</div>

				<code>
					{currentObject
						? JSON.stringify(currentObject, null, 2)
						: JSON.stringify(withoutObjectsAndDecos(props.level), null, 2)}
				</code>
			</div>

			<div className={styles.group}>
				<ErrorBoundary>
					<SidebarObjectAdder
						onAddingObjectEntity={props.onAddingObjectEntity}
					/>
				</ErrorBoundary>
			</div>

			<div className={styles.group + ' ' + styles.objectsList}>
				<ErrorBoundary>
					<SidebarObjectsList
						levelObjects={levelObjects ?? []}
						objectIndexHover={props.objectIndexHover}
						onObjectDelete={props.onObjectDelete}
						onObjectHover={props.onObjectHover}
					/>
				</ErrorBoundary>
			</div>

			<div className={styles.group}>
				<SidebarMouseMoveCoordinates
					mapMouseMoveCoordinates={props.mapMouseMoveCoordinates}
				/>
			</div>
		</div>
	);
}

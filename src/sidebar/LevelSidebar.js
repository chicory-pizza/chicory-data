// @flow strict

import ErrorBoundary from '../ErrorBoundary';
import GeoPreview from '../GeoPreview';
import type {GameObjectEntityType} from '../types/GameObjectEntityType';
import type {LevelType} from '../types/LevelType';

import styles from './LevelSidebar.module.css';
import SidebarObjectsList from './objectsList/SidebarObjectsList';
import SidebarLevelProperties from './properties/SidebarLevelProperties';
import SidebarMouseMoveCoordinates from './SidebarMouseMoveCoordinates';
import SidebarObjectAdder from './SidebarObjectAdder';

type Props = $ReadOnly<{
	level: LevelType,
	mapMouseMoveCoordinates: ?[number, number],
	objectIndexHover: ?number,
	objectsListItemsExpanded: Array<number>,
	onAddingObjectEntity: (entity: GameObjectEntityType) => mixed,
	onLevelDelete: () => mixed,
	onLevelEditProperty: (key: string, value: string | number) => mixed,
	onObjectDelete: (objectIndex: number) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
	onObjectListItemToggle: (objectIndex: number) => mixed,
}>;

export default function LevelSidebar(props: Props): React$Node {
	return (
		<div className={styles.sidebar}>
			<GeoPreview
				level={props.level}
				mapMouseMoveCoordinates={props.mapMouseMoveCoordinates}
				scale={4}
			/>

			<div className={styles.group}>
				<ErrorBoundary>
					<SidebarLevelProperties
						level={props.level}
						onLevelDelete={props.onLevelDelete}
						onLevelEditProperty={props.onLevelEditProperty}
					/>
				</ErrorBoundary>
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
						levelObjects={props.level.objects ?? []}
						objectIndexHover={props.objectIndexHover}
						objectsListItemsExpanded={props.objectsListItemsExpanded}
						onObjectDelete={props.onObjectDelete}
						onObjectHover={props.onObjectHover}
						onObjectListItemToggle={props.onObjectListItemToggle}
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

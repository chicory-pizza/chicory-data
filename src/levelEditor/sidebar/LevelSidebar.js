// @flow strict

import ErrorBoundary from '../../common/ErrorBoundary';
import GeoPreview from '../common/GeoPreview';
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
	onObjectEditProperty: (
		objectIndex: number,
		key: string,
		value: string | number
	) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
	setObjectsListItemsExpanded: (expandedIndexes: Array<number>) => mixed,
}>;

export default function LevelSidebar(props: Props): React$Node {
	return (
		<div className={styles.sidebar}>
			<GeoPreview
				level={props.level}
				mapMouseMoveCoordinates={props.mapMouseMoveCoordinates}
				scale={4}
				useDevicePixelRatio={true}
			/>

			<div className={styles.group}>
				<ErrorBoundary>
					<SidebarObjectAdder
						onAddingObjectEntity={props.onAddingObjectEntity}
					/>
				</ErrorBoundary>
			</div>

			<div className={styles.group + ' ' + styles.properties}>
				<ErrorBoundary>
					<SidebarLevelProperties
						level={props.level}
						onLevelDelete={props.onLevelDelete}
						onLevelEditProperty={props.onLevelEditProperty}
					/>

					<SidebarObjectsList
						levelObjects={props.level.objects ?? []}
						objectIndexHover={props.objectIndexHover}
						objectsListItemsExpanded={props.objectsListItemsExpanded}
						onObjectDelete={props.onObjectDelete}
						onObjectEditProperty={props.onObjectEditProperty}
						onObjectHover={props.onObjectHover}
						setObjectsListItemsExpanded={props.setObjectsListItemsExpanded}
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

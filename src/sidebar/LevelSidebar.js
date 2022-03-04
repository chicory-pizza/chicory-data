// @flow strict

import ErrorBoundary from '../ErrorBoundary';
import GeoPreview from '../GeoPreview';
import type {GameObjectEntityType} from '../types/GameObjectEntityType';
import type {LevelType} from '../types/LevelType';

import styles from './LevelSidebar.module.css';
import SidebarMouseMoveCoordinates from './SidebarMouseMoveCoordinates';
import SidebarObjectAdder from './SidebarObjectAdder';
import SidebarObjectProperties from './SidebarObjectProperties';
import SidebarObjectsList from './SidebarObjectsList';

type Props = $ReadOnly<{
	level: LevelType,
	mapMouseMoveCoordinates: ?[number, number],
	objectIndexHover: ?number,
	onAddingObjectEntity: (entity: GameObjectEntityType) => mixed,
	onLevelDelete: () => mixed,
	onObjectDelete: (objectIndex: number) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
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
					<SidebarObjectProperties
						level={props.level}
						objectIndexHover={props.objectIndexHover}
						onLevelDelete={props.onLevelDelete}
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

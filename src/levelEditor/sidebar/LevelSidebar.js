// @flow strict

import ErrorBoundary from '../../common/ErrorBoundary';
import GeoPreview from '../common/GeoPreview';
import type {GameEntityType} from '../types/GameEntityType';
import type {LevelInspectorUiView} from '../types/LevelInspectorUiView';
import type {LevelType} from '../types/LevelType';
import type {PlaceableType} from '../types/PlaceableType';

import styles from './LevelSidebar.module.css';
import SidebarEntityList from './objectsList/SidebarEntityList';
import SidebarLevelProperties from './properties/SidebarLevelProperties';
import SidebarEntityAdder from './SidebarEntityAdder';
import SidebarMouseMoveCoordinates from './SidebarMouseMoveCoordinates';
import SidebarViewMenu from './SidebarViewMenu';

type Props = $ReadOnly<{
	activeUiViews: Array<LevelInspectorUiView>,
	level: LevelType,
	mapMouseMoveCoordinates: ?[number, number],
	objectIndexHover: ?number,
	objectsListItemsExpanded: Array<number>,
	onActiveUiViewToggle: (uiView: LevelInspectorUiView) => mixed,
	onAddingEntityLabel: (entity: PlaceableType) => mixed,
	onEntityDelete: (entityIndex: number, entityType: GameEntityType) => mixed,
	onEntityEditProperty: (
		entityIndex: number,
		key: string,
		value: string | number | null,
		entityType: GameEntityType
	) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
	setObjectsListItemsExpanded: (
		expandedIndexes: Array<number> | ((Array<number>) => Array<number>)
	) => mixed,
	decoIndexHover: ?number,
	onDecoHover: (decoIndex: ?number) => mixed,
	decosListItemsExpanded: Array<number>,
	setDecosListItemsExpanded: (
		expandedIndexes: Array<number> | ((Array<number>) => Array<number>)
	) => mixed,
}>;

export default function LevelSidebar(props: Props): React$Node {
	return (
		<div className={styles.sidebar}>
			<ErrorBoundary>
				<GeoPreview
					level={props.level}
					mapMouseMoveCoordinates={props.mapMouseMoveCoordinates}
					scale={4}
					useDevicePixelRatio={true}
				/>
			</ErrorBoundary>

			<div className={styles.group}>
				<ErrorBoundary>
					<SidebarEntityAdder
						onAddingEntityLabel={props.onAddingEntityLabel}
						type="OBJECT"
					/>
					<SidebarEntityAdder
						onAddingEntityLabel={props.onAddingEntityLabel}
						type="DECO"
					/>
				</ErrorBoundary>
			</div>

			<div className={styles.group + ' ' + styles.properties}>
				<ErrorBoundary>
					<SidebarViewMenu
						activeUiViews={props.activeUiViews}
						onActiveUiViewToggle={props.onActiveUiViewToggle}
					/>
				</ErrorBoundary>

				<ErrorBoundary>
					<SidebarLevelProperties level={props.level} />
				</ErrorBoundary>

				<ErrorBoundary>
					<SidebarEntityList
						levelObjects={props.level.objects ?? []}
						type="OBJECT"
						entityIndexHover={props.objectIndexHover}
						entitiesListItemsExpanded={props.objectsListItemsExpanded}
						onEntityDelete={props.onEntityDelete}
						onEntityEditProperty={props.onEntityEditProperty}
						onEntityHover={props.onObjectHover}
						setEntitiesListItemsExpanded={props.setObjectsListItemsExpanded}
						name="Objects"
					/>
				</ErrorBoundary>

				<ErrorBoundary>
					<SidebarEntityList
						levelDecos={props.level.decos ?? []}
						type="DECO"
						entityIndexHover={props.decoIndexHover}
						entitiesListItemsExpanded={props.decosListItemsExpanded}
						onEntityDelete={props.onEntityDelete}
						onEntityEditProperty={props.onEntityEditProperty}
						onEntityHover={props.onDecoHover}
						setEntitiesListItemsExpanded={props.setDecosListItemsExpanded}
						name="Decos"
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

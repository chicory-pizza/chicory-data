// @flow strict

import ErrorBoundary from '../../common/ErrorBoundary';
import GeoPreview from '../common/GeoPreview';
import {EDITOR_UI_PIXEL_COLORS} from '../GeoConstants';
import type {GameEntityType} from '../types/GameEntityType';
import type {LevelInspectorUiView} from '../types/LevelInspectorUiView';
import type {LevelType} from '../types/LevelType';
import type {PlaceableType} from '../types/PlaceableType';
import type {SidebarPanel} from '../types/SidebarPanel';

import styles from './LevelSidebar.module.css';
import SidebarDecoList from './objectsList/SidebarDecoList';
import SidebarObjectList from './objectsList/SidebarObjectList';
import type {ListItemsExpandedReducerAction} from './objectsList/useListItemsExpandedReducer';
import SidebarLevelProperties from './properties/SidebarLevelProperties';
import SidebarMouseMoveCoordinates from './SidebarMouseMoveCoordinates';
import SidebarObjectAdder from './SidebarObjectAdder';
import SidebarViewMenu from './SidebarViewMenu';

type Props = $ReadOnly<{
	activeUiViews: Array<LevelInspectorUiView>,
	decoIndexHover: ?number,
	decosListItemsExpanded: Map<number, number>,
	dispatchDecosListItemsExpanded: (
		action: ListItemsExpandedReducerAction
	) => void,
	dispatchObjectsListItemsExpanded: (
		action: ListItemsExpandedReducerAction
	) => void,
	expandedSidebarPanels: Set<SidebarPanel>,
	level: LevelType,
	levelPreviewGeoPaintBuffer: ?Array<number>,
	levelPreviewPaintBufferUpdate: ?number,
	mapMouseMoveCoordinates: ?[number, number],
	objectIndexHover: ?number,
	objectsListItemsExpanded: Map<number, number>,
	onActiveUiViewToggle: (uiView: LevelInspectorUiView) => mixed,
	onAddingEntityLabel: (entity: PlaceableType) => mixed,
	onDecoHover: (decoIndex: ?number) => mixed,
	onEntityDelete: (entityIndex: number, entityType: GameEntityType) => mixed,
	onEntityEditProperties: (
		entityIndex: number,
		properties: {
			[key: string]: string | number | null,
		},
		entityType: GameEntityType
	) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
	onSidebarPanelExpandToggle: (
		ev: SyntheticMouseEvent<HTMLElement>,
		sidebarPanel: SidebarPanel
	) => mixed,
}>;

export default function LevelSidebar(props: Props): React$Node {
	return (
		<div className={styles.sidebar}>
			<ErrorBoundary>
				<GeoPreview
					colors={EDITOR_UI_PIXEL_COLORS}
					geoPaintBuffer={props.levelPreviewGeoPaintBuffer}
					level={props.level}
					mapMouseMoveCoordinates={props.mapMouseMoveCoordinates}
					paintBufferUpdate={props.levelPreviewPaintBufferUpdate}
					scale={4}
					useDevicePixelRatio={true}
				/>
			</ErrorBoundary>

			<div className={styles.group}>
				<ErrorBoundary>
					<SidebarObjectAdder onAddingEntityLabel={props.onAddingEntityLabel} />
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
					<SidebarLevelProperties
						expanded={props.expandedSidebarPanels.has('LEVEL_PROPERTIES')}
						level={props.level}
						onSidebarPanelExpandToggle={props.onSidebarPanelExpandToggle}
					/>
				</ErrorBoundary>

				<ErrorBoundary>
					<SidebarObjectList
						dispatchEntitiesListItemsExpanded={
							props.dispatchObjectsListItemsExpanded
						}
						entitiesListItemsExpanded={props.objectsListItemsExpanded}
						entityIndexHover={props.objectIndexHover}
						expanded={props.expandedSidebarPanels.has('OBJECTS')}
						levelObjects={props.level.objects ?? []}
						onEntityDelete={props.onEntityDelete}
						onEntityEditProperties={props.onEntityEditProperties}
						onEntityHover={props.onObjectHover}
						onSidebarPanelExpandToggle={props.onSidebarPanelExpandToggle}
					/>
				</ErrorBoundary>

				<ErrorBoundary>
					<SidebarDecoList
						dispatchEntitiesListItemsExpanded={
							props.dispatchDecosListItemsExpanded
						}
						entitiesListItemsExpanded={props.decosListItemsExpanded}
						entityIndexHover={props.decoIndexHover}
						expanded={props.expandedSidebarPanels.has('DECOS')}
						levelDecos={props.level.decos ?? []}
						onEntityDelete={props.onEntityDelete}
						onEntityEditProperties={props.onEntityEditProperties}
						onEntityHover={props.onDecoHover}
						onSidebarPanelExpandToggle={props.onSidebarPanelExpandToggle}
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

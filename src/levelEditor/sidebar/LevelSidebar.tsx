import ErrorBoundary from '../../common/ErrorBoundary';
import GeoPreview from '../common/GeoPreview';
import {EDITOR_UI_PIXEL_COLORS} from '../GeoConstants';
import {useLevelEditorContext} from '../LevelEditorContext';
import type {EditorEntityHoverType} from '../types/EditorEntityHoverType';
import type {GameEntityType} from '../types/GameEntityType';
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

type Props = Readonly<{
	decosListItemsExpanded: Map<number, number>;
	dispatchDecosListItemsExpanded: (
		action: ListItemsExpandedReducerAction
	) => void;
	dispatchObjectsListItemsExpanded: (
		action: ListItemsExpandedReducerAction
	) => void;
	entityHover: EditorEntityHoverType | null;
	expandedSidebarPanels: Set<SidebarPanel>;
	level: LevelType;
	levelPreviewGeoPaintBuffer: ReadonlyArray<number>;
	mapMouseMoveCoordinates: [number, number] | null;
	objectsListItemsExpanded: Map<number, number>;
	onAddingEntityLabel: (entity: PlaceableType) => void;
	onEntityDelete: (entityIndex: number, entityType: GameEntityType) => void;
	onEntityEditProperties: (
		entityIndex: number,
		properties: {
			[key: string]: string | number | null;
		},
		entityType: GameEntityType
	) => void;
	onEntityHover: (
		entityType: GameEntityType,
		entityIndex: number | null
	) => void;
	onFocusEntityOnLevelPreview: (
		entityType: GameEntityType,
		entityIndex: number
	) => void;
	onSidebarPanelExpandToggle: (
		ev: React.MouseEvent<HTMLElement>,
		sidebarPanel: SidebarPanel
	) => void;
}>;

export default function LevelSidebar(props: Props) {
	const {uiViews} = useLevelEditorContext();

	return (
		<div className={styles.sidebar}>
			{uiViews.has('PREVIEW') ? (
				<ErrorBoundary>
					<GeoPreview
						colors={EDITOR_UI_PIXEL_COLORS}
						geoPaintBuffer={props.levelPreviewGeoPaintBuffer}
						level={props.level}
						mapMouseMoveCoordinates={props.mapMouseMoveCoordinates}
						scale={4}
						useDevicePixelRatio={true}
					/>
				</ErrorBoundary>
			) : null}

			{uiViews.has('OBJECT') ? (
				<div className={styles.group}>
					<ErrorBoundary>
						<SidebarObjectAdder
							onAddingEntityLabel={props.onAddingEntityLabel}
						/>
					</ErrorBoundary>
				</div>
			) : null}

			<div className={styles.group + ' ' + styles.properties}>
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
						entityIndexHover={
							props.entityHover?.type === 'OBJECT'
								? props.entityHover.index
								: null
						}
						expanded={props.expandedSidebarPanels.has('OBJECTS')}
						levelObjects={props.level.objects ?? []}
						onEntityDelete={props.onEntityDelete}
						onEntityEditProperties={props.onEntityEditProperties}
						onEntityHover={props.onEntityHover}
						onFocusEntityOnLevelPreview={props.onFocusEntityOnLevelPreview}
						onSidebarPanelExpandToggle={props.onSidebarPanelExpandToggle}
					/>
				</ErrorBoundary>

				<ErrorBoundary>
					<SidebarDecoList
						dispatchEntitiesListItemsExpanded={
							props.dispatchDecosListItemsExpanded
						}
						entitiesListItemsExpanded={props.decosListItemsExpanded}
						entityIndexHover={
							props.entityHover?.type === 'DECO'
								? props.entityHover.index
								: null
						}
						expanded={props.expandedSidebarPanels.has('DECOS')}
						levelDecos={props.level.decos ?? []}
						onEntityDelete={props.onEntityDelete}
						onEntityEditProperties={props.onEntityEditProperties}
						onEntityHover={props.onEntityHover}
						onFocusEntityOnLevelPreview={props.onFocusEntityOnLevelPreview}
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

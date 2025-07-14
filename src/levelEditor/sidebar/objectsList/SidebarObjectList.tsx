import {Button, Collapse} from '@mantine/core';
import {memo, useCallback} from 'react';

import MessageBox from '../../../common/MessageBox';
import {useLevelEditorContext} from '../../LevelEditorContext';
import type {GameEntityType} from '../../types/GameEntityType';
import type {GameObjectType} from '../../types/GameObjectType';
import type {SidebarPanel} from '../../types/SidebarPanel';
import getGameObjectSimpleName from '../../util/getGameObjectSimpleName';
import SidebarObjectProperties from '../properties/SidebarObjectProperties';

import SidebarEntityList from './SidebarEntityList';
import styles from './SidebarObjectList.module.css';
import SidebarObjectText from './SidebarObjectText';
import type {ListItemsExpandedReducerAction} from './useListItemsExpandedReducer';

type Props = Readonly<{
	dispatchEntitiesListItemsExpanded: (
		action: ListItemsExpandedReducerAction
	) => void;
	entityIndexHover: number | null;
	entitiesListItemsExpanded: Map<number, number>;
	expanded: boolean;
	infoBeforeFilterComponent: React.ReactNode;
	levelObjects: Array<GameObjectType>;
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

function SidebarObjectList(props: Props) {
	const {dispatch, uiViews} = useLevelEditorContext();

	const getEntityName = useCallback(
		(entity: GameObjectType, filterText: string) => {
			const objName = entity.obj;
			if (!filterText.startsWith('obj')) {
				return getGameObjectSimpleName(objName);
			}

			return objName;
		},
		[]
	);

	const renderItemDisplayText = useCallback((entity: GameObjectType) => {
		return <SidebarObjectText obj={entity} />;
	}, []);

	const infoBeforeListComponent = props.expanded ? (
		<Collapse in={!uiViews.has('OBJECT')} mb="-xs">
			<MessageBox
				message={
					<Button
						onClick={() => {
							dispatch({
								type: 'setActiveUiViews',
								uiViews: new Set(uiViews).add('OBJECT'),
							});
						}}
						variant="filled"
					>
						Show objects
					</Button>
				}
				type="INFO"
				title="Objects are currently hidden"
				mb="xs"
			/>
		</Collapse>
	) : null;

	return (
		<SidebarEntityList
			dispatchEntitiesListItemsExpanded={
				props.dispatchEntitiesListItemsExpanded
			}
			entities={props.levelObjects}
			entitiesListItemsExpanded={props.entitiesListItemsExpanded}
			entityHighlightClassName={styles.highlight}
			entityIndexHover={props.entityIndexHover}
			entityPropertiesComponent={SidebarObjectProperties}
			expanded={props.expanded}
			getEntityName={getEntityName}
			infoBeforeFilterComponent={props.infoBeforeFilterComponent}
			infoBeforeListComponent={infoBeforeListComponent}
			name="Objects"
			onEntityDelete={props.onEntityDelete}
			onEntityEditProperties={props.onEntityEditProperties}
			onEntityHover={props.onEntityHover}
			onFocusEntityOnLevelPreview={props.onFocusEntityOnLevelPreview}
			onSidebarPanelExpandToggle={props.onSidebarPanelExpandToggle}
			renderItemDisplayText={renderItemDisplayText}
			sidebarPanelType="OBJECTS"
			type="OBJECT"
		/>
	);
}

export default memo(SidebarObjectList);

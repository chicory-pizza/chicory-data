import {memo, useCallback} from 'react';

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
	levelObjects: Array<GameObjectType>;
	onEntityDelete: (entityIndex: number, entityType: GameEntityType) => void;
	onEntityEditProperties: (
		entityIndex: number,
		properties: {
			[key: string]: string | number | null;
		},
		entityType: GameEntityType
	) => void;
	onEntityHover: (entityIndex: number | null) => void;
	onSidebarPanelExpandToggle: (
		ev: React.MouseEvent<HTMLElement>,
		sidebarPanel: SidebarPanel
	) => void;
}>;

function SidebarObjectList(props: Props) {
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
			name="Objects"
			onEntityDelete={props.onEntityDelete}
			onEntityEditProperties={props.onEntityEditProperties}
			onEntityHover={props.onEntityHover}
			onSidebarPanelExpandToggle={props.onSidebarPanelExpandToggle}
			renderItemDisplayText={renderItemDisplayText}
			sidebarPanelType="OBJECTS"
			type="OBJECT"
		/>
	);
}

export default memo(SidebarObjectList);

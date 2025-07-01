import {memo, useCallback} from 'react';

import type {DecorationType} from '../../types/DecorationType';
import type {GameEntityType} from '../../types/GameEntityType';
import type {SidebarPanel} from '../../types/SidebarPanel';
import SidebarDecoProperties from '../properties/SidebarDecoProperties';

import styles from './SidebarDecoList.module.css';
import SidebarEntityList from './SidebarEntityList';
import type {ListItemsExpandedReducerAction} from './useListItemsExpandedReducer';

type Props = Readonly<{
	dispatchEntitiesListItemsExpanded: (
		action: ListItemsExpandedReducerAction
	) => void;
	entityIndexHover: number | null;
	entitiesListItemsExpanded: Map<number, number>;
	expanded: boolean;
	levelDecos: Array<DecorationType>;
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
	onSidebarPanelExpandToggle: (
		ev: React.MouseEvent<HTMLElement>,
		sidebarPanel: SidebarPanel
	) => void;
}>;

function SidebarDecoList(props: Props) {
	const getEntityName = useCallback((entity: DecorationType) => {
		return entity.spr;
	}, []);

	const renderItemDisplayText = useCallback((entity: DecorationType) => {
		return entity.spr;
	}, []);

	return (
		<SidebarEntityList
			dispatchEntitiesListItemsExpanded={
				props.dispatchEntitiesListItemsExpanded
			}
			entities={props.levelDecos}
			entitiesListItemsExpanded={props.entitiesListItemsExpanded}
			entityHighlightClassName={styles.highlight}
			entityIndexHover={props.entityIndexHover}
			entityPropertiesComponent={SidebarDecoProperties}
			expanded={props.expanded}
			getEntityName={getEntityName}
			name="Decos"
			onEntityDelete={props.onEntityDelete}
			onEntityEditProperties={props.onEntityEditProperties}
			onEntityHover={props.onEntityHover}
			onSidebarPanelExpandToggle={props.onSidebarPanelExpandToggle}
			renderItemDisplayText={renderItemDisplayText}
			sidebarPanelType="DECOS"
			type="DECO"
		/>
	);
}

export default memo(SidebarDecoList);

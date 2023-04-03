// @flow strict

import {memo, useCallback} from 'react';

import type {DecorationType} from '../../types/DecorationType';
import type {GameEntityType} from '../../types/GameEntityType';
import SidebarDecoProperties from '../properties/SidebarDecoProperties';

import styles from './SidebarDecoList.module.css';
import SidebarEntityList from './SidebarEntityList';
import type {ListItemsExpandedReducerAction} from './useListItemsExpandedReducer';

type Props = $ReadOnly<{
	levelDecos: Array<DecorationType>,
	entityIndexHover: ?number,
	entitiesListItemsExpanded: Map<number, number>,
	onEntityDelete: (entityIndex: number, entityType: GameEntityType) => mixed,
	onEntityEditProperties: (
		entityIndex: number,
		properties: {
			[key: string]: string | number | null,
		},
		entityType: GameEntityType
	) => mixed,
	onEntityHover: (entityIndex: ?number) => mixed,
	dispatchEntitiesListItemsExpanded: (
		action: ListItemsExpandedReducerAction
	) => void,
}>;

function SidebarObjectList(props: Props): React$MixedElement {
	const getEntityName = useCallback(
		(entity: DecorationType, filterText: string) => {
			return entity.spr;
		},
		[]
	);

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
			getEntityName={getEntityName}
			name="Decos"
			onEntityDelete={props.onEntityDelete}
			onEntityEditProperties={props.onEntityEditProperties}
			onEntityHover={props.onEntityHover}
			openByDefault={false}
			renderItemDisplayText={renderItemDisplayText}
			type="DECO"
		/>
	);
}

export default (memo<Props>(SidebarObjectList): React$AbstractComponent<
	Props,
	mixed
>);

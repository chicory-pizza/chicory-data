// @flow strict

import {memo, useCallback} from 'react';

import type {DecorationType} from '../../types/DecorationType';
import type {GameEntityType} from '../../types/GameEntityType';
import SidebarDecoProperties from '../properties/SidebarDecoProperties';

import styles from './SidebarDecoList.module.css';
import SidebarEntityList from './SidebarEntityList';

type Props = $ReadOnly<{
	levelDecos: Array<DecorationType>,
	entityIndexHover: ?number,
	entitiesListItemsExpanded: Array<number>,
	onEntityDelete: (entityIndex: number, entityType: GameEntityType) => mixed,
	onEntityEditProperty: (
		entityIndex: number,
		key: string,
		value: string | number | null,
		entityType: GameEntityType
	) => mixed,
	onEntityHover: (entityIndex: ?number) => mixed,
	setEntitiesListItemsExpanded: (
		expandedIndexes: Array<number> | ((Array<number>) => Array<number>)
	) => mixed,
}>;

function SidebarObjectList(props: Props): React$MixedElement {
	const getEntityName = useCallback((entity, filterText) => {
		return entity.spr;
	}, []);

	const renderItemDisplayText = useCallback((entity) => {
		return entity.spr;
	}, []);

	return (
		<SidebarEntityList
			entities={props.levelDecos}
			entitiesListItemsExpanded={props.entitiesListItemsExpanded}
			entityHighlightClassName={styles.highlight}
			entityIndexHover={props.entityIndexHover}
			entityPropertiesComponent={SidebarDecoProperties}
			getEntityName={getEntityName}
			name="Decos"
			onEntityDelete={props.onEntityDelete}
			onEntityEditProperty={props.onEntityEditProperty}
			onEntityHover={props.onEntityHover}
			openByDefault={false}
			renderItemDisplayText={renderItemDisplayText}
			setEntitiesListItemsExpanded={props.setEntitiesListItemsExpanded}
			type="DECO"
		/>
	);
}

export default (memo<Props>(SidebarObjectList): React$AbstractComponent<
	Props,
	mixed
>);

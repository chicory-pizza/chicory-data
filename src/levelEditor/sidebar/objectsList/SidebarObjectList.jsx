// @flow strict

import {memo, useCallback} from 'react';

import type {GameEntityType} from '../../types/GameEntityType';
import type {GameObjectType} from '../../types/GameObjectType';
import SidebarObjectProperties from '../properties/SidebarObjectProperties';

import SidebarEntityList from './SidebarEntityList';
import styles from './SidebarObjectList.module.css';
import SidebarObjectText from './SidebarObjectText';

type Props = $ReadOnly<{
	levelObjects: Array<GameObjectType>,
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
		const objName = entity.obj;
		if (!filterText.startsWith('obj')) {
			return objName.slice('obj'.length);
		}

		return objName;
	}, []);

	const renderItemDisplayText = useCallback((entity) => {
		return <SidebarObjectText obj={entity} />;
	}, []);

	return (
		<SidebarEntityList
			entities={props.levelObjects}
			entitiesListItemsExpanded={props.entitiesListItemsExpanded}
			entityHighlightClassName={styles.highlight}
			entityIndexHover={props.entityIndexHover}
			entityPropertiesComponent={SidebarObjectProperties}
			getEntityName={getEntityName}
			name="Objects"
			onEntityDelete={props.onEntityDelete}
			onEntityEditProperty={props.onEntityEditProperty}
			onEntityHover={props.onEntityHover}
			openByDefault={true}
			renderItemDisplayText={renderItemDisplayText}
			setEntitiesListItemsExpanded={props.setEntitiesListItemsExpanded}
			type="OBJECT"
		/>
	);
}

export default (memo<Props>(SidebarObjectList): React$AbstractComponent<
	Props,
	mixed
>);

// @flow strict

import {useCallback, useState} from 'react';

import type {DecorationType} from '../../types/DecorationType';
import type {GameEntityType} from '../../types/GameEntityType';
import type {GameObjectType} from '../../types/GameObjectType';
import type {SidebarEntityPropertiesComponentType} from '../properties/SidebarEntityPropertiesComponentType';

import SidebarEntityItem from './SidebarEntityItem';
import styles from './SidebarEntityList.module.css';

type Props<
	Entity: GameObjectType | DecorationType,
	EntityType: GameEntityType
> = $ReadOnly<{
	entities: Array<Entity>,
	entitiesListItemsExpanded: Array<number>,
	entityHighlightClassName: string,
	entityIndexHover: ?number,
	entityPropertiesComponent: React$ComponentType<
		SidebarEntityPropertiesComponentType<Entity, EntityType>
	>,
	getEntityName: (entity: Entity, filter: string) => string,
	name: string,
	onEntityDelete: (entityIndex: number, entityType: EntityType) => mixed,
	onEntityEditProperty: (
		entityIndex: number,
		key: string,
		value: string | number | null,
		entityType: EntityType
	) => mixed,
	onEntityHover: (entityIndex: ?number) => mixed,
	renderItemDisplayText: (entity: Entity) => React$Node,
	setEntitiesListItemsExpanded: (
		expandedIndexes: Array<number> | ((Array<number>) => Array<number>)
	) => mixed,
	type: EntityType,
}>;

export default function SidebarEntityList<
	Entity: GameObjectType | DecorationType,
	EntityType: GameEntityType
>(props: Props<Entity, EntityType>): React$MixedElement {
	const {
		entities: unfilteredEntities,
		entitiesListItemsExpanded: expandedUnfilteredEntityIndexes,
		setEntitiesListItemsExpanded: setExpandedUnfilteredEntityIndexes,
	} = props;

	const [filter, setFilter] = useState<string>('');

	const onItemToggle = useCallback(
		(objectIndex: number) => {
			setExpandedUnfilteredEntityIndexes((expandedUnfilteredEntityIndexes) => {
				if (expandedUnfilteredEntityIndexes.includes(objectIndex)) {
					return expandedUnfilteredEntityIndexes.filter(
						(index) => index !== objectIndex
					);
				}

				return expandedUnfilteredEntityIndexes.concat(objectIndex);
			});
		},
		[setExpandedUnfilteredEntityIndexes]
	);

	const filterLowercase = filter.toLowerCase().trim().replace(/ /g, '_');

	const filteredEntities: $ReadOnlyArray<?Entity> = unfilteredEntities
		? filter === ''
			? unfilteredEntities
			: unfilteredEntities.map((entity) => {
					const entityName = props
						.getEntityName(entity, filterLowercase)
						.toLowerCase();

					return entityName.includes(filterLowercase) ? entity : null;
			  })
		: [];

	const filteredEntitiesCount =
		filter === ''
			? filteredEntities.length
			: filteredEntities.filter((ent) => ent != null).length;

	const expandedFilteredEntityIndexes: Array<number> =
		filter === ''
			? expandedUnfilteredEntityIndexes
			: expandedUnfilteredEntityIndexes.filter(
					(entityIndex) => filteredEntities[entityIndex] != null
			  );

	const unfilteredEntitiesLength = filteredEntities.length;

	return (
		<details className={styles.expander} open>
			<summary>
				{unfilteredEntitiesLength > 0
					? props.name +
					  ' (' +
					  (filteredEntitiesCount !== unfilteredEntitiesLength
							? `${filteredEntitiesCount} of ${unfilteredEntitiesLength} shown`
							: `${unfilteredEntitiesLength} total`) +
					  ')'
					: 'No ' + props.name.toLowerCase()}
			</summary>

			{unfilteredEntitiesLength > 0 ? (
				<div className={styles.filterWrap}>
					<span className={styles.filterLabel}>Filter:</span>

					<input
						className={styles.filter}
						onChange={(newFilter) => {
							setFilter(newFilter.currentTarget.value);
						}}
						spellCheck={false}
						type="search"
						value={filter}
					/>
				</div>
			) : null}

			<ul className={styles.list}>
				{filteredEntities.map((ent, index) => {
					if (ent == null) {
						return null;
					}

					return (
						<SidebarEntityItem
							entity={ent}
							entityPropertiesComponent={props.entityPropertiesComponent}
							expanded={expandedUnfilteredEntityIndexes.includes(index)}
							getEntityName={props.getEntityName}
							highlighted={props.entityIndexHover === index}
							highlightClassName={props.entityHighlightClassName}
							index={index}
							key={index}
							onItemToggle={onItemToggle}
							onEntityDelete={props.onEntityDelete}
							onEntityEditProperty={props.onEntityEditProperty}
							onEntityHover={props.onEntityHover}
							renderItemDisplayText={props.renderItemDisplayText}
							type={props.type}
						/>
					);
				})}
			</ul>

			<div className={styles.actions}>
				<button
					className={styles.rightPadding}
					disabled={
						filteredEntitiesCount === 0 ||
						expandedFilteredEntityIndexes.length === filteredEntitiesCount
					}
					onClick={() => {
						setExpandedUnfilteredEntityIndexes(
							Array.from(
								new Set(
									expandedUnfilteredEntityIndexes.concat(
										filteredEntities.reduce(
											(previous, currentValue, entityIndex) => {
												if (currentValue != null) {
													previous.push(entityIndex);
												}

												return previous;
											},
											[]
										)
									)
								)
							)
						);
					}}
					type="button"
				>
					Expand all
				</button>

				<button
					disabled={
						filteredEntitiesCount === 0 ||
						expandedFilteredEntityIndexes.length === 0
					}
					onClick={() => {
						// Collapse all entities that are currently visible
						setExpandedUnfilteredEntityIndexes(
							expandedUnfilteredEntityIndexes.filter(
								(entityIndex) => filteredEntities[entityIndex] == null
							)
						);
					}}
					type="button"
				>
					Collapse all
				</button>
			</div>
		</details>
	);
}

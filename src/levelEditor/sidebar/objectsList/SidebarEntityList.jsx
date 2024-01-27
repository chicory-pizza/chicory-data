// @flow strict

import {useCallback, useState} from 'react';

import type {DecorationType} from '../../types/DecorationType';
import type {GameEntityType} from '../../types/GameEntityType';
import type {GameObjectType} from '../../types/GameObjectType';
import type {SidebarPanel} from '../../types/SidebarPanel';
import type {SidebarEntityPropertiesComponentType} from '../properties/SidebarEntityPropertiesComponentType';

import SidebarEntityItem from './SidebarEntityItem';
import styles from './SidebarEntityList.module.css';
import type {ListItemsExpandedReducerAction} from './useListItemsExpandedReducer';

type Props<
	Entity: GameObjectType | DecorationType,
	EntityType: GameEntityType,
> = $ReadOnly<{
	dispatchEntitiesListItemsExpanded: (
		action: ListItemsExpandedReducerAction
	) => void,
	entities: Array<Entity>,
	entitiesListItemsExpanded: Map<number, number>,
	entityHighlightClassName: string,
	entityIndexHover: ?number,
	entityPropertiesComponent: React$ComponentType<
		SidebarEntityPropertiesComponentType<Entity, EntityType>,
	>,
	expanded: boolean,
	getEntityName: (entity: Entity, filter: string) => string,
	name: string,
	onEntityDelete: (entityIndex: number, entityType: EntityType) => mixed,
	onEntityEditProperties: (
		entityIndex: number,
		properties: {
			[key: string]: string | number | null,
		},
		entityType: EntityType
	) => mixed,
	onEntityHover: (entityIndex: ?number) => mixed,
	onSidebarPanelExpandToggle: (
		ev: SyntheticMouseEvent<HTMLElement>,
		sidebarPanel: SidebarPanel
	) => mixed,
	renderItemDisplayText: (entity: Entity) => React$Node,
	sidebarPanelType: SidebarPanel,
	type: EntityType,
}>;

export default function SidebarEntityList<
	Entity: GameObjectType | DecorationType,
	EntityType: GameEntityType,
>(props: Props<Entity, EntityType>): React$MixedElement {
	const {
		entities: unfilteredEntities,
		entitiesListItemsExpanded: expandedUnfilteredEntityIndexes,
		dispatchEntitiesListItemsExpanded,
	} = props;

	const onItemToggle = useCallback(
		(objectIndex: number) => {
			if (expandedUnfilteredEntityIndexes.has(objectIndex)) {
				dispatchEntitiesListItemsExpanded({
					type: 'collapse',
					indexes: [objectIndex],
				});
			} else {
				dispatchEntitiesListItemsExpanded({
					type: 'expand',
					indexes: [objectIndex],
				});
			}
		},
		[dispatchEntitiesListItemsExpanded, expandedUnfilteredEntityIndexes]
	);

	// Filtering
	const [filter, setFilter] = useState<string>('');
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

	const expandedFilteredEntityIndexes: $ReadOnlyArray<number> =
		filter === ''
			? Array.from(expandedUnfilteredEntityIndexes.keys())
			: Array.from(expandedUnfilteredEntityIndexes.keys()).filter(
					(entityIndex) => filteredEntities[entityIndex] != null
				);

	const unfilteredEntitiesLength = filteredEntities.length;

	return (
		<details className={styles.expander} open={props.expanded}>
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
			<summary
				onClick={(ev) =>
					props.onSidebarPanelExpandToggle(ev, props.sidebarPanelType)
				}
			>
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
							// $FlowIssue[incompatible-type-arg] https://github.com/facebook/flow/issues/8788
							entityPropertiesComponent={props.entityPropertiesComponent}
							expandedTime={expandedUnfilteredEntityIndexes.get(index)}
							// $FlowIssue[incompatible-type] https://github.com/facebook/flow/issues/8788
							getEntityName={props.getEntityName}
							highlightClassName={props.entityHighlightClassName}
							highlighted={props.entityIndexHover === index}
							index={index}
							key={index}
							// $FlowIssue[incompatible-type] https://github.com/facebook/flow/issues/8788
							onEntityDelete={props.onEntityDelete}
							// $FlowIssue[incompatible-type] https://github.com/facebook/flow/issues/8788
							onEntityEditProperties={props.onEntityEditProperties}
							onEntityHover={props.onEntityHover}
							onItemToggle={onItemToggle}
							// $FlowIssue[incompatible-type] https://github.com/facebook/flow/issues/8788
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
						dispatchEntitiesListItemsExpanded({
							type: 'expand',
							indexes: filteredEntities.reduce(
								(previous, currentValue, entityIndex) => {
									if (currentValue != null) {
										previous.push(entityIndex);
									}

									return previous;
								},
								([]: Array<number>)
							),
						});
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
						dispatchEntitiesListItemsExpanded({
							type: 'collapse',
							indexes: filteredEntities.reduce(
								(previous, currentValue, entityIndex) => {
									if (currentValue != null) {
										previous.push(entityIndex);
									}

									return previous;
								},
								([]: Array<number>)
							),
						});
					}}
					type="button"
				>
					Collapse all
				</button>
			</div>
		</details>
	);
}

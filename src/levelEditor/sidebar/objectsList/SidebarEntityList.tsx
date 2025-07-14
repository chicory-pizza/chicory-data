import {Button, Group, Stack, TextInput} from '@mantine/core';
import {useCallback, useState} from 'react';

import type {DecorationType} from '../../types/DecorationType';
import type {GameEntityType} from '../../types/GameEntityType';
import type {GameObjectType} from '../../types/GameObjectType';
import type {SidebarPanel} from '../../types/SidebarPanel';
import type {SidebarEntityPropertiesComponentType} from '../properties/SidebarEntityPropertiesComponentType';

import SidebarEntityItem from './SidebarEntityItem';
import styles from './SidebarEntityList.module.css';
import type {ListItemsExpandedReducerAction} from './useListItemsExpandedReducer';

type Props<Entity extends GameObjectType | DecorationType> = Readonly<{
	dispatchEntitiesListItemsExpanded: (
		action: ListItemsExpandedReducerAction
	) => void;
	entities: Array<Entity>;
	entitiesListItemsExpanded: Map<number, number>;
	entityHighlightClassName: string;
	entityIndexHover: number | null;
	entityPropertiesComponent: React.ComponentType<
		SidebarEntityPropertiesComponentType<Entity>
	>;
	expanded: boolean;
	getEntityName: (entity: Entity, filter: string) => string;
	infoBeforeListComponent?: React.ReactNode;
	name: string;
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
	renderItemDisplayText: (entity: Entity) => React.ReactNode;
	sidebarPanelType: SidebarPanel;
	type: GameEntityType;
}>;

export default function SidebarEntityList<
	Entity extends GameObjectType | DecorationType,
>(props: Props<Entity>) {
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

	const filteredEntities = unfilteredEntities
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

	const expandedFilteredEntityIndexes: ReadonlyArray<number> =
		filter === ''
			? Array.from(expandedUnfilteredEntityIndexes.keys())
			: Array.from(expandedUnfilteredEntityIndexes.keys()).filter(
					(entityIndex) => filteredEntities[entityIndex] != null
				);

	const unfilteredEntitiesLength = filteredEntities.length;

	return (
		<details className={styles.expander} open={props.expanded}>
			<summary
				onClick={(ev) => {
					props.onSidebarPanelExpandToggle(ev, props.sidebarPanelType);
				}}
			>
				{unfilteredEntitiesLength > 0
					? props.name +
						' (' +
						(filteredEntitiesCount !== unfilteredEntitiesLength
							? `${filteredEntitiesCount.toString()} of ${unfilteredEntitiesLength.toString()} shown`
							: `${unfilteredEntitiesLength.toString()} total`) +
						')'
					: 'No ' + props.name.toLowerCase()}
			</summary>

			<Stack gap="xs">
				{unfilteredEntitiesLength > 0 ? (
					<Group grow mt="xs">
						<TextInput
							classNames={{
								root: styles.filterInputRoot,
								wrapper: styles.filterInputWrapper,
							}}
							label="Filter:"
							onChange={(newFilter) => {
								setFilter(newFilter.currentTarget.value);
							}}
							spellCheck={false}
							type="search"
							value={filter}
						/>
					</Group>
				) : null}

				{props.infoBeforeListComponent ?? null}

				{filteredEntitiesCount > 0 ? (
					<ul className={styles.list}>
						{filteredEntities.map((ent, index) => {
							if (ent == null) {
								return null;
							}

							return (
								<SidebarEntityItem
									entity={ent}
									entityPropertiesComponent={props.entityPropertiesComponent}
									expandedTime={expandedUnfilteredEntityIndexes.get(index)}
									getEntityName={props.getEntityName}
									highlightClassName={props.entityHighlightClassName}
									highlighted={props.entityIndexHover === index}
									index={index}
									// We don't have unique IDs for entities :(
									// eslint-disable-next-line @eslint-react/no-array-index-key
									key={index}
									onEntityDelete={props.onEntityDelete}
									onEntityEditProperties={props.onEntityEditProperties}
									onEntityHover={props.onEntityHover}
									onFocusEntityOnLevelPreview={
										props.onFocusEntityOnLevelPreview
									}
									onItemToggle={onItemToggle}
									renderItemDisplayText={props.renderItemDisplayText}
									type={props.type}
								/>
							);
						})}
					</ul>
				) : null}

				{unfilteredEntitiesLength > 0 ? (
					<Group gap="xs">
						<Button
							disabled={
								filteredEntitiesCount === 0 ||
								expandedFilteredEntityIndexes.length === filteredEntitiesCount
							}
							onClick={() => {
								dispatchEntitiesListItemsExpanded({
									type: 'expand',
									indexes: filteredEntities.reduce<Array<number>>(
										(previous, currentValue, entityIndex) => {
											if (currentValue != null) {
												previous.push(entityIndex);
											}

											return previous;
										},
										[]
									),
								});
							}}
							variant="default"
						>
							Expand all
						</Button>

						<Button
							disabled={
								filteredEntitiesCount === 0 ||
								expandedFilteredEntityIndexes.length === 0
							}
							onClick={() => {
								// Collapse all entities that are currently visible
								dispatchEntitiesListItemsExpanded({
									type: 'collapse',
									indexes: filteredEntities.reduce<Array<number>>(
										(previous, currentValue, entityIndex) => {
											if (currentValue != null) {
												previous.push(entityIndex);
											}

											return previous;
										},
										[]
									),
								});
							}}
							variant="default"
						>
							Collapse all
						</Button>
					</Group>
				) : null}
			</Stack>
		</details>
	);
}

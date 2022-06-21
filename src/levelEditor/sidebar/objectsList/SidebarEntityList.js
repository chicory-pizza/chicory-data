// @flow strict

import {memo, useCallback, useState} from 'react';

import type {DecorationType} from '../../types/DecorationType';
import type {GameEntityType} from '../../types/GameEntityType';
import type {GameObjectType} from '../../types/GameObjectType';

import SidebarEntityItem from './SidebarEntityItem';
import styles from './SidebarEntityList.module.css';

type Props = $ReadOnly<{
	type: GameEntityType,
	levelObjects?: Array<GameObjectType>,
	levelDecos?: Array<DecorationType>,
	entityIndexHover: ?number,
	entitiesListItemsExpanded: Array<number>,
	name: string,
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

function SidebarEntityList(props: Props): React$Node {
	const {
		levelObjects: unfilteredObjects,
		levelDecos: unfilteredDecos,
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

	const filteredObjects: $ReadOnlyArray<?GameObjectType> = unfilteredObjects
		? filter === ''
			? unfilteredObjects
			: unfilteredObjects.map((obj) => {
					let objName = obj.obj.toLowerCase();
					if (!filterLowercase.startsWith('obj')) {
						objName = objName.slice('obj'.length);
					}

					return objName.includes(filterLowercase) ? obj : null;
			  })
		: [];

	const filteredDecos: $ReadOnlyArray<?DecorationType> = unfilteredDecos
		? filter === ''
			? unfilteredDecos
			: unfilteredDecos.map((dec) => {
					let decName = dec.spr.toLowerCase();
					return decName.includes(filterLowercase) ? dec : null;
			  })
		: [];

	const filteredEntities:
		| $ReadOnlyArray<?DecorationType>
		| $ReadOnlyArray<?GameObjectType> =
		filteredObjects.length > 0 ? filteredObjects : filteredDecos;

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
	const unfilteredEntitiesLength: number = filteredEntities.length;
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
				{unfilteredObjects
					? filteredObjects.map((ent, index) => {
							if (ent == null) {
								return null;
							}
							return (
								<SidebarEntityItem
									expanded={expandedUnfilteredEntityIndexes.includes(index)}
									highlighted={props.entityIndexHover === index}
									index={index}
									key={index}
									obj={ent}
									onItemToggle={onItemToggle}
									onEntityDelete={props.onEntityDelete}
									onEntityEditProperty={props.onEntityEditProperty}
									onEntityHover={props.onEntityHover}
									type={props.type}
								/>
							);
					  })
					: filteredDecos.map((ent, index) => {
							if (ent == null) {
								return null;
							}
							return (
								<SidebarEntityItem
									expanded={expandedUnfilteredEntityIndexes.includes(index)}
									highlighted={props.entityIndexHover === index}
									index={index}
									key={index}
									dec={ent}
									onItemToggle={onItemToggle}
									onEntityDelete={props.onEntityDelete}
									onEntityEditProperty={props.onEntityEditProperty}
									onEntityHover={props.onEntityHover}
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

export default (memo<Props>(SidebarEntityList): React$AbstractComponent<
	Props,
	mixed
>);

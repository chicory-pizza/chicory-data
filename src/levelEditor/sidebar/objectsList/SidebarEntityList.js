// @flow strict

import {memo, useCallback, useState} from 'react';

import type {GameEntityType} from '../../types/GameEntityType';
import type {DecorationType} from '../../types/DecorationType';

import SidebarEntityItem from './SidebarEntityItem';
import styles from './SidebarEntityList.module.css';

type Props = $ReadOnly<{
	type: GameEntityType,
	levelEntities: Array<DecorationType>,
	entityIndexHover: ?number,
	entitiesListItemsExpanded: Array<number>,
	name: String,
	onEntityDelete: (entityIndex: number) => mixed,
	onEntityEditProperty: (
		entityIndex: number,
		key: string,
		value: string | number
	) => mixed,
	onEntityHover: (entityIndex: ?number) => mixed,
	setEntitiesListItemsExpanded: (expandedIndexes: Array<number>) => mixed,
}>;

function SidebarEntityList(props: Props): React$Node {
	const {
		levelEntities: unfilteredEntities,
		entitiesListItemsExpanded: expandedUnfilteredEntityIndexes,
		setEntitiesListItemsExpanded: setExpandedUnfilteredEntityIndexes,
	} = props;

	const [filter, setFilter] = useState('');

	const onItemToggle = useCallback(
		(entityIndex: number) => {
			if (expandedUnfilteredEntityIndexes.includes(entityIndex)) {
				setExpandedUnfilteredEntityIndexes(
					expandedUnfilteredEntityIndexes.filter(
						(index) => index !== entityIndex
					)
				);
			} else {
				setExpandedUnfilteredEntityIndexes(
					expandedUnfilteredEntityIndexes.concat(entityIndex)
				);
			}
		},
		[expandedUnfilteredEntityIndexes, setExpandedUnfilteredEntityIndexes]
	);

	const filterLowercase = filter.toLowerCase().trim();
	const filteredEntities: $ReadOnlyArray<?DecorationType> =
		filter === ''
			? unfilteredEntities
			: unfilteredEntities.map((ent) => {
					let entName =
						props.type === 'OBJECT'
							? ent.obj.toLowerCase()
							: ent.spr.toLowerCase();

					if (!filterLowercase.startsWith('obj') && entName.startsWith('obj')) {
						entName = entName.slice('obj'.length);
					}

					return entName.includes(filterLowercase) ? ent : null;
			  });
	const filteredEntitiesCount =
		filter === ''
			? filteredEntities.length
			: filteredEntities.filter((obj) => obj != null).length;

	const expandedFilteredEntityIndexes: Array<number> =
		filter === ''
			? expandedUnfilteredEntityIndexes
			: expandedUnfilteredEntityIndexes.filter(
					(entityIndex) => filteredEntities[entityIndex] != null
			  );

	return (
		<details className={styles.expander} open>
			<summary>
				{unfilteredEntities.length > 0
					? props.name +
					  ' (' +
					  (filteredEntitiesCount !== unfilteredEntities.length
							? `${filteredEntitiesCount} of ${unfilteredEntities.length} shown`
							: `${unfilteredEntities.length} total`) +
					  ')'
					: 'No ' + props.name.toLowerCase()}
			</summary>

			{unfilteredEntities.length > 0 ? (
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
							expanded={expandedUnfilteredEntityIndexes.includes(index)}
							highlighted={props.entityIndexHover === index}
							index={index}
							key={index}
							ent={ent}
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

// @flow strict

import {memo, useCallback, useState} from 'react';

import type {GameObjectType} from '../../types/GameObjectType';

import styles from './SidebarEntityList.module.css';
import SidebarObjectItem from './SidebarObjectItem';

type Props = $ReadOnly<{
	levelObjects: Array<GameObjectType>,
	objectIndexHover: ?number,
	objectsListItemsExpanded: Array<number>,
	onObjectDelete: (objectIndex: number) => mixed,
	onObjectEditProperty: (
		objectIndex: number,
		key: string,
		value: string | number
	) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
	setObjectsListItemsExpanded: (expandedIndexes: Array<number>) => mixed,
}>;

function SidebarObjectsList(props: Props): React$Node {
	const {
		levelObjects: unfilteredObjects,
		objectsListItemsExpanded: expandedUnfilteredObjectIndexes,
		setObjectsListItemsExpanded: setExpandedUnfilteredObjectIndexes,
	} = props;

	const [filter, setFilter] = useState('');

	const onItemToggle = useCallback(
		(objectIndex: number) => {
			if (expandedUnfilteredObjectIndexes.includes(objectIndex)) {
				setExpandedUnfilteredObjectIndexes(
					expandedUnfilteredObjectIndexes.filter(
						(index) => index !== objectIndex
					)
				);
			} else {
				setExpandedUnfilteredObjectIndexes(
					expandedUnfilteredObjectIndexes.concat(objectIndex)
				);
			}
		},
		[expandedUnfilteredObjectIndexes, setExpandedUnfilteredObjectIndexes]
	);

	const filterLowercase = filter.toLowerCase().trim();
	const filteredObjects: $ReadOnlyArray<?GameObjectType> =
		filter === ''
			? unfilteredObjects
			: unfilteredObjects.map((obj) => {
					let objName = obj.obj.toLowerCase();
					if (!filterLowercase.startsWith('obj')) {
						objName = objName.slice('obj'.length);
					}

					return objName.includes(filterLowercase) ? obj : null;
			  });
	const filteredObjectsCount =
		filter === ''
			? filteredObjects.length
			: filteredObjects.filter((obj) => obj != null).length;

	const expandedFilteredObjectIndexes: Array<number> =
		filter === ''
			? expandedUnfilteredObjectIndexes
			: expandedUnfilteredObjectIndexes.filter(
					(objectIndex) => filteredObjects[objectIndex] != null
			  );

	return (
		<details className={styles.expander} open>
			<summary>
				{unfilteredObjects.length > 0
					? 'Objects (' +
					  (filteredObjectsCount !== unfilteredObjects.length
							? `${filteredObjectsCount} of ${unfilteredObjects.length} shown`
							: `${unfilteredObjects.length} total`) +
					  ')'
					: 'No objects'}
			</summary>

			{unfilteredObjects.length > 0 ? (
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
				{filteredObjects.map((obj, index) => {
					if (obj == null) {
						return null;
					}

					return (
						<SidebarObjectItem
							expanded={expandedUnfilteredObjectIndexes.includes(index)}
							highlighted={props.objectIndexHover === index}
							index={index}
							key={index}
							obj={obj}
							onItemToggle={onItemToggle}
							onObjectDelete={props.onObjectDelete}
							onObjectEditProperty={props.onObjectEditProperty}
							onObjectHover={props.onObjectHover}
						/>
					);
				})}
			</ul>

			<div className={styles.actions}>
				<button
					className={styles.rightPadding}
					disabled={
						filteredObjectsCount === 0 ||
						expandedFilteredObjectIndexes.length === filteredObjectsCount
					}
					onClick={() => {
						setExpandedUnfilteredObjectIndexes(
							Array.from(
								new Set(
									expandedUnfilteredObjectIndexes.concat(
										filteredObjects.reduce(
											(previous, currentValue, objectIndex) => {
												if (currentValue != null) {
													previous.push(objectIndex);
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
						filteredObjectsCount === 0 ||
						expandedFilteredObjectIndexes.length === 0
					}
					onClick={() => {
						// Collapse all objects that are currently visible
						setExpandedUnfilteredObjectIndexes(
							expandedUnfilteredObjectIndexes.filter(
								(objectIndex) => filteredObjects[objectIndex] == null
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

export default (memo<Props>(SidebarObjectsList): React$AbstractComponent<
	Props,
	mixed
>);

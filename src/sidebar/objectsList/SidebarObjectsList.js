// @flow strict

import {memo, useCallback} from 'react';

import type {GameObjectType} from '../../types/GameObjectType';

import SidebarObjectItem from './SidebarObjectItem';
import styles from './SidebarObjectsList.module.css';

type Props = $ReadOnly<{
	levelObjects: Array<GameObjectType>,
	objectIndexHover: ?number,
	objectsListItemsExpanded: Array<number>,
	onObjectDelete: (objectIndex: number) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
	setObjectsListItemsExpanded: (expandedIndexes: Array<number>) => mixed,
}>;

function SidebarObjectsList(props: Props): React$Node {
	const {objectsListItemsExpanded, setObjectsListItemsExpanded} = props;

	const onItemToggle = useCallback(
		(objectIndex: number) => {
			if (objectsListItemsExpanded.includes(objectIndex)) {
				setObjectsListItemsExpanded(
					objectsListItemsExpanded.filter((index) => index !== objectIndex)
				);
			} else {
				setObjectsListItemsExpanded(
					objectsListItemsExpanded.concat(objectIndex)
				);
			}
		},
		[objectsListItemsExpanded, setObjectsListItemsExpanded]
	);

	return (
		<details open>
			<summary>
				{props.levelObjects.length > 0
					? 'Objects (' + props.levelObjects.length + ')'
					: 'No objects'}
			</summary>

			<ul className={styles.list}>
				{props.levelObjects.map((obj, index) => {
					return (
						<SidebarObjectItem
							expanded={props.objectsListItemsExpanded.includes(index)}
							highlighted={props.objectIndexHover === index}
							index={index}
							key={index}
							obj={obj}
							onItemToggle={onItemToggle}
							onObjectDelete={props.onObjectDelete}
							onObjectHover={props.onObjectHover}
						/>
					);
				})}
			</ul>

			<div className={styles.actions}>
				<button
					className={styles.rightPadding}
					disabled={
						props.objectsListItemsExpanded.length === props.levelObjects.length
					}
					onClick={() => {
						setObjectsListItemsExpanded(
							props.levelObjects.map((_, index) => index)
						);
					}}
					type="button"
				>
					Expand all
				</button>

				<button
					disabled={props.objectsListItemsExpanded.length === 0}
					onClick={() => {
						setObjectsListItemsExpanded([]);
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

// @flow strict

import {memo} from 'react';

import type {GameObjectType} from '../../types/GameObjectType';

import SidebarObjectItem from './SidebarObjectItem';
import styles from './SidebarObjectsList.module.css';

type Props = $ReadOnly<{
	levelObjects: Array<GameObjectType>,
	objectIndexHover: ?number,
	objectsListItemsExpanded: Array<number>,
	onObjectDelete: (objectIndex: number) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
	onObjectListItemToggle: (objectIndex: number) => mixed,
}>;

function SidebarObjectsList(props: Props): React$Node {
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
							onObjectDelete={props.onObjectDelete}
							onObjectHover={props.onObjectHover}
							onObjectListItemToggle={props.onObjectListItemToggle}
						/>
					);
				})}
			</ul>
		</details>
	);
}

export default (memo<Props>(SidebarObjectsList): React$AbstractComponent<
	Props,
	mixed
>);

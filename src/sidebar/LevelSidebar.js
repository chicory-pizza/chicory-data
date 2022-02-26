// @flow strict

import type {LevelType} from '../types/LevelType';

import GeoPreview from '../GeoPreview';
import React from 'react';
import SidebarMouseMoveCoordinates from './SidebarMouseMoveCoordinates';
import SidebarObjectsList from './SidebarObjectsList';

import styles from './LevelSidebar.module.css';

function withoutObjectsAndDecos(
	level: LevelType
): $Diff<LevelType, {geo: string}> {
	const {objects, decos, geo, ...otherProps} = level;
	return otherProps;
}

type Props = $ReadOnly<{
	level: LevelType,
	mapMouseMoveCoordinates: ?[number, number],
	objectIndexHover: ?number,
	onObjectHover: (objectIndex: ?number) => mixed,
}>;

export default function LevelSidebar(props: Props): React$Node {
	const levelObjects = props.level.objects;

	const currentObject =
		levelObjects != null && props.objectIndexHover != null
			? levelObjects[props.objectIndexHover]
			: null;

	return (
		<div className={styles.sidebar}>
			<GeoPreview
				level={props.level}
				mapMouseMoveCoordinates={props.mapMouseMoveCoordinates}
				scale={4}
			/>

			<div className={styles.group + ' ' + styles.properties}>
				<div>{currentObject ? 'Object properties' : 'Level properties'}</div>

				<code>
					{currentObject
						? JSON.stringify(currentObject, null, 2)
						: JSON.stringify(withoutObjectsAndDecos(props.level), null, 2)}
				</code>
			</div>

			<div className={styles.group + ' ' + styles.objectsList}>
				<SidebarObjectsList
					levelObjects={levelObjects ?? []}
					objectIndexHover={props.objectIndexHover}
					onObjectHover={props.onObjectHover}
				/>
			</div>

			<div className={styles.group}>
				<SidebarMouseMoveCoordinates
					mapMouseMoveCoordinates={props.mapMouseMoveCoordinates}
				/>
			</div>
		</div>
	);
}

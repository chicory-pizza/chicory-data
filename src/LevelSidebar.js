// @flow strict

import type {LevelType} from './types/LevelType';

import React from 'react';
import SidebarObjectText from './SidebarObjectText';

import styles from './LevelSidebar.module.css';

function withoutObjectsAndDecos(
	level: LevelType
): $Diff<LevelType, {geo: string}> {
	const {objects, decos, geo, ...otherProps} = level;
	return otherProps;
}

type Props = {
	level: LevelType,
	mapMouseMoveCoordinates: ?[number, number],
	objectIndexHover: ?number,
	onObjectHover: (objectIndex: ?number) => mixed,
};

export default function LevelSidebar(props: Props): React$Node {
	const levelObjects = props.level.objects;

	return (
		<div className={styles.sidebar}>
			<div
				className={
					styles.mapMouseMoveCoordinates +
					' ' +
					(props.mapMouseMoveCoordinates == null ? styles.mouseHidden : '')
				}
			>
				Mouse:{' '}
				{props.mapMouseMoveCoordinates != null ? (
					<>
						{props.mapMouseMoveCoordinates[0]},{' '}
						{props.mapMouseMoveCoordinates[1]}
					</>
				) : null}
			</div>

			<div className={styles.properties}>
				<div>
					{levelObjects != null && props.objectIndexHover != null
						? 'Object properties'
						: 'Level properties'}
				</div>

				<code>
					{levelObjects != null && props.objectIndexHover != null
						? JSON.stringify(levelObjects[props.objectIndexHover], null, 2)
						: JSON.stringify(withoutObjectsAndDecos(props.level), null, 2)}
				</code>
			</div>

			{levelObjects != null ? (
				<details className={styles.objectsBox} open>
					<summary>Objects ({levelObjects.length}):</summary>

					<ul className={styles.objectsList}>
						{levelObjects.map((obj, index) => {
							return (
								<li key={index}>
									<button
										className={
											styles.objectItem +
											' ' +
											(props.objectIndexHover === index
												? styles.objectHighlight
												: '')
										}
										onMouseEnter={() => props.onObjectHover(index)}
										onMouseLeave={() => props.onObjectHover(null)}
									>
										<SidebarObjectText obj={obj} />
									</button>
								</li>
							);
						})}
					</ul>
				</details>
			) : null}
		</div>
	);
}

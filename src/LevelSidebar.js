// @flow strict

import type {LevelType} from './types/LevelType';

import React from 'react';
import SidebarObjectText from './SidebarObjectText';

import styles from './LevelSidebar.module.css';

type Props = {
	level: LevelType,
	mapMouseMoveCoordinates: ?[number, number],
	objectIndexHover: ?number,
	onObjectHover: (objectIndex: ?number) => mixed,
};

export default function LevelSidebar(props: Props): React$Node {
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
				{props.level.objects != null && props.objectIndexHover != null ? (
					<code>
						{JSON.stringify(
							props.level.objects[props.objectIndexHover],
							null,
							2
						)}
					</code>
				) : null}
			</div>

			{props.level.objects != null ? (
				<details className={styles.objectsBox} open>
					<summary>Objects ({props.level.objects.length}):</summary>

					<ul className={styles.objectsList}>
						{props.level.objects.map((obj, index) => {
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

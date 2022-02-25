// @flow strict

import type {LevelType} from './LevelType';

import React from 'react';
import {useMemo} from 'react';

import styles from './LevelSelector.module.css';

type Props = {
	currentLevelId: string,
	levels: {[levelId: string]: LevelType},
	onNewLevelIdSelect: (levelId: string) => mixed,
};

export default function LevelSelector(props: Props): React$Node {
	const levelIds = useMemo(() => {
		const keys = Object.keys(props.levels);

		return keys.sort();
	}, [props.levels]);

	return (
		<div className={styles.root}>
			<span className={styles.label}>Go to level:</span>

			<select
				onChange={(ev) => props.onNewLevelIdSelect(ev.target.value)}
				value={props.currentLevelId}
			>
				{levelIds.map((id) => {
					return (
						<option key={id} value={id}>
							{id}
						</option>
					);
				})}
			</select>
		</div>
	);
}

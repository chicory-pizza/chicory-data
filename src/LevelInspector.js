// @flow strict

import type {LevelType} from './types/LevelType';

import LevelPreview from './LevelPreview';
import LevelSidebar from './sidebar/LevelSidebar';
import React from 'react';
import {useCallback, useEffect, useState} from 'react';

import styles from './LevelInspector.module.css';

type Props = $ReadOnly<{
	level: LevelType,
}>;

export default function LevelInspector({level}: Props): React$Node {
	useEffect(() => {
		console.log(level);
	}, [level]);

	const [mapMouseMoveCoordinates, setMapMouseMoveCoordinates] =
		useState<?[number, number]>(null);
	const [objectIndexHover, setObjectIndexHover] = useState<?number>(null);

	const onMapMouseLeave = useCallback(
		(ev: SyntheticMouseEvent<>) => {
			setMapMouseMoveCoordinates(null);
		},
		[setMapMouseMoveCoordinates]
	);

	const onMapMouseMove = useCallback(
		(ev: SyntheticMouseEvent<HTMLDivElement>) => {
			const rect = ev.currentTarget.getBoundingClientRect();

			setMapMouseMoveCoordinates([
				parseInt(ev.clientX - rect.left, 10),
				parseInt(ev.clientY - rect.top, 10),
			]);
		},
		[setMapMouseMoveCoordinates]
	);

	return (
		<div className={styles.root}>
			<div className={styles.preview}>
				<LevelPreview
					level={level}
					onMapMouseLeave={onMapMouseLeave}
					onMapMouseMove={onMapMouseMove}
					objectIndexHover={objectIndexHover}
					onObjectHover={setObjectIndexHover}
				/>
			</div>

			<LevelSidebar
				level={level}
				mapMouseMoveCoordinates={mapMouseMoveCoordinates}
				objectIndexHover={objectIndexHover}
				onObjectHover={setObjectIndexHover}
			/>
		</div>
	);
}

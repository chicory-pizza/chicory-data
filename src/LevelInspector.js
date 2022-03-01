// @flow strict

import {useCallback, useEffect, useState} from 'react';

import styles from './LevelInspector.module.css';
import LevelPreview from './LevelPreview';
import LevelSidebar from './sidebar/LevelSidebar';
import type {GameObjectEntityType} from './types/GameObjectEntityType';
import type {LevelType} from './types/LevelType';

type Props = $ReadOnly<{
	level: LevelType,
	setSingleLevelData: (LevelType) => mixed,
}>;

export default function LevelInspector({
	level,
	setSingleLevelData,
}: Props): React$Node {
	useEffect(() => {
		console.log(level);
	}, [level]);

	const [addingObjectEntity, setAddingObjectEntity] =
		useState<?GameObjectEntityType>(null);

	const [mapMouseMoveCoordinates, setMapMouseMoveCoordinates] =
		useState<?[number, number]>(null);

	const [objectIndexHover, setObjectIndexHover] = useState<?number>(null);

	function onMapMouseClick(ev: SyntheticMouseEvent<>) {
		if (addingObjectEntity == null || mapMouseMoveCoordinates == null) {
			return;
		}

		setSingleLevelData({
			...level,
			objects: (level.objects ?? []).concat({
				obj: addingObjectEntity,
				x: mapMouseMoveCoordinates[0],
				y: mapMouseMoveCoordinates[1],
			}),
		});

		if (!ev.shiftKey) {
			setAddingObjectEntity(null);
		}
	}

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
					addingObjectEntity={addingObjectEntity}
					level={level}
					mapMouseMoveCoordinates={mapMouseMoveCoordinates}
					objectIndexHover={objectIndexHover}
					onMapMouseClick={onMapMouseClick}
					onMapMouseLeave={onMapMouseLeave}
					onMapMouseMove={onMapMouseMove}
					onObjectHover={setObjectIndexHover}
				/>
			</div>

			<LevelSidebar
				level={level}
				mapMouseMoveCoordinates={mapMouseMoveCoordinates}
				objectIndexHover={objectIndexHover}
				onAddingObjectEntity={setAddingObjectEntity}
				onObjectHover={setObjectIndexHover}
			/>
		</div>
	);
}

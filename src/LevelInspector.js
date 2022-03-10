// @flow strict

import {useCallback, useEffect, useState} from 'react';

import ErrorBoundary from './common/ErrorBoundary';
import styles from './LevelInspector.module.css';
import LevelPreview from './LevelPreview';
import LevelSidebar from './sidebar/LevelSidebar';
import type {GameObjectEntityType} from './types/GameObjectEntityType';
import type {LevelType} from './types/LevelType';
import ConsoleNoJest from './util/ConsoleNoJest';

type Props = $ReadOnly<{
	currentCoordinates: [number, number, number],
	level: LevelType,
	setSingleLevelData: (newLevelData: ?LevelType) => mixed,
}>;

export default function LevelInspector({
	currentCoordinates,
	level,
	setSingleLevelData,
}: Props): React$Node {
	useEffect(() => {
		ConsoleNoJest.log(level);
	}, [level]);

	const [addingObjectEntity, setAddingObjectEntity] =
		useState<?GameObjectEntityType>(null);

	const [mapMouseMoveCoordinates, setMapMouseMoveCoordinates] =
		useState<?[number, number]>(null);

	const [objectIndexHover, setObjectIndexHover] = useState<?number>(null);

	const [sidebarObjectsListItemsExpanded, setSidebarObjectsListItemsExpanded] =
		useState<Array<number>>([]);

	useEffect(() => {
		setSidebarObjectsListItemsExpanded([]);
	}, [currentCoordinates]);

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

	const onLevelDelete = useCallback(() => {
		setSingleLevelData(null);
	}, [setSingleLevelData]);

	const onLevelEditProperty = useCallback(
		(key: string, value: string | number) => {
			if (level[key] === value || (value === '' && level[key] == null)) {
				return;
			}

			setSingleLevelData({
				...level,
				[key]: value,
			});
		},
		[level, setSingleLevelData]
	);

	const onObjectClick = useCallback(
		(objectIndex: number) => {
			if (sidebarObjectsListItemsExpanded.includes(objectIndex)) {
				// todo if the item is already expanded, then it won't scrollIntoView
				return;
			}

			setSidebarObjectsListItemsExpanded(
				sidebarObjectsListItemsExpanded.concat(objectIndex)
			);
		},
		[sidebarObjectsListItemsExpanded]
	);

	const onObjectDelete = useCallback(
		(objectIndex: number) => {
			const levelObjects = level.objects;
			if (levelObjects == null) {
				return;
			}

			setSingleLevelData({
				...level,
				objects: levelObjects
					.slice(0, objectIndex)
					.concat(levelObjects.slice(objectIndex + 1)),
			});

			if (sidebarObjectsListItemsExpanded.includes(objectIndex)) {
				setSidebarObjectsListItemsExpanded(
					sidebarObjectsListItemsExpanded.filter(
						(index) => index !== objectIndex
					)
				);
			}
		},
		[level, setSingleLevelData, sidebarObjectsListItemsExpanded]
	);

	const onObjectEditProperty = useCallback(
		(objectIndex: number, key: string, value: string | number) => {
			const levelObjects = level.objects;
			if (levelObjects == null) {
				return;
			}

			setSingleLevelData({
				...level,
				objects: levelObjects
					.slice(0, objectIndex)
					.concat({
						...levelObjects[objectIndex],
						[key]: value,
					})
					.concat(levelObjects.slice(objectIndex + 1)),
			});
		},
		[level, setSingleLevelData]
	);

	return (
		<div className={styles.root}>
			<div className={styles.preview}>
				<ErrorBoundary>
					<LevelPreview
						addingObjectEntity={addingObjectEntity}
						level={level}
						mapMouseMoveCoordinates={mapMouseMoveCoordinates}
						objectIndexHover={objectIndexHover}
						onMapMouseClick={onMapMouseClick}
						onMapMouseLeave={onMapMouseLeave}
						onMapMouseMove={onMapMouseMove}
						onObjectClick={onObjectClick}
						onObjectHover={setObjectIndexHover}
					/>
				</ErrorBoundary>
			</div>

			<ErrorBoundary>
				<LevelSidebar
					level={level}
					mapMouseMoveCoordinates={mapMouseMoveCoordinates}
					objectIndexHover={objectIndexHover}
					objectsListItemsExpanded={sidebarObjectsListItemsExpanded}
					onAddingObjectEntity={setAddingObjectEntity}
					onLevelDelete={onLevelDelete}
					onLevelEditProperty={onLevelEditProperty}
					onObjectDelete={onObjectDelete}
					onObjectEditProperty={onObjectEditProperty}
					onObjectHover={setObjectIndexHover}
					setObjectsListItemsExpanded={setSidebarObjectsListItemsExpanded}
				/>
			</ErrorBoundary>
		</div>
	);
}

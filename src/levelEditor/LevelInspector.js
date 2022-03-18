// @flow strict

import {useCallback, useEffect, useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import ConsoleNoJest from '../util/ConsoleNoJest';

import styles from './LevelInspector.module.css';
import LevelPreview from './preview/LevelPreview';
import LevelSidebar from './sidebar/LevelSidebar';
import type {GameObjectEntityType} from './types/GameObjectEntityType';
import type {LevelInspectorUiView} from './types/LevelInspectorUiView';
import type {LevelType} from './types/LevelType';
import {useWorldDataNonNullable} from './WorldDataContext';

type Props = $ReadOnly<{
	currentCoordinates: [number, number, number],
	level: LevelType,
}>;

export default function LevelInspector({
	currentCoordinates,
	level,
}: Props): React$Node {
	const {dispatch} = useWorldDataNonNullable();

	useEffect(() => {
		ConsoleNoJest.log(level);
	}, [level]);

	const [activeUiViews, setActiveUiViews] = useState<
		Array<LevelInspectorUiView>
	>(['GEO', 'OBJECTS']);

	// Sidebar
	const [addingObjectEntity, setAddingObjectEntity] =
		useState<?GameObjectEntityType>(null);
	const [objectIndexHover, setObjectIndexHover] = useState<?number>(null);
	const [sidebarObjectsListItemsExpanded, setSidebarObjectsListItemsExpanded] =
		useState<Array<number>>([]);

	useEffect(() => {
		setSidebarObjectsListItemsExpanded([]);
	}, [currentCoordinates]);

	// Coordinates
	const [mapMouseMoveCoordinates, setMapMouseMoveCoordinates] =
		useState<?[number, number]>(null);

	// Events
	function onMapMouseClick(ev: SyntheticMouseEvent<>) {
		if (addingObjectEntity == null || mapMouseMoveCoordinates == null) {
			return;
		}

		dispatch({
			type: 'addObjectToLevel',
			coordinates: currentCoordinates,
			objectEntity: addingObjectEntity,
			x: mapMouseMoveCoordinates[0],
			y: mapMouseMoveCoordinates[1],
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
			dispatch({
				type: 'deleteObjectOnLevel',
				coordinates: currentCoordinates,
				objectIndex,
			});

			if (sidebarObjectsListItemsExpanded.includes(objectIndex)) {
				setSidebarObjectsListItemsExpanded(
					sidebarObjectsListItemsExpanded.filter(
						(index) => index !== objectIndex
					)
				);
			}
		},
		[currentCoordinates, dispatch, sidebarObjectsListItemsExpanded]
	);

	const onObjectEditProperty = useCallback(
		(objectIndex: number, key: string, value: string | number) => {
			const levelObjects = level.objects;
			if (levelObjects == null) {
				return;
			}

			dispatch({
				type: 'editObjectPropertyOnLevel',
				coordinates: currentCoordinates,
				objectIndex,
				key,
				value,
			});
		},
		[currentCoordinates, dispatch, level.objects]
	);

	const onActiveUiViewToggle = useCallback(
		(uiView: LevelInspectorUiView) => {
			if (activeUiViews.includes(uiView)) {
				setActiveUiViews(activeUiViews.filter((index) => index !== uiView));
			} else {
				setActiveUiViews(activeUiViews.concat(uiView));
			}
		},
		[activeUiViews]
	);

	return (
		<div className={styles.root}>
			<div className={styles.preview}>
				<ErrorBoundary>
					<LevelPreview
						activeUiViews={activeUiViews}
						addingObjectEntity={addingObjectEntity}
						currentCoordinates={currentCoordinates}
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
					activeUiViews={activeUiViews}
					level={level}
					mapMouseMoveCoordinates={mapMouseMoveCoordinates}
					objectIndexHover={objectIndexHover}
					objectsListItemsExpanded={sidebarObjectsListItemsExpanded}
					onActiveUiViewToggle={onActiveUiViewToggle}
					onAddingObjectEntity={setAddingObjectEntity}
					onObjectDelete={onObjectDelete}
					onObjectEditProperty={onObjectEditProperty}
					onObjectHover={setObjectIndexHover}
					setObjectsListItemsExpanded={setSidebarObjectsListItemsExpanded}
				/>
			</ErrorBoundary>
		</div>
	);
}

// @flow strict

import {useCallback, useEffect, useRef, useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import ConsoleNoJest from '../util/ConsoleNoJest';

import LevelDecoAdder from './LevelDecoAdder';
import styles from './LevelInspector.module.css';
import LevelPreview from './preview/LevelPreview';
import LevelSidebar from './sidebar/LevelSidebar';
import type {GameEntityType} from './types/GameEntityType';
import type {LevelInspectorUiView} from './types/LevelInspectorUiView';
import type {LevelType} from './types/LevelType';
import type {PlaceableType} from './types/PlaceableType';
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

	const previousLevelRef = useRef<?LevelType>(null);

	useEffect(() => {
		if (level !== previousLevelRef.current) {
			ConsoleNoJest.log(level);

			previousLevelRef.current = level;
		}
	}, [level]);

	const [activeUiViews, setActiveUiViews] = useState<
		Array<LevelInspectorUiView>
	>(['GEO', 'OBJECT']);

	// Sidebar
	const [addingEntityLabel, setAddingEntityLabel] =
		useState<?PlaceableType>(null);
	const [objectIndexHover, setObjectIndexHover] = useState<?number>(null);
	const [decoIndexHover, setDecoIndexHover] = useState<?number>(null);

	const [sidebarObjectsListItemsExpanded, setSidebarObjectsListItemsExpanded] =
		useState<Array<number>>([]);

	const [sidebarDecosListItemsExpanded, setSidebarDecosListItemsExpanded] =
		useState<Array<number>>([]);

	useEffect(() => {
		setSidebarObjectsListItemsExpanded([]);
		setSidebarDecosListItemsExpanded([]);
	}, [currentCoordinates]);

	// Coordinates
	const [mapMouseMoveCoordinates, setMapMouseMoveCoordinates] =
		useState<?[number, number]>(null);

	// Events
	function onMapMouseClick(ev: SyntheticMouseEvent<>) {
		if (
			addingEntityLabel == null ||
			mapMouseMoveCoordinates == null ||
			!activeUiViews.includes(addingEntityLabel.type)
		) {
			return;
		}
		dispatch({
			type: 'addEntityToLevel',
			coordinates: currentCoordinates,
			entity: addingEntityLabel,
			x: mapMouseMoveCoordinates[0],
			y: mapMouseMoveCoordinates[1],
		});

		if (!ev.shiftKey) {
			setAddingEntityLabel(null);
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

	const onEntityClick = useCallback(
		(index: number, type: GameEntityType) => {
			if (type === 'OBJECT') {
				if (sidebarObjectsListItemsExpanded.includes(index)) {
					// todo if the item is already expanded, then it won't scrollIntoView
					return;
				}

				setSidebarObjectsListItemsExpanded(
					sidebarObjectsListItemsExpanded.concat(index)
				);
			} else {
				if (sidebarDecosListItemsExpanded.includes(index)) {
					return;
				}

				setSidebarDecosListItemsExpanded(
					sidebarDecosListItemsExpanded.concat(index)
				);
			}
		},
		[sidebarObjectsListItemsExpanded, sidebarDecosListItemsExpanded]
	);

	const onEntityDelete = useCallback(
		(deletedObjectIndex: number, type: GameEntityType) => {
			dispatch({
				type: 'deleteEntityOnLevel',
				coordinates: currentCoordinates,
				index: deletedObjectIndex,
				entityType: type,
			});
			if (type === 'OBJECT') {
				setSidebarObjectsListItemsExpanded(
					(sidebarObjectsListItemsExpanded) => {
						return sidebarObjectsListItemsExpanded.reduce(
							(previous, currentIndex) => {
								// Skip deleted object index
								if (currentIndex === deletedObjectIndex) {
									return previous;
								}

								// Anything after the deleted object index needs to decrement
								if (currentIndex > deletedObjectIndex) {
									previous.push(currentIndex - 1);
								} else {
									previous.push(currentIndex);
								}
								return previous;
							},
							[]
						);
					}
				);
			} else {
				setSidebarDecosListItemsExpanded((sidebarDecosListItemsExpanded) => {
					return sidebarDecosListItemsExpanded.reduce(
						(previous, currentIndex) => {
							// Skip deleted object index
							if (currentIndex === deletedObjectIndex) {
								return previous;
							}

							// Anything after the deleted object index needs to decrement
							if (currentIndex > deletedObjectIndex) {
								previous.push(currentIndex - 1);
							} else {
								previous.push(currentIndex);
							}
							return previous;
						},
						[]
					);
				});
			}
		},
		[currentCoordinates, dispatch]
	);

	const onEntityEditProperties = useCallback(
		(
			index: number,
			properties: {
				[key: string]: string | number | null,
			},
			type: GameEntityType
		) => {
			dispatch({
				type: 'editEntityPropertiesOnLevel',
				coordinates: currentCoordinates,
				index,
				properties,
				entityType: type,
			});
		},
		[currentCoordinates, dispatch]
	);

	const onActiveUiViewToggle = useCallback((uiView: LevelInspectorUiView) => {
		setActiveUiViews((activeUiViews) => {
			if (activeUiViews.includes(uiView)) {
				return activeUiViews.filter((index) => index !== uiView);
			}

			return activeUiViews.concat(uiView);
		});
	}, []);

	return (
		<div className={styles.root}>
			<div className={styles.preview}>
				<ErrorBoundary>
					<LevelPreview
						activeUiViews={activeUiViews}
						addingEntityLabel={addingEntityLabel}
						currentCoordinates={currentCoordinates}
						level={level}
						mapMouseMoveCoordinates={mapMouseMoveCoordinates}
						objectIndexHover={objectIndexHover}
						onMapMouseClick={onMapMouseClick}
						onMapMouseLeave={onMapMouseLeave}
						onMapMouseMove={onMapMouseMove}
						onEntityClick={onEntityClick}
						onObjectHover={setObjectIndexHover}
						decoIndexHover={decoIndexHover}
						onDecoHover={setDecoIndexHover}
					/>
				</ErrorBoundary>
			</div>

			{activeUiViews.includes('DECO') ? (
				<div className={styles.decos}>
					<ErrorBoundary>
						<LevelDecoAdder onAddingEntityLabel={setAddingEntityLabel} />
					</ErrorBoundary>
				</div>
			) : null}

			<ErrorBoundary>
				<LevelSidebar
					activeUiViews={activeUiViews}
					level={level}
					mapMouseMoveCoordinates={mapMouseMoveCoordinates}
					objectIndexHover={objectIndexHover}
					objectsListItemsExpanded={sidebarObjectsListItemsExpanded}
					onActiveUiViewToggle={onActiveUiViewToggle}
					onAddingEntityLabel={setAddingEntityLabel}
					onEntityDelete={onEntityDelete}
					onEntityEditProperties={onEntityEditProperties}
					onObjectHover={setObjectIndexHover}
					setObjectsListItemsExpanded={setSidebarObjectsListItemsExpanded}
					decoIndexHover={decoIndexHover}
					onDecoHover={setDecoIndexHover}
					decosListItemsExpanded={sidebarDecosListItemsExpanded}
					setDecosListItemsExpanded={setSidebarDecosListItemsExpanded}
				/>
			</ErrorBoundary>
		</div>
	);
}

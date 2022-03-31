// @flow strict

import {encode} from 'base64-arraybuffer';
import {deflate} from 'pako';
import {useCallback, useEffect, useRef, useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import ConsoleNoJest from '../util/ConsoleNoJest';

import styles from './LevelInspector.module.css';
import LevelPreview from './preview/LevelPreview';
import LevelSidebar from './sidebar/LevelSidebar';
import Toolbar from './toolbar/Toolbar';
import type {EditorToolType} from './types/EditorToolType';
import type {GameObjectEntityType} from './types/GameObjectEntityType';
import type {LevelInspectorUiView} from './types/LevelInspectorUiView';
import type {LevelType} from './types/LevelType';
import decodeGeoString from './util/decodeGeoString';
import paintBresenham from './util/paintGeo';
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

	const prevCoordinates = useRef<?[number, number]>(null);

	//map
	const [geoBitmap, setGeoBitmap] = useState<Uint8Array>([]);

	useEffect(() => {
		setGeoBitmap(decodeGeoString(level.geo));
	}, [level]); // Call this only when coords change?

	//brush (combine into custom type?)
	const [brushColor, setBrushColor] = useState<number>(0);
	const [brushSize, setBrushSize] = useState<number>(1);

	const [mode, setMode] = useState<EditorToolType>('Select'); // Use custom type

	function paint(ev: SyntheticMouseEvent<HTMLDivElement>) {
		if (mode === 'Paint' && ev.buttons === 1) {
			let temp = paintBresenham(
				brushColor,
				geoBitmap,
				mapMouseMoveCoordinates,
				prevCoordinates.current,
				brushSize
			);
			if (temp) {
				setGeoBitmap(temp.slice());
			}
			prevCoordinates.current = mapMouseMoveCoordinates;
		}
	}

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

	function onMapMouseDown(ev: SyntheticMouseEvent<HTMLDivElement>) {
		if (mapMouseMoveCoordinates == null) {
			return;
		}
		paint(ev);
	}
	function onMapMouseUp(ev: SyntheticMouseEvent<HTMLDivElement>) {
		prevCoordinates.current = null;
		dispatch({
			type: 'setLevelProperty',
			coordinates: currentCoordinates,
			key: 'geo',
			value: encode(deflate(geoBitmap)),
		});
	}

	function onMapMouseMove(ev: SyntheticMouseEvent<HTMLDivElement>) {
		const rect = ev.currentTarget.getBoundingClientRect();

		setMapMouseMoveCoordinates([
			parseInt(ev.clientX - rect.left, 10),
			parseInt(ev.clientY - rect.top, 10),
		]);
		paint(ev);
	}

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
		(deletedObjectIndex: number) => {
			dispatch({
				type: 'deleteObjectOnLevel',
				coordinates: currentCoordinates,
				objectIndex: deletedObjectIndex,
			});

			setSidebarObjectsListItemsExpanded(
				sidebarObjectsListItemsExpanded.reduce((previous, currentIndex) => {
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
				}, [])
			);
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
			<div>
				<ErrorBoundary>
					<Toolbar
						color={brushColor}
						onColorChange={setBrushColor}
						brushSize={brushSize}
						onBrushSizeChange={setBrushSize}
						mode={mode}
						onModeSelect={setMode}
					/>
				</ErrorBoundary>
			</div>
			<div className={styles.preview}>
				<ErrorBoundary>
					<LevelPreview
						activeUiViews={activeUiViews}
						addingObjectEntity={addingObjectEntity}
						currentCoordinates={currentCoordinates}
						level={level}
						geoBitmap={geoBitmap}
						mode={mode}
						mapMouseMoveCoordinates={mapMouseMoveCoordinates}
						objectIndexHover={objectIndexHover}
						onMapMouseClick={onMapMouseClick}
						onMapMouseUp={onMapMouseUp}
						onMapMouseDown={onMapMouseDown}
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
					geoBitmap={geoBitmap}
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

// @flow strict

import {encode} from 'base64-arraybuffer';
import {deflate} from 'pako';
import {useCallback, useEffect, useRef, useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import ConsoleNoJest from '../util/ConsoleNoJest';

import LevelDecoAdder from './LevelDecoAdder';
import styles from './LevelInspector.module.css';
import LevelPreview from './preview/LevelPreview';
import LevelSidebar from './sidebar/LevelSidebar';
import LevelToolbar from './toolbar/LevelToolbar';
import type {EditorToolType} from './types/EditorToolType';
import type {GameEntityType} from './types/GameEntityType';
import type {LevelInspectorUiView} from './types/LevelInspectorUiView';
import type {LevelType} from './types/LevelType';
import type {PlaceableType} from './types/PlaceableType';
import decodeGeoString from './util/decodeGeoString';
import {paintBresenham, floodFill, pickColor} from './util/paintGeo';
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
	const [isPainting, setIsPainting] = useState(false);

	useEffect(() => {
		if (level !== previousLevelRef.current) {
			ConsoleNoJest.log(level);

			previousLevelRef.current = level;
		}
	}, [level]);

	const [activeUiViews, setActiveUiViews] = useState<
		Array<LevelInspectorUiView>
	>(['GEO', 'OBJECT']);

	// Toolbar
	const [geoPaintBuffer, setGeoPaintBuffer] = useState<Array<number>>([]);
	const [paintBufferUpdate, setPaintBufferUpdate] = useState(0);
	const prevCoordinates = useRef<?[number, number]>(null);

	const [editorToolType, setEditorToolType] =
		useState<EditorToolType>('Select');
	const [paintColor, setPaintColor] = useState<number>(0);
	const [brushSize, setBrushSize] = useState<number>(1);

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

	function onMapMouseUp(ev: SyntheticMouseEvent<HTMLDivElement>) {
		if (editorToolType === 'Brush') {
			if (isPainting) {
				setIsPainting(false);
				prevCoordinates.current = null;

				const currGeo = decodeGeoString(level.geo);
				geoPaintBuffer.forEach((pixel, index) => {
					currGeo[index] = pixel;
				});

				dispatch({
					type: 'setLevelProperty',
					coordinates: currentCoordinates,
					key: 'geo',
					// $FlowFixMe[incompatible-call]
					value: encode(deflate(currGeo)),
				});

				setGeoPaintBuffer([]);
				setPaintBufferUpdate(paintBufferUpdate + 1);
			}
		}
	}

	const paint = useCallback(
		(mouseCoords: [number, number]) => {
			const geoCopy = paintBresenham(
				paintColor,
				geoPaintBuffer,
				mouseCoords,
				prevCoordinates.current,
				brushSize
			);

			if (geoCopy) {
				setGeoPaintBuffer(geoCopy);
				setPaintBufferUpdate(paintBufferUpdate + 1);
			}

			prevCoordinates.current = mouseCoords;
		},
		[geoPaintBuffer, paintBufferUpdate, paintColor, brushSize]
	);

	const doFloodFill = useCallback(
		(mouseCoords: [number, number]) => {
			const newGeo = floodFill(
				paintColor,
				decodeGeoString(level.geo),
				mouseCoords
			);
			dispatch({
				type: 'setLevelProperty',
				coordinates: currentCoordinates,
				key: 'geo',
				// $FlowFixMe[incompatible-call]
				value: encode(deflate(newGeo)),
			});
			setPaintBufferUpdate(paintBufferUpdate + 1);
		},
		[currentCoordinates, dispatch, level.geo, paintBufferUpdate, paintColor]
	);

	const doEyedropper = useCallback(
		(mouseCoords: [number, number]) => {
			const currGeo = decodeGeoString(level.geo);
			const pickedColor = pickColor(currGeo, mouseCoords);
			setPaintColor(pickedColor);
		},
		[level.geo]
	);

	const onMapMouseDown = useCallback(
		(ev: SyntheticMouseEvent<HTMLDivElement>) => {
			if (mapMouseMoveCoordinates == null) {
				return;
			}

			if (editorToolType === 'Brush') {
				setIsPainting(true);
				paint(mapMouseMoveCoordinates);
			} else if (editorToolType === 'Fill') {
				doFloodFill(mapMouseMoveCoordinates);
			} else if (editorToolType === 'Eyedropper') {
				doEyedropper(mapMouseMoveCoordinates);
			}
		},
		[mapMouseMoveCoordinates, editorToolType, paint, doFloodFill, doEyedropper]
	);

	const onMapMouseLeave = useCallback(
		(ev: SyntheticMouseEvent<HTMLDivElement>) => {
			// Without this code, if the user holds down the button while quickly moving the
			// cursor to be outside the geo preview, `onMapMouseMove` will not fire to paint
			// the pixels between `prevCoordinates` and the cursor. We need `onMapMouseLeave` to cover this.
			if (editorToolType === 'Brush' && isPainting) {
				const rect = ev.currentTarget.getBoundingClientRect();

				const mouseMapCoords = [
					parseInt(ev.clientX - rect.left, 10),
					parseInt(ev.clientY - rect.top, 10),
				];

				paint(mouseMapCoords);
			}

			setMapMouseMoveCoordinates(null);
			prevCoordinates.current = null;
		},
		[setMapMouseMoveCoordinates, isPainting, paint, editorToolType]
	);

	const onMapMouseMove = useCallback(
		(ev: SyntheticMouseEvent<HTMLDivElement>) => {
			const rect = ev.currentTarget.getBoundingClientRect();

			const mouseMapCoords = [
				parseInt(ev.clientX - rect.left, 10),
				parseInt(ev.clientY - rect.top, 10),
			];

			setMapMouseMoveCoordinates(mouseMapCoords);

			if (isPainting) {
				paint(mouseMapCoords);
			}
		},
		[setMapMouseMoveCoordinates, isPainting, paint]
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
				if (uiView === 'GEO') {
					setEditorToolType('Select');
				}
				return activeUiViews.filter((index) => index !== uiView);
			}

			return activeUiViews.concat(uiView);
		});
	}, []);

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			className={styles.root}
			onMouseDown={onMapMouseDown}
			onMouseUp={onMapMouseUp}
		>
			<div className={styles.preview}>
				<ErrorBoundary>
					<LevelPreview
						activeUiViews={activeUiViews}
						addingEntityLabel={addingEntityLabel}
						currentCoordinates={currentCoordinates}
						decoIndexHover={decoIndexHover}
						editorToolType={editorToolType}
						geoPaintBuffer={geoPaintBuffer}
						level={level}
						mapMouseMoveCoordinates={mapMouseMoveCoordinates}
						objectIndexHover={objectIndexHover}
						onDecoHover={setDecoIndexHover}
						onEntityClick={onEntityClick}
						onMapMouseClick={onMapMouseClick}
						onMapMouseLeave={onMapMouseLeave}
						onMapMouseMove={onMapMouseMove}
						onObjectHover={setObjectIndexHover}
						paintBufferUpdate={paintBufferUpdate}
					/>
				</ErrorBoundary>
			</div>

			{activeUiViews.includes('GEO') ? (
				<div className={styles.toolbar}>
					<ErrorBoundary>
						<LevelToolbar
							brushSize={brushSize}
							currentPaintColor={paintColor}
							editorToolType={editorToolType}
							onBrushSizeUpdate={setBrushSize}
							onEditorToolTypeUpdate={setEditorToolType}
							onSelectPaintColor={setPaintColor}
						/>
					</ErrorBoundary>
				</div>
			) : null}

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
					decoIndexHover={decoIndexHover}
					decosListItemsExpanded={sidebarDecosListItemsExpanded}
					level={level}
					mapMouseMoveCoordinates={mapMouseMoveCoordinates}
					objectIndexHover={objectIndexHover}
					objectsListItemsExpanded={sidebarObjectsListItemsExpanded}
					onActiveUiViewToggle={onActiveUiViewToggle}
					onAddingEntityLabel={setAddingEntityLabel}
					onDecoHover={setDecoIndexHover}
					onEntityDelete={onEntityDelete}
					onEntityEditProperties={onEntityEditProperties}
					onObjectHover={setObjectIndexHover}
					setDecosListItemsExpanded={setSidebarDecosListItemsExpanded}
					setObjectsListItemsExpanded={setSidebarObjectsListItemsExpanded}
				/>
			</ErrorBoundary>
		</div>
	);
}

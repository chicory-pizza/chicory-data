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
import useListItemsExpandedReducer from './sidebar/objectsList/useListItemsExpandedReducer';
import LevelToolbar from './toolbar/LevelToolbar';
import type {EditorToolType} from './types/EditorToolType';
import type {GameEntityType} from './types/GameEntityType';
import type {LevelInspectorUiView} from './types/LevelInspectorUiView';
import type {LevelType} from './types/LevelType';
import type {PlaceableType} from './types/PlaceableType';
import type {SidebarPanel} from './types/SidebarPanel';
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
	const {dispatch: dispatchWorldData} = useWorldDataNonNullable();

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
		useState<EditorToolType>('SELECT');
	const [paintColor, setPaintColor] = useState<number>(0);
	const [brushSize, setBrushSize] = useState<number>(1);

	// Sidebar
	const [expandedSidebarPanels, setExpandedSidebarPanels] = useState<
		Set<SidebarPanel>
	>(new Set(['LEVEL_PROPERTIES', 'OBJECTS']));
	const [addingEntityLabel, setAddingEntityLabel] =
		useState<?PlaceableType>(null);
	const [objectIndexHover, setObjectIndexHover] = useState<?number>(null);
	const [decoIndexHover, setDecoIndexHover] = useState<?number>(null);

	const [
		sidebarObjectsListItemsExpanded,
		dispatchSidebarObjectsListItemsExpanded,
	] = useListItemsExpandedReducer();

	const [sidebarDecosListItemsExpanded, dispatchSidebarDecosListItemsExpanded] =
		useListItemsExpandedReducer();

	useEffect(() => {
		dispatchSidebarObjectsListItemsExpanded({type: 'collapseAll'});
		dispatchSidebarDecosListItemsExpanded({type: 'collapseAll'});
	}, [
		currentCoordinates,
		dispatchSidebarDecosListItemsExpanded,
		dispatchSidebarObjectsListItemsExpanded,
	]);

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

		dispatchWorldData({
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
		if (editorToolType === 'BRUSH') {
			if (isPainting) {
				setIsPainting(false);
				prevCoordinates.current = null;

				const currGeo = decodeGeoString(level.geo);
				geoPaintBuffer.forEach((pixel, index) => {
					currGeo[index] = pixel;
				});

				dispatchWorldData({
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

			dispatchWorldData({
				type: 'setLevelProperty',
				coordinates: currentCoordinates,
				key: 'geo',
				// $FlowFixMe[incompatible-call]
				value: encode(deflate(newGeo)),
			});

			setPaintBufferUpdate(paintBufferUpdate + 1);
		},
		[
			currentCoordinates,
			dispatchWorldData,
			level.geo,
			paintBufferUpdate,
			paintColor,
		]
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
			if (ev.buttons === 1 && !addingEntityLabel) {
				if (editorToolType === 'BRUSH') {
					setIsPainting(true);
					paint(mapMouseMoveCoordinates);
				} else if (editorToolType === 'FILL') {
					doFloodFill(mapMouseMoveCoordinates);
				} else if (editorToolType === 'EYEDROPPER') {
					doEyedropper(mapMouseMoveCoordinates);
				}
			}
		},
		[
			mapMouseMoveCoordinates,
			addingEntityLabel,
			editorToolType,
			paint,
			doFloodFill,
			doEyedropper,
		]
	);

	const onMapMouseLeave = useCallback(
		(ev: SyntheticMouseEvent<HTMLDivElement>) => {
			// Without this code, if the user holds down the button while quickly moving the
			// cursor to be outside the geo preview, `onMapMouseMove` will not fire to paint
			// the pixels between `prevCoordinates` and the cursor. We need `onMapMouseLeave` to cover this.
			if (editorToolType === 'BRUSH' && isPainting) {
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
		[editorToolType, isPainting, paint]
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
		[isPainting, paint]
	);

	const onEntityClick = useCallback(
		(index: number, type: GameEntityType) => {
			if (type === 'OBJECT') {
				dispatchSidebarObjectsListItemsExpanded({
					type: 'expand',
					indexes: [index],
				});

				setExpandedSidebarPanels((expandedSidebarPanels) => {
					if (!expandedSidebarPanels.has('OBJECTS')) {
						return new Set(expandedSidebarPanels).add('OBJECTS');
					}

					return expandedSidebarPanels;
				});
			} else {
				dispatchSidebarDecosListItemsExpanded({
					type: 'expand',
					indexes: [index],
				});

				setExpandedSidebarPanels((expandedSidebarPanels) => {
					if (!expandedSidebarPanels.has('DECOS')) {
						return new Set(expandedSidebarPanels).add('DECOS');
					}

					return expandedSidebarPanels;
				});
			}
		},
		[
			dispatchSidebarObjectsListItemsExpanded,
			dispatchSidebarDecosListItemsExpanded,
		]
	);

	const onEntityDelete = useCallback(
		(deletedObjectIndex: number, type: GameEntityType) => {
			dispatchWorldData({
				type: 'deleteEntityOnLevel',
				coordinates: currentCoordinates,
				index: deletedObjectIndex,
				entityType: type,
			});

			if (type === 'OBJECT') {
				dispatchSidebarObjectsListItemsExpanded({
					type: 'remove',
					index: deletedObjectIndex,
				});
			} else {
				dispatchSidebarDecosListItemsExpanded({
					type: 'remove',
					index: deletedObjectIndex,
				});
			}
		},
		[
			currentCoordinates,
			dispatchWorldData,
			dispatchSidebarDecosListItemsExpanded,
			dispatchSidebarObjectsListItemsExpanded,
		]
	);

	const onEntityEditProperties = useCallback(
		(
			index: number,
			properties: {
				[key: string]: string | number | null,
			},
			type: GameEntityType
		) => {
			dispatchWorldData({
				type: 'editEntityPropertiesOnLevel',
				coordinates: currentCoordinates,
				index,
				properties,
				entityType: type,
			});
		},
		[currentCoordinates, dispatchWorldData]
	);

	const onActiveUiViewToggle = useCallback((uiView: LevelInspectorUiView) => {
		setActiveUiViews((activeUiViews) => {
			if (activeUiViews.includes(uiView)) {
				if (uiView === 'GEO') {
					setEditorToolType('SELECT');
				}
				return activeUiViews.filter((index) => index !== uiView);
			}

			return activeUiViews.concat(uiView);
		});
	}, []);

	const onSidebarPanelExpandToggle = useCallback(
		(ev: SyntheticMouseEvent<HTMLElement>, sidebarPanel: SidebarPanel) => {
			ev.preventDefault();

			setExpandedSidebarPanels((expandedSidebarPanels) => {
				if (expandedSidebarPanels.has(sidebarPanel)) {
					const newSet = new Set(expandedSidebarPanels);
					newSet.delete(sidebarPanel);
					return newSet;
				}

				return new Set(expandedSidebarPanels).add(sidebarPanel);
			});
		},
		[]
	);

	return (
		<div className={styles.root}>
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
						onEntityTransformUpdate={onEntityEditProperties}
						onMapMouseClick={onMapMouseClick}
						onMapMouseDown={onMapMouseDown}
						onMapMouseLeave={onMapMouseLeave}
						onMapMouseMove={onMapMouseMove}
						onMapMouseUp={onMapMouseUp}
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
					dispatchDecosListItemsExpanded={dispatchSidebarDecosListItemsExpanded}
					dispatchObjectsListItemsExpanded={
						dispatchSidebarObjectsListItemsExpanded
					}
					expandedSidebarPanels={expandedSidebarPanels}
					level={level}
					levelPreviewGeoPaintBuffer={geoPaintBuffer}
					levelPreviewPaintBufferUpdate={paintBufferUpdate}
					mapMouseMoveCoordinates={mapMouseMoveCoordinates}
					objectIndexHover={objectIndexHover}
					objectsListItemsExpanded={sidebarObjectsListItemsExpanded}
					onActiveUiViewToggle={onActiveUiViewToggle}
					onAddingEntityLabel={setAddingEntityLabel}
					onDecoHover={setDecoIndexHover}
					onEntityDelete={onEntityDelete}
					onEntityEditProperties={onEntityEditProperties}
					onObjectHover={setObjectIndexHover}
					onSidebarPanelExpandToggle={onSidebarPanelExpandToggle}
				/>
			</ErrorBoundary>
		</div>
	);
}

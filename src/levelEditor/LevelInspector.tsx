import {encode} from 'base64-arraybuffer';
import {deflate} from 'pako';
import {useCallback, useEffect, useRef, useState} from 'react';
import {usePrevious} from 'react-use';

import ErrorBoundary from '../common/ErrorBoundary';
import ConsoleNoJest from '../util/ConsoleNoJest';

import LevelDecoAdder from './LevelDecoAdder';
import {useLevelEditorContext} from './LevelEditorContext';
import styles from './LevelInspector.module.css';
import LevelPreview from './preview/LevelPreview';
import LevelSidebar from './sidebar/LevelSidebar';
import useListItemsExpandedReducer from './sidebar/objectsList/useListItemsExpandedReducer';
import LevelToolbar from './toolbar/LevelToolbar';
import type {EditorToolType} from './types/EditorToolType';
import type {GameEntityType} from './types/GameEntityType';
import type {LevelType} from './types/LevelType';
import type {PlaceableType} from './types/PlaceableType';
import type {SidebarPanel} from './types/SidebarPanel';
import decodeGeoString from './util/decodeGeoString';
import {paintBresenham, floodFill, pickColor} from './util/paintGeo';
import {useWorldDataNonNullable} from './WorldDataContext';

type Props = Readonly<{
	currentCoordinates: [number, number, number];
	level: LevelType;
}>;

export default function LevelInspector({currentCoordinates, level}: Props) {
	const {dispatch: dispatchWorldData} = useWorldDataNonNullable();

	const previousLevelRef = useRef<LevelType>(null);
	const [isPainting, setIsPainting] = useState(false);

	useEffect(() => {
		if (level !== previousLevelRef.current) {
			ConsoleNoJest.log(level);

			previousLevelRef.current = level;
		}
	}, [level]);

	const {uiViews: activeUiViews} = useLevelEditorContext();

	// Toolbar
	const [geoPaintBuffer, setGeoPaintBuffer] = useState<Array<number>>([]);
	const [paintBufferUpdate, setPaintBufferUpdate] = useState(0);
	const prevCoordinates = useRef<[number, number]>(null);

	const [editorToolType, setEditorToolTypeRaw] =
		useState<EditorToolType>('SELECT');
	const [paintColor, setPaintColor] = useState<number>(0);
	const [brushSize, setBrushSize] = useState<number>(1);

	// Sidebar
	const [expandedSidebarPanels, setExpandedSidebarPanels] = useState<
		Set<SidebarPanel>
	>(() => new Set(['LEVEL_PROPERTIES', 'OBJECTS']));
	const [addingEntityLabel, setAddingEntityLabel] =
		useState<PlaceableType | null>(null);
	const [objectIndexHover, setObjectIndexHover] = useState<number | null>(null);
	const [decoIndexHover, setDecoIndexHover] = useState<number | null>(null);

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
	const [mapMouseMoveCoordinates, setMapMouseMoveCoordinates] = useState<
		[number, number] | null
	>(null);

	// Events
	function onMapMouseClick(ev: React.MouseEvent) {
		if (
			addingEntityLabel == null ||
			mapMouseMoveCoordinates == null ||
			!activeUiViews.has(addingEntityLabel.type)
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

	const stopBrush = useCallback(() => {
		setIsPainting(false);
		prevCoordinates.current = null;
		window.removeEventListener('mouseup', stopBrush);

		const currGeo = decodeGeoString(level.geo);
		geoPaintBuffer.forEach((pixel, index) => {
			currGeo[index] = pixel;
		});

		dispatchWorldData({
			type: 'setLevelProperty',
			coordinates: currentCoordinates,
			key: 'geo',
			value: encode(deflate(currGeo)),
		});

		setGeoPaintBuffer([]);
		setPaintBufferUpdate((paintBufferUpdate) => paintBufferUpdate + 1);
	}, [currentCoordinates, dispatchWorldData, geoPaintBuffer, level.geo]);

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
				setPaintBufferUpdate((paintBufferUpdate) => paintBufferUpdate + 1);
			}

			prevCoordinates.current = mouseCoords;
		},
		[geoPaintBuffer, paintColor, brushSize]
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
				value: encode(deflate(newGeo)),
			});

			setPaintBufferUpdate((paintBufferUpdate) => paintBufferUpdate + 1);
		},
		[currentCoordinates, dispatchWorldData, level.geo, paintColor]
	);

	const doEyedropper = useCallback(
		(mouseCoords: [number, number]) => {
			const currGeo = decodeGeoString(level.geo);
			const pickedColor = pickColor(currGeo, mouseCoords);
			setPaintColor(pickedColor);
		},
		[level.geo]
	);

	const setEditorToolType = useCallback(
		(newEditorToolType: EditorToolType) => {
			if (editorToolType === newEditorToolType) {
				return;
			}

			// Stop painting if we're switching away from brush tool
			if (newEditorToolType !== 'BRUSH' && isPainting) {
				stopBrush();
			}

			setEditorToolTypeRaw(newEditorToolType);
		},
		[editorToolType, isPainting, stopBrush]
	);

	// Reset editor state when changing UI views
	const previousActiveUiViews = usePrevious(activeUiViews);
	if (
		previousActiveUiViews != null &&
		previousActiveUiViews !== activeUiViews
	) {
		if (
			previousActiveUiViews.has('OBJECT') &&
			!activeUiViews.has('OBJECT') &&
			addingEntityLabel?.type === 'OBJECT'
		) {
			setAddingEntityLabel(null);
		} else if (
			previousActiveUiViews.has('DECO') &&
			!activeUiViews.has('DECO') &&
			addingEntityLabel?.type === 'DECO'
		) {
			setAddingEntityLabel(null);
		} else if (previousActiveUiViews.has('GEO') && !activeUiViews.has('GEO')) {
			setEditorToolType('SELECT');
		}
	}

	const onMapMouseDown = useCallback(
		(ev: React.MouseEvent<HTMLDivElement>) => {
			if (mapMouseMoveCoordinates == null) {
				return;
			}

			if (ev.buttons === 1 && !addingEntityLabel) {
				if (editorToolType === 'BRUSH') {
					setIsPainting(true);
					paint(mapMouseMoveCoordinates);

					window.addEventListener('mouseup', stopBrush);

					ev.preventDefault();
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
			stopBrush,
			doFloodFill,
			doEyedropper,
		]
	);

	const onMapMouseLeave = useCallback(
		(ev: React.MouseEvent<HTMLDivElement>) => {
			// Without this code, if the user holds down the button while quickly moving the
			// cursor to be outside the geo preview, `onMapMouseMove` will not fire to paint
			// the pixels between `prevCoordinates` and the cursor. We need `onMapMouseLeave` to cover this.
			if (editorToolType === 'BRUSH' && isPainting) {
				const rect = ev.currentTarget.getBoundingClientRect();

				paint([
					Math.round(ev.clientX - rect.left),
					Math.round(ev.clientY - rect.top),
				]);
			}

			setMapMouseMoveCoordinates(null);
			prevCoordinates.current = null;
		},
		[editorToolType, isPainting, paint]
	);

	const onMapMouseMove = useCallback(
		(ev: React.MouseEvent<HTMLDivElement>) => {
			const rect = ev.currentTarget.getBoundingClientRect();

			const mouseMapCoords: [number, number] = [
				Math.round(ev.clientX - rect.left),
				Math.round(ev.clientY - rect.top),
			];

			setMapMouseMoveCoordinates(mouseMapCoords);

			if (editorToolType === 'BRUSH' && isPainting) {
				paint(mouseMapCoords);
			}
		},
		[editorToolType, isPainting, paint]
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
				[key: string]: string | number | null;
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

	const onSidebarPanelExpandToggle = useCallback(
		(ev: React.MouseEvent<HTMLElement>, sidebarPanel: SidebarPanel) => {
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
						onObjectHover={setObjectIndexHover}
						paintBufferUpdate={paintBufferUpdate}
					/>
				</ErrorBoundary>
			</div>

			{activeUiViews.has('GEO') ? (
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

			{activeUiViews.has('DECO') ? (
				<div className={styles.decos}>
					<ErrorBoundary>
						<LevelDecoAdder onAddingEntityLabel={setAddingEntityLabel} />
					</ErrorBoundary>
				</div>
			) : null}

			<ErrorBoundary>
				<LevelSidebar
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

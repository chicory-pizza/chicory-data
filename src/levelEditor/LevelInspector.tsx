import {encode} from 'base64-arraybuffer';
import {deflate} from 'pako';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {usePrevious} from 'react-use';

import ErrorBoundary from '../common/ErrorBoundary';
import shallowCompareArray from '../util/shallowCompareArray';

import LevelDecoAdder from './LevelDecoAdder';
import {useLevelEditorContext} from './LevelEditorContext';
import styles from './LevelInspector.module.css';
import LevelPreview from './preview/LevelPreview';
import LevelSidebar from './sidebar/LevelSidebar';
import useListItemsExpandedReducer from './sidebar/objectsList/useListItemsExpandedReducer';
import LevelToolbar from './toolbar/LevelToolbar';
import type {EditorEntityTransform} from './types/EditorEntityTransform';
import type {EditorToolType} from './types/EditorToolType';
import type {GameEntityType} from './types/GameEntityType';
import type {LevelType} from './types/LevelType';
import type {PlaceableType} from './types/PlaceableType';
import type {SidebarPanel} from './types/SidebarPanel';
import decodeGeoString from './util/decodeGeoString';
import {paintBresenham, floodFill, pickColor} from './util/paintGeo';
import {useWorldDataNonNullable} from './WorldDataContext';

function getLevelDraft(
	level: LevelType,
	currentEntityTransforming: EditorEntityTransform | null
): LevelType {
	if (currentEntityTransforming == null) {
		return level;
	}

	const levelObjects = level.objects ?? [];
	const levelDecos = level.decos ?? [];

	return {
		...level,
		objects:
			currentEntityTransforming.type === 'OBJECT'
				? levelObjects
						.slice(0, currentEntityTransforming.index)
						.concat({
							...levelObjects[currentEntityTransforming.index],
							x: currentEntityTransforming.x,
							y: currentEntityTransforming.y,
						})
						.concat(levelObjects.slice(currentEntityTransforming.index + 1))
				: level.objects,
		decos:
			currentEntityTransforming.type === 'DECO'
				? levelDecos
						.slice(0, currentEntityTransforming.index)
						.concat({
							...levelDecos[currentEntityTransforming.index],
							x: currentEntityTransforming.x,
							y: currentEntityTransforming.y,
						})
						.concat(levelDecos.slice(currentEntityTransforming.index + 1))
				: level.decos,
	};
}

type Props = Readonly<{
	currentCoordinates: [number, number, number];
	level: LevelType;
}>;

export default function LevelInspector({currentCoordinates, level}: Props) {
	const {dispatch: dispatchWorldData} = useWorldDataNonNullable();
	const {uiViews: activeUiViews} = useLevelEditorContext();

	// Toolbar
	const geoPaintBuffer = useRef<ReadonlyArray<number>>([]);
	const prevMouseCoordinates = useRef<[number, number]>(null);

	const [editorToolType, setEditorToolTypeRaw] =
		useState<EditorToolType>('SELECT');
	const [paintColor, setPaintColor] = useState<number>(0);
	const [brushSize, setBrushSizeRaw] = useState<number>(1);
	const [isMouseDown, setIsMouseDown] = useState(false);

	// Entities
	const [currentEntityTransforming, setCurrentEntityTransforming] =
		useState<EditorEntityTransform | null>(null);

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

	const stopBrushAndSaveDraft = useCallback(() => {
		setIsMouseDown(false);
		prevMouseCoordinates.current = null;

		const newGeo = decodeGeoString(level.geo);
		geoPaintBuffer.current.forEach((pixel, index) => {
			newGeo[index] = pixel;
		});

		dispatchWorldData({
			type: 'setLevelProperty',
			coordinates: currentCoordinates,
			key: 'geo',
			value: encode(deflate(newGeo)),
		});

		geoPaintBuffer.current = [];
	}, [currentCoordinates, dispatchWorldData, level.geo]);

	const doBrushPreview = useCallback(
		(brushSize: number) => {
			if (mapMouseMoveCoordinates == null) {
				return;
			}

			// We always start from a blank array so we need to do another shallow compare here
			geoPaintBuffer.current = shallowCompareArray(
				geoPaintBuffer.current,
				paintBresenham(paintColor, [], mapMouseMoveCoordinates, null, brushSize)
			);
		},
		[mapMouseMoveCoordinates, paintColor]
	);

	const paint = useCallback(
		(mouseCoords: [number, number]) => {
			geoPaintBuffer.current = paintBresenham(
				paintColor,
				geoPaintBuffer.current,
				mouseCoords,
				prevMouseCoordinates.current,
				brushSize
			);

			prevMouseCoordinates.current = mouseCoords;
		},
		[paintColor, brushSize]
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
		},
		[currentCoordinates, dispatchWorldData, level.geo, paintColor]
	);

	const doEyedropper = useCallback(
		(mouseCoords: [number, number]) => {
			setPaintColor(pickColor(decodeGeoString(level.geo), mouseCoords));
		},
		[level.geo]
	);

	const doEntityTransform = useCallback(
		(mouseCoords: [number, number]) => {
			if (currentEntityTransforming == null) {
				return;
			}

			const prev = prevMouseCoordinates.current;
			setCurrentEntityTransforming((transform) => {
				if (transform == null || prev == null) {
					return transform;
				}

				return {
					...transform,
					x: transform.x + (mouseCoords[0] - prev[0]),
					y: transform.y + (mouseCoords[1] - prev[1]),
				};
			});

			prevMouseCoordinates.current = mouseCoords;
		},
		[currentEntityTransforming]
	);

	const finishEntityTransformAndSaveDraft = useCallback(() => {
		if (currentEntityTransforming == null) {
			return;
		}

		setIsMouseDown(false);
		prevMouseCoordinates.current = null;
		setCurrentEntityTransforming(null);

		dispatchWorldData({
			type: 'editEntityPropertiesOnLevel',
			coordinates: currentCoordinates,
			index: currentEntityTransforming.index,
			properties: {
				x: currentEntityTransforming.x,
				y: currentEntityTransforming.y,
			},
			entityType: currentEntityTransforming.type,
		});
	}, [currentCoordinates, currentEntityTransforming, dispatchWorldData]);

	const setEditorToolType = useCallback(
		(newEditorToolType: EditorToolType) => {
			if (editorToolType === newEditorToolType) {
				return;
			}

			if (newEditorToolType === 'BRUSH') {
				doBrushPreview(brushSize);
			}

			switch (editorToolType) {
				case 'SELECT':
					finishEntityTransformAndSaveDraft();
					break;

				case 'BRUSH':
					// Stop painting if we're switching away from brush tool
					if (isMouseDown) {
						stopBrushAndSaveDraft();
					} else {
						// Clear brush mouseover preview
						geoPaintBuffer.current = [];
					}
					break;

				default:
					break;
			}

			setIsMouseDown(false);
			setEditorToolTypeRaw(newEditorToolType);
		},
		[
			brushSize,
			doBrushPreview,
			editorToolType,
			finishEntityTransformAndSaveDraft,
			isMouseDown,
			stopBrushAndSaveDraft,
		]
	);

	const setBrushSize = useCallback(
		(newBrushSize: number) => {
			setBrushSizeRaw(newBrushSize);

			if (editorToolType === 'BRUSH' && !isMouseDown) {
				doBrushPreview(newBrushSize);
			}
		},
		[doBrushPreview, editorToolType, isMouseDown]
	);

	// Reset editor state when changing UI views
	const previousActiveUiViews = usePrevious(activeUiViews);
	if (
		previousActiveUiViews != null &&
		previousActiveUiViews !== activeUiViews
	) {
		if (previousActiveUiViews.has('OBJECT') && !activeUiViews.has('OBJECT')) {
			if (addingEntityLabel?.type === 'OBJECT') {
				setAddingEntityLabel(null);
			}

			if (currentEntityTransforming?.type === 'OBJECT') {
				setCurrentEntityTransforming(null);
			}
		} else if (
			previousActiveUiViews.has('DECO') &&
			!activeUiViews.has('DECO')
		) {
			if (addingEntityLabel?.type === 'DECO') {
				setAddingEntityLabel(null);
			}

			if (currentEntityTransforming?.type === 'DECO') {
				setCurrentEntityTransforming(null);
			}
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
				switch (editorToolType) {
					case 'BRUSH':
						setIsMouseDown(true);
						paint(mapMouseMoveCoordinates);

						ev.preventDefault();
						break;

					case 'FILL':
						doFloodFill(mapMouseMoveCoordinates);
						break;

					case 'EYEDROPPER':
						setIsMouseDown(true);
						doEyedropper(mapMouseMoveCoordinates);
						break;

					default:
						break;
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

	const onMouseUp = useCallback(() => {
		if (!isMouseDown) {
			return;
		}

		switch (editorToolType) {
			case 'SELECT':
				finishEntityTransformAndSaveDraft();
				break;

			case 'BRUSH':
				stopBrushAndSaveDraft();
				break;

			default:
				break;
		}

		setIsMouseDown(false);
	}, [
		editorToolType,
		finishEntityTransformAndSaveDraft,
		isMouseDown,
		stopBrushAndSaveDraft,
	]);

	useEffect(() => {
		window.addEventListener('mouseup', onMouseUp);

		return () => {
			window.removeEventListener('mouseup', onMouseUp);
		};
	}, [onMouseUp]);

	const onMapMouseLeave = useCallback(
		(ev: React.MouseEvent<HTMLDivElement>) => {
			if (editorToolType === 'BRUSH') {
				// Without this code, if the user holds down the button while quickly moving the
				// cursor to be outside the geo preview, `onMapMouseMove` will not fire to paint
				// the pixels between `prevMouseCoordinates` and the cursor.
				// We need `onMapMouseLeave` to cover this.
				if (isMouseDown) {
					const rect = ev.currentTarget.getBoundingClientRect();

					paint([
						Math.round(ev.clientX - rect.left),
						Math.round(ev.clientY - rect.top),
					]);
				} else {
					// Clear brush mouseover preview
					geoPaintBuffer.current = [];
				}

				prevMouseCoordinates.current = null;
			}

			setMapMouseMoveCoordinates(null);
		},
		[editorToolType, isMouseDown, paint]
	);

	const onMapMouseMove = useCallback(
		(ev: React.MouseEvent<HTMLDivElement>) => {
			const rect = ev.currentTarget.getBoundingClientRect();

			const mouseMapCoords: [number, number] = [
				Math.round(ev.clientX - rect.left),
				Math.round(ev.clientY - rect.top),
			];

			setMapMouseMoveCoordinates(mouseMapCoords);

			switch (editorToolType) {
				case 'SELECT':
					if (isMouseDown) {
						doEntityTransform(mouseMapCoords);
					}
					break;

				case 'BRUSH':
					if (isMouseDown) {
						paint(mouseMapCoords);
					} else {
						doBrushPreview(brushSize);
					}
					break;

				case 'EYEDROPPER':
					if (isMouseDown) {
						doEyedropper(mouseMapCoords);
					}
					break;

				default:
					break;
			}
		},
		[
			brushSize,
			doBrushPreview,
			doEntityTransform,
			doEyedropper,
			editorToolType,
			isMouseDown,
			paint,
		]
	);

	const onEntityClick = useCallback(
		(entityIndex: number, entityType: GameEntityType) => {
			switch (entityType) {
				case 'OBJECT':
					dispatchSidebarObjectsListItemsExpanded({
						type: 'expand',
						indexes: [entityIndex],
					});

					setExpandedSidebarPanels((expandedSidebarPanels) => {
						if (!expandedSidebarPanels.has('OBJECTS')) {
							return new Set(expandedSidebarPanels).add('OBJECTS');
						}

						return expandedSidebarPanels;
					});
					break;

				case 'DECO':
					dispatchSidebarDecosListItemsExpanded({
						type: 'expand',
						indexes: [entityIndex],
					});

					setExpandedSidebarPanels((expandedSidebarPanels) => {
						if (!expandedSidebarPanels.has('DECOS')) {
							return new Set(expandedSidebarPanels).add('DECOS');
						}

						return expandedSidebarPanels;
					});
					break;
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

			switch (type) {
				case 'OBJECT':
					dispatchSidebarObjectsListItemsExpanded({
						type: 'remove',
						index: deletedObjectIndex,
					});
					break;

				case 'DECO':
					dispatchSidebarDecosListItemsExpanded({
						type: 'remove',
						index: deletedObjectIndex,
					});
					break;
			}
		},
		[
			currentCoordinates,
			dispatchWorldData,
			dispatchSidebarDecosListItemsExpanded,
			dispatchSidebarObjectsListItemsExpanded,
		]
	);

	const onEntityMouseDown = useCallback(
		(
			ev: React.MouseEvent<HTMLDivElement>,
			type: GameEntityType,
			index: number
		) => {
			if (editorToolType !== 'SELECT') {
				return;
			}

			if (ev.buttons === 1) {
				ev.preventDefault();

				let entities = null;
				switch (type) {
					case 'OBJECT':
						entities = level.objects;
						break;

					case 'DECO':
						entities = level.decos;
						break;
				}
				if (entities == null) {
					return;
				}

				setIsMouseDown(true);
				setCurrentEntityTransforming({
					type,
					index,
					x: entities[index].x,
					y: entities[index].y,
				});
			}
		},
		[editorToolType, level.decos, level.objects]
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

	const levelDraft = useMemo(
		() => getLevelDraft(level, currentEntityTransforming),
		[level, currentEntityTransforming]
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
						editorEntityTransforming={currentEntityTransforming}
						editorToolType={editorToolType}
						geoPaintBuffer={geoPaintBuffer.current}
						level={levelDraft}
						mapMouseMoveCoordinates={mapMouseMoveCoordinates}
						objectIndexHover={objectIndexHover}
						onDecoHover={setDecoIndexHover}
						onEntityClick={onEntityClick}
						onEntityMouseDown={onEntityMouseDown}
						onMapMouseClick={onMapMouseClick}
						onMapMouseDown={onMapMouseDown}
						onMapMouseLeave={onMapMouseLeave}
						onMapMouseMove={onMapMouseMove}
						onObjectHover={setObjectIndexHover}
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

			{activeUiViews.has('SIDEBAR') ? (
				<ErrorBoundary>
					<LevelSidebar
						decoIndexHover={decoIndexHover}
						decosListItemsExpanded={sidebarDecosListItemsExpanded}
						dispatchDecosListItemsExpanded={
							dispatchSidebarDecosListItemsExpanded
						}
						dispatchObjectsListItemsExpanded={
							dispatchSidebarObjectsListItemsExpanded
						}
						expandedSidebarPanels={expandedSidebarPanels}
						level={level}
						levelPreviewGeoPaintBuffer={geoPaintBuffer.current}
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
			) : null}
		</div>
	);
}

import GeoPreview from '../common/GeoPreview';
import {EDITOR_UI_PIXEL_COLORS, GEO_WIDTH, SCREEN_WIDTH} from '../GeoConstants';
import spriteData from '../spriteData.json';
import type {EditorEntityHoverType} from '../types/EditorEntityHoverType';
import type {EditorEntityTransform} from '../types/EditorEntityTransform';
import type {EditorToolType} from '../types/EditorToolType';
import type {GameEntityType} from '../types/GameEntityType';
import type {LevelInspectorUiView} from '../types/LevelInspectorUiView';
import type {LevelType} from '../types/LevelType';
import type {PlaceableType} from '../types/PlaceableType';
import getGameObjectSimpleName from '../util/getGameObjectSimpleName';

import LevelInGamePreview from './LevelInGamePreview';
import styles from './LevelPreview.module.css';
import LevelPreviewArrows from './LevelPreviewArrows';
import LevelPreviewDecos from './LevelPreviewDecos';
import LevelPreviewObjects from './LevelPreviewObjects';
import LevelPreviewNoViews from './noviews/LevelPreviewNoViews';

type Props = Readonly<{
	activeUiViews: Set<LevelInspectorUiView>;
	addingEntityLabel: PlaceableType | null;
	currentCoordinates: [number, number, number];
	level: LevelType;
	geoPaintBuffer: ReadonlyArray<number> | null;
	mapMouseMoveCoordinates: [number, number] | null;
	entityHover: EditorEntityHoverType | null;
	entityTransforming: EditorEntityTransform | null;
	editorToolType: EditorToolType;
	onMapMouseDown: (ev: React.MouseEvent<HTMLDivElement>) => void;
	onMapMouseClick: (ev: React.MouseEvent<HTMLDivElement>) => void;
	onMapMouseLeave: (ev: React.MouseEvent<HTMLDivElement>) => void;
	onMapMouseMove: (ev: React.MouseEvent<HTMLDivElement>) => void;
	onEntityClick: (entityType: GameEntityType, entityIndex: number) => void;
	onEntityHover: (
		entityType: GameEntityType,
		entityIndex: number | null
	) => void;
	onEntityMouseDown: (
		ev: React.MouseEvent<HTMLDivElement>,
		entityType: GameEntityType,
		entityIndex: number
	) => void;
}>;

export default function LevelPreview(props: Props) {
	const {addingEntityLabel, mapMouseMoveCoordinates} = props;

	// Show arrows around
	// Some objects can be off-screen
	let offscreenX = -25 - 8 * 2;
	let offscreenY = -25 - 8 * 2;

	if (props.activeUiViews.has('OBJECT')) {
		props.level.objects?.forEach((obj) => {
			offscreenX = Math.min(offscreenX, obj.x - 8);
			offscreenY = Math.min(offscreenY, obj.y - 8);
		});
	}

	// Some decos can be off-screen
	if (props.activeUiViews.has('DECO')) {
		props.level.decos?.forEach((deco) => {
			const sprite = spriteData[deco.spr];
			if (!sprite) {
				return;
			}

			offscreenX = Math.min(offscreenX, deco.x - sprite.originx - 8);
			offscreenY = Math.min(offscreenY, deco.y - sprite.originy - 8);
		});
	}

	// Draw sprite when adding a decoration
	const urlPrefix = import.meta.env.VITE_SPRITES_URL_PREFIX;
	let addingDeco;
	if (addingEntityLabel && addingEntityLabel.type === 'DECO') {
		const deco = addingEntityLabel.data;
		if (urlPrefix != null) {
			const src = urlPrefix + deco + '.png';
			addingDeco = (
				<img
					alt={deco}
					className={styles.addingDecoSprite}
					height={spriteData[deco].height}
					src={src}
					style={{
						left: -spriteData[deco].originx,
						top: -spriteData[deco].originy,
					}}
					width={spriteData[deco].width}
				/>
			);
		} else {
			addingDeco = deco;
		}
	}

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			className={styles.root}
			data-testid="levelpreview-root"
			onClick={props.onMapMouseClick}
			onMouseLeave={props.onMapMouseLeave}
			onMouseMove={props.onMapMouseMove}
			style={{
				left: -offscreenX,
				top: -offscreenY,
			}}
		>
			{props.activeUiViews.has('OBJECT') ? (
				<LevelPreviewObjects
					entityTransforming={
						props.entityTransforming?.type === 'OBJECT'
							? props.entityTransforming
							: null
					}
					editorToolType={props.editorToolType}
					entityIndexHover={
						props.entityHover?.type === 'OBJECT'
							? props.entityHover.index
							: null
					}
					level={props.level}
					onEntityClick={props.onEntityClick}
					onEntityHover={props.onEntityHover}
					onEntityMouseDown={props.onEntityMouseDown}
				/>
			) : null}

			{addingEntityLabel != null &&
			mapMouseMoveCoordinates != null &&
			props.activeUiViews.has(addingEntityLabel.type) ? (
				<div
					className={
						styles.addingObjectItem +
						' ' +
						(addingEntityLabel.type === 'OBJECT' ? styles.object : styles.deco)
					}
					style={{
						left: mapMouseMoveCoordinates[0],
						top: mapMouseMoveCoordinates[1],
					}}
				>
					{addingEntityLabel.type === 'OBJECT'
						? getGameObjectSimpleName(addingEntityLabel.data)
						: addingDeco}
				</div>
			) : null}

			{props.activeUiViews.has('DECO') ? (
				<LevelPreviewDecos
					entityTransforming={
						props.entityTransforming?.type === 'DECO'
							? props.entityTransforming
							: null
					}
					editorToolType={props.editorToolType}
					entityIndexHover={
						props.entityHover?.type === 'DECO' ? props.entityHover.index : null
					}
					level={props.level}
					onEntityClick={props.onEntityClick}
					onEntityHover={props.onEntityHover}
					onEntityMouseDown={props.onEntityMouseDown}
				/>
			) : null}

			{props.activeUiViews.has('INGAME') ? (
				<LevelInGamePreview
					currentCoordinates={props.currentCoordinates}
					semiTransparent={
						props.activeUiViews.has('OBJECT') ||
						props.activeUiViews.has('DECO') ||
						props.activeUiViews.has('GEO')
					}
				/>
			) : null}

			{props.activeUiViews.has('GEO') ? (
				// eslint-disable-next-line jsx-a11y/no-static-element-interactions
				<div className={styles.geoCanvas} onMouseDown={props.onMapMouseDown}>
					<GeoPreview
						colors={EDITOR_UI_PIXEL_COLORS}
						geoPaintBuffer={props.geoPaintBuffer}
						level={props.level}
						mapMouseMoveCoordinates={null}
						scale={SCREEN_WIDTH / GEO_WIDTH}
						useDevicePixelRatio={true}
					/>
				</div>
			) : null}

			{!props.activeUiViews.has('OBJECT') &&
			!props.activeUiViews.has('DECO') &&
			!props.activeUiViews.has('GEO') &&
			!props.activeUiViews.has('INGAME') ? (
				<LevelPreviewNoViews />
			) : null}

			<LevelPreviewArrows />
		</div>
	);
}

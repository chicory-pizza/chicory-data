// @flow strict

import GeoPreview from '../common/GeoPreview';
import {GEO_WIDTH, SCREEN_WIDTH} from '../GeoConstants';
// $FlowFixMe[untyped-import]
import spriteData from '../spriteData.json';
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

type Props = $ReadOnly<{
	activeUiViews: Array<LevelInspectorUiView>,
	addingEntityLabel: ?PlaceableType,
	currentCoordinates: [number, number, number],
	level: LevelType,
	geoPaintBuffer: ?Array<number>,
	mapMouseMoveCoordinates: ?[number, number],
	objectIndexHover: ?number,
	paintBufferUpdate: ?number,
	onMapMouseClick: (ev: SyntheticMouseEvent<HTMLDivElement>) => mixed,
	onMapMouseLeave: (ev: SyntheticMouseEvent<HTMLDivElement>) => mixed,
	onMapMouseMove: (ev: SyntheticMouseEvent<HTMLDivElement>) => mixed,
	onEntityClick: (entityIndex: number, entityType: GameEntityType) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
	decoIndexHover: ?number,
	onDecoHover: (decoIndex: ?number) => mixed,
}>;

export default function LevelPreview(props: Props): React$Node {
	const {addingEntityLabel, mapMouseMoveCoordinates} = props;

	// Show arrows around
	// Some objects can be off-screen
	let offscreenX = -25 - 8 * 2;
	let offscreenY = -25 - 8 * 2;

	if (props.activeUiViews.includes('OBJECT')) {
		props.level.objects?.forEach((obj) => {
			offscreenX = Math.min(offscreenX, obj.x - 8);
			offscreenY = Math.min(offscreenY, obj.y - 8);
		});
	}

	// Some decos can be off-screen
	if (props.activeUiViews.includes('DECO')) {
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
					className={styles.addingDecoSprite}
					alt={deco}
					src={src}
					width={spriteData[deco].width}
					height={spriteData[deco].height}
					style={{
						left: -spriteData[deco].originx,
						top: -spriteData[deco].originy,
					}}
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
			onMouseMove={props.onMapMouseMove}
			onMouseLeave={props.onMapMouseLeave}
			style={{
				left: -offscreenX,
				top: -offscreenY,
			}}
		>
			{props.activeUiViews.includes('OBJECT') ? (
				<LevelPreviewObjects
					level={props.level}
					entityIndexHover={props.objectIndexHover}
					onEntityClick={props.onEntityClick}
					onEntityHover={props.onObjectHover}
				/>
			) : null}

			{addingEntityLabel != null &&
			mapMouseMoveCoordinates != null &&
			props.activeUiViews.includes(addingEntityLabel.type) ? (
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

			{props.activeUiViews.includes('DECO') ? (
				<LevelPreviewDecos
					level={props.level}
					entityIndexHover={props.decoIndexHover}
					onEntityClick={props.onEntityClick}
					onEntityHover={props.onDecoHover}
				/>
			) : null}

			{props.activeUiViews.includes('INGAME') ? (
				<LevelInGamePreview
					currentCoordinates={props.currentCoordinates}
					semiTransparent={props.activeUiViews.length > 1}
				/>
			) : null}

			{props.activeUiViews.includes('GEO') ? (
				<div className={styles.geoCanvas}>
					<GeoPreview
						level={props.level}
						mapMouseMoveCoordinates={null}
						scale={SCREEN_WIDTH / GEO_WIDTH}
						useDevicePixelRatio={true}
						geoPaintBuffer={props.geoPaintBuffer}
						paintBufferUpdate={props.paintBufferUpdate}
					/>
				</div>
			) : null}

			{props.activeUiViews.length === 0 ? <LevelPreviewNoViews /> : null}

			<LevelPreviewArrows />
		</div>
	);
}

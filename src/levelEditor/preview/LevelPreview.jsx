// @flow strict

import GeoPreview from '../common/GeoPreview';
import {GEO_WIDTH, SCREEN_WIDTH} from '../GeoConstants';
// $FlowFixMe[untyped-import]
import spritesData from '../spriteData.json';
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
	mapMouseMoveCoordinates: ?[number, number],
	objectIndexHover: ?number,
	onMapMouseClick: (ev: SyntheticMouseEvent<HTMLDivElement>) => mixed,
	onMapMouseLeave: (ev: SyntheticMouseEvent<HTMLDivElement>) => mixed,
	onMapMouseMove: (ev: SyntheticMouseEvent<HTMLDivElement>) => mixed,
	onEntityClick: (entityIndex: number, entityType: GameEntityType) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
	decoIndexHover: ?number,
	onDecoHover: (decoIndex: ?number) => mixed,
}>;

export default function LevelPreview(props: Props): React$Node {
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
			offscreenX = Math.min(
				offscreenX,
				deco.x - spritesData[deco.spr].originx - 8
			);
			offscreenY = Math.min(
				offscreenY,
				deco.y - spritesData[deco.spr].originy - 8
			);
		});
	}

	//Draw sprite when adding a decoration
	const urlPrefix = import.meta.env.VITE_SPRITES_URL_PREFIX;
	let addingDeco;
	if (props.addingEntityLabel && props.addingEntityLabel.type === 'DECO') {
		const deco = props.addingEntityLabel.data;
		if (urlPrefix != null) {
			const src = urlPrefix + deco + '.png';
			addingDeco = (
				<img
					className={styles.addingDecoSprite}
					alt={deco}
					src={src}
					width={spritesData[deco].width}
					height={spritesData[deco].height}
					style={{
						left: -spritesData[deco].originx,
						top: -spritesData[deco].originy,
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

			{props.addingEntityLabel != null &&
			props.mapMouseMoveCoordinates != null &&
			props.activeUiViews.includes(props.addingEntityLabel.type) ? (
				<div
					className={
						styles.addingObjectItem +
						' ' +
						(props.addingEntityLabel.type === 'OBJECT'
							? styles.object
							: styles.deco)
					}
					style={{
						left: props.mapMouseMoveCoordinates[0],
						top: props.mapMouseMoveCoordinates[1],
					}}
				>
					{props.addingEntityLabel.type === 'OBJECT'
						? getGameObjectSimpleName(props.addingEntityLabel.data)
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
					/>
				</div>
			) : null}

			{props.activeUiViews.length === 0 ? <LevelPreviewNoViews /> : null}

			<LevelPreviewArrows />
		</div>
	);
}

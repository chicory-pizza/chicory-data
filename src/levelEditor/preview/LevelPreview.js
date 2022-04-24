// @flow strict

import GeoPreview from '../common/GeoPreview';
import {GEO_WIDTH, SCREEN_WIDTH} from '../GeoConstants';
import type {GameObjectEntityType} from '../types/GameObjectEntityType';
import type {LevelInspectorUiView} from '../types/LevelInspectorUiView';
import type {LevelType} from '../types/LevelType';

import LevelInGamePreview from './LevelInGamePreview';
import styles from './LevelPreview.module.css';
import LevelPreviewArrows from './LevelPreviewArrows';
import LevelPreviewObjects from './LevelPreviewObjects';
import LevelPreviewNoViews from './noviews/LevelPreviewNoViews';

type Props = $ReadOnly<{
	activeUiViews: Array<LevelInspectorUiView>,
	addingObjectEntity: ?GameObjectEntityType,
	currentCoordinates: [number, number, number],
	level: LevelType,
	mapMouseMoveCoordinates: ?[number, number],
	objectIndexHover: ?number,
	onMapMouseClick: (ev: SyntheticMouseEvent<HTMLDivElement>) => mixed,
	onMapMouseLeave: (ev: SyntheticMouseEvent<HTMLDivElement>) => mixed,
	onMapMouseMove: (ev: SyntheticMouseEvent<HTMLDivElement>) => mixed,
	onObjectClick: (objectIndex: number) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
}>;

export default function LevelPreview(props: Props): React$Node {
	const objects = props.level.objects;

	// Show arrows around
	// Some objects can be bit off-screen
	let offscreenX = -25 - 8 * 2;
	let offscreenY = -25 - 8 * 2;
	objects?.forEach((obj) => {
		offscreenX = Math.min(offscreenX, obj.x - 8);
		offscreenY = Math.min(offscreenY, obj.y - 8);
	});

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
			{props.activeUiViews.includes('OBJECTS') ? (
				<LevelPreviewObjects
					level={props.level}
					objectIndexHover={props.objectIndexHover}
					onMapMouseLeave={props.onMapMouseLeave}
					onObjectClick={props.onObjectClick}
					onObjectHover={props.onObjectHover}
				/>
			) : null}

			{props.activeUiViews.includes('OBJECTS') &&
			props.addingObjectEntity != null &&
			props.mapMouseMoveCoordinates != null ? (
				<div
					className={styles.addingObjectItem}
					style={{
						left: props.mapMouseMoveCoordinates[0],
						top: props.mapMouseMoveCoordinates[1],
					}}
				>
					{props.addingObjectEntity.slice('obj'.length)}
				</div>
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

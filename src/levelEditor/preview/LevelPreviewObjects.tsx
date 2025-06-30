import {memo} from 'react';

import {
	DOG_RES_SCALE,
	IDLE_ORIGIN_X,
	IDLE_ORIGIN_Y,
} from '../../dog/drawDogToCanvas';
import type {EditorToolType} from '../types/EditorToolType';
import type {GameEntityType} from '../types/GameEntityType';
import type {LevelType} from '../types/LevelType';
import getGameObjectSimpleName from '../util/getGameObjectSimpleName';

import LevelPreviewCustomDog from './LevelPreviewCustomDog';
import styles from './LevelPreviewObjects.module.css';
import TransformDiv from './TransformDiv';

type Props = Readonly<{
	level: LevelType;
	editorToolType: EditorToolType;
	entityIndexHover: number | null;
	mapMouseMoveCoordinates: [number, number] | null;
	onEntityClick: (entityIndex: number, entityType: GameEntityType) => void;
	onEntityHover: (entityIndex: number | null) => void;
	onEntityTransformUpdate: (
		index: number,
		properties: {
			[key: string]: string | number | null;
		},
		type: GameEntityType
	) => void;
}>;

function LevelPreviewObjects(props: Props) {
	const levelObjects = props.level.objects;
	if (levelObjects == null) {
		return null;
	}

	return levelObjects.map((obj, index) => {
		const isCustomDog = obj.obj === 'objCustomDog';

		let transformOrigin: [number, number] | null = null;
		const baseTransform = {
			x: obj.x,
			y: obj.y,
			xScale: 1,
			yScale: 1,
			angle: 0,
		};

		if (isCustomDog) {
			transformOrigin = [
				IDLE_ORIGIN_X / DOG_RES_SCALE,
				IDLE_ORIGIN_Y / DOG_RES_SCALE,
			];

			if (typeof obj.xscale === 'number') {
				baseTransform.xScale = obj.xscale;
			}
			if (typeof obj.yscale === 'number') {
				baseTransform.yScale = obj.yscale;
			}
			if (typeof obj.angle === 'number') {
				baseTransform.angle = obj.angle;
			}
		}

		return (
			<TransformDiv
				baseTransform={baseTransform}
				centerDiv={true}
				className={
					styles.item +
					' ' +
					(props.entityIndexHover === index ? styles.hover : '') +
					' ' +
					(props.editorToolType !== 'SELECT' ? styles.disabled : '')
				}
				// We don't have unique IDs for objects :(
				// eslint-disable-next-line @eslint-react/no-array-index-key
				key={index}
				mapMouseMoveCoordinates={props.mapMouseMoveCoordinates}
				onClick={() => {
					props.onEntityClick(index, 'OBJECT');
				}}
				onMouseEnter={() => {
					props.onEntityHover(index);
				}}
				onMouseLeave={() => {
					props.onEntityHover(null);
				}}
				onTransformUpdate={(t) => {
					props.onEntityTransformUpdate(index, {x: t.x, y: t.y}, 'OBJECT');
				}}
				origin={transformOrigin}
				renderOffset={isCustomDog ? [0, -110 / 2] : null}
				rotateFirst={true}
			>
				{isCustomDog ? (
					<LevelPreviewCustomDog obj={obj} />
				) : (
					getGameObjectSimpleName(obj.obj)
				)}
			</TransformDiv>
		);
	});
}

export default memo(LevelPreviewObjects);

import {memo} from 'react';

import {
	DOG_RES_SCALE,
	IDLE_ORIGIN_X,
	IDLE_ORIGIN_Y,
} from '../../dog/drawDogToCanvas';
import type {EditorEntityTransform} from '../types/EditorEntityTransform';
import type {EditorToolType} from '../types/EditorToolType';
import type {GameEntityType} from '../types/GameEntityType';
import type {LevelType} from '../types/LevelType';
import getGameObjectSimpleName from '../util/getGameObjectSimpleName';

import LevelPreviewCustomDog from './LevelPreviewCustomDog';
import styles from './LevelPreviewObjects.module.css';
import TransformDiv from './TransformDiv';

type Props = Readonly<{
	level: LevelType;
	entityTransforming: EditorEntityTransform | null;
	editorToolType: EditorToolType;
	entityIndexHover: number | null;
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
					(props.editorToolType !== 'SELECT' ? styles.disabled : '') +
					' ' +
					(props.entityTransforming?.index === index ? styles.grabbing : '')
				}
				// We don't have unique IDs for objects :(
				// eslint-disable-next-line @eslint-react/no-array-index-key
				key={index}
				onClick={() => {
					props.onEntityClick('OBJECT', index);
				}}
				onMouseEnter={() => {
					props.onEntityHover('OBJECT', index);
				}}
				onMouseLeave={() => {
					props.onEntityHover('OBJECT', null);
				}}
				onMouseDown={(ev) => {
					props.onEntityMouseDown(ev, 'OBJECT', index);
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

// @flow strict

import {memo} from 'react';

import {
	DOG_RES_SCALE,
	IDLE_ORIGIN_X,
	IDLE_ORIGIN_Y,
} from '../../dog/drawDogToCanvas';
import type {EditorToolType} from '../types/EditorToolType';
import type {GameEntityType} from '../types/GameEntityType';
import type {LevelType} from '../types/LevelType';
import type {TransformType} from '../types/TransformType';
import getGameObjectSimpleName from '../util/getGameObjectSimpleName';

import LevelPreviewCustomDog from './LevelPreviewCustomDog';
import styles from './LevelPreviewObjects.module.css';
import TransformDiv from './TransformDiv';

type Props = $ReadOnly<{
	level: LevelType,
	editorToolType: EditorToolType,
	entityIndexHover: ?number,
	mapMouseMoveCoordinates: ?[number, number],
	onEntityClick: (entityIndex: number, entityType: GameEntityType) => mixed,
	onEntityHover: (entityIndex: ?number) => mixed,
	onEntityTransformUpdate: (
		index: number,
		properties: {
			[key: string]: string | number | null,
		},
		type: GameEntityType
	) => mixed,
}>;

function LevelPreviewObjects(props: Props): React$Node {
	const levelObjects = props.level.objects;
	if (levelObjects == null) {
		return null;
	}

	return levelObjects.map((obj, index) => {
		const isCustomDog = obj.obj === 'objCustomDog';

		let transformOrigin = null;

		if (isCustomDog) {
			transformOrigin = [
				IDLE_ORIGIN_X / DOG_RES_SCALE,
				IDLE_ORIGIN_Y / DOG_RES_SCALE,
			];
		}

		return (
			// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
			<TransformDiv
				baseTransform={{
					x: obj.x,
					y: obj.y,
					xScale: obj.xscale,
					yScale: obj.yscale,
					angle: obj.angle,
				}}
				centerDiv={true}
				className={
					styles.item +
					' ' +
					(props.entityIndexHover === index ? styles.hover : '') +
					' ' +
					(props.editorToolType !== 'Select' ? styles.disabled : '')
				}
				key={index}
				mapMouseMoveCoordinates={props.mapMouseMoveCoordinates}
				onClick={() => props.onEntityClick(index, 'OBJECT')}
				onMouseEnter={() => props.onEntityHover(index)}
				onMouseLeave={() => props.onEntityHover(null)}
				onTransformUpdate={(t: TransformType) =>
					props.onEntityTransformUpdate(index, {x: t.x, y: t.y}, 'OBJECT')
				}
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

export default (memo<Props>(LevelPreviewObjects): React$AbstractComponent<
	Props,
	mixed
>);

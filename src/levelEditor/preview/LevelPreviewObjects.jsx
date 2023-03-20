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
import getGameObjectSimpleName from '../util/getGameObjectSimpleName';

import LevelPreviewCustomDog from './LevelPreviewCustomDog';
import styles from './LevelPreviewObjects.module.css';

type Props = $ReadOnly<{
	level: LevelType,
	editorToolType: EditorToolType,
	entityIndexHover: ?number,
	onEntityClick: (entityIndex: number, entityType: GameEntityType) => mixed,
	onEntityHover: (entityIndex: ?number) => mixed,
}>;

function LevelPreviewObjects(props: Props): React$Node {
	const levelObjects = props.level.objects;
	if (levelObjects == null) {
		return null;
	}

	return levelObjects.map((obj, index) => {
		const isCustomDog = obj.obj === 'objCustomDog';

		const transforms = [];
		let transformOrigin = '';
		if (isCustomDog) {
			transformOrigin = `${IDLE_ORIGIN_X / DOG_RES_SCALE}px ${
				IDLE_ORIGIN_Y / DOG_RES_SCALE
			}px`;

			if (typeof obj.angle === 'number' && obj.angle !== 0) {
				transforms.push(`rotate(${-obj.angle}deg)`);
			}

			if (typeof obj.xscale === 'number') {
				transforms.push(`scaleX(${obj.xscale})`);
			}

			if (typeof obj.yscale === 'number') {
				transforms.push(`scaleY(${obj.yscale})`);
			}
		}

		return (
			// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
			<div
				className={
					styles.item +
					' ' +
					(props.entityIndexHover === index ? styles.hover : '') +
					' ' +
					(props.editorToolType !== 'Select' ? styles.disabled : '')
				}
				key={index}
				onClick={() => props.onEntityClick(index, 'OBJECT')}
				onMouseEnter={() => props.onEntityHover(index)}
				onMouseLeave={() => props.onEntityHover(null)}
				style={{
					left: obj.x,
					top:
						obj.y +
						// Need to adjust Y position here so the whole box is moved
						(isCustomDog ? -110 / 2 : 0),
					transform:
						transforms.length !== 0
							? 'translate(-50%, -50%) ' + transforms.join(' ')
							: null,
					transformOrigin,
				}}
			>
				{isCustomDog ? (
					<LevelPreviewCustomDog obj={obj} />
				) : (
					getGameObjectSimpleName(obj.obj)
				)}
			</div>
		);
	});
}

export default (memo<Props>(LevelPreviewObjects): React$AbstractComponent<
	Props,
	mixed
>);

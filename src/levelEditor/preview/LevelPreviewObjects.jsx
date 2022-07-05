// @flow strict

import {memo} from 'react';

import type {GameEntityType} from '../types/GameEntityType';
import type {LevelType} from '../types/LevelType';
import getGameObjectSimpleName from '../util/getGameObjectSimpleName';

import styles from './LevelPreviewObjects.module.css';

type Props = $ReadOnly<{
	level: LevelType,
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
		return (
			// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
			<div
				className={
					styles.item +
					' ' +
					(props.entityIndexHover === index ? styles.hover : '')
				}
				key={index}
				onClick={() => props.onEntityClick(index, 'OBJECT')}
				onMouseEnter={() => props.onEntityHover(index)}
				onMouseLeave={() => props.onEntityHover(null)}
				style={{
					left: obj.x,
					top: obj.y,
				}}
			>
				{getGameObjectSimpleName(obj.obj)}
			</div>
		);
	});
}

export default (memo<Props>(LevelPreviewObjects): React$AbstractComponent<
	Props,
	mixed
>);

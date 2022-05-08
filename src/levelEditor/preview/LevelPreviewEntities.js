// @flow strict

import {memo} from 'react';

import spritesData from '../spriteData.json';
import type {DecorationType} from '../types/DecorationType';
import type {GameEntityType} from '../types/GameEntityType';
import type {GameObjectType} from '../types/GameObjectType';

import styles from './LevelPreviewEntities.module.css';

type Props = $ReadOnly<{
	levelEntities: Array<DecorationType> | Array<GameObjectType>,
	entityIndexHover: ?number,
	onEntityClick: (entityIndex: number) => mixed,
	onEntityHover: (entityIndex: ?number) => mixed,
	type: GameEntityType,
}>;

function LevelPreviewEntities(props: Props): React$Node {
	if (props.levelEntities == null) {
		return null;
	}

	return props.levelEntities.map((ent, index) => {
		let src = '';
		let offsetX = 0;
		let offsetY = 0;
		let style = styles.objHover;
		if (props.type === 'DECO') {
			src = require('../../sprites/' + ent.spr + '.png');
			offsetX = spritesData[ent.spr].originx;
			offsetY = spritesData[ent.spr].originy;
			style = styles.decoHover;
		}
		return (
			// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
			<div
				className={
					styles.item + ' ' + (props.entityIndexHover === index ? style : '')
				}
				key={index}
				onClick={() => props.onEntityClick(index, props.type)}
				onMouseEnter={() => props.onEntityHover(index)}
				onMouseLeave={() => props.onEntityHover(null)}
				style={{
					left: ent.x - offsetX,
					top: ent.y - offsetY,
				}}
			>
				{props.type === 'DECO' ? (
					<img
						alt={ent.spr}
						className={styles.image}
						key={index}
						src={src}
						width={spritesData[ent.spr].width * ent.xs}
						height={spritesData[ent.spr].height * ent.ys}
						style={{
							transform:
								`rotate(${ent.ang}deg)` +
								(ent.xs < 0 ? ' scaleX(-1) ' : ' scaleX(1) ') +
								(ent.ys < 0 ? 'scaleY(-1)' : 'scaleY(1)'),
						}}
					/>
				) : (
					ent.obj.slice('obj'.length)
				)}
			</div>
		);
	});
}

export default (memo<Props>(LevelPreviewEntities): React$AbstractComponent<
	Props,
	mixed
>);

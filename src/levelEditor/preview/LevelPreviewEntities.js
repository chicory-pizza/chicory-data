// @flow strict

import {memo} from 'react';

// $FlowFixMe[untyped-import]
import spritesData from '../spriteData.json';
import type {GameEntityType} from '../types/GameEntityType';
import type {LevelType} from '../types/LevelType';

import styles from './LevelPreviewEntities.module.css';

type Props = $ReadOnly<{
	level: LevelType,
	entityIndexHover: ?number,
	onEntityClick: (entityIndex: number, entityType: GameEntityType) => mixed,
	onEntityHover: (entityIndex: ?number) => mixed,
	type: GameEntityType,
}>;

function LevelPreviewEntities(props: Props): React$Node {
	if (props.type === 'OBJECT') {
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
						(props.entityIndexHover === index ? styles.objHover : '')
					}
					key={index}
					onClick={() => props.onEntityClick(index, props.type)}
					onMouseEnter={() => props.onEntityHover(index)}
					onMouseLeave={() => props.onEntityHover(null)}
					style={{
						left: obj.x,
						top: obj.y,
					}}
				>
					{obj.obj.slice('obj'.length)}
				</div>
			);
		});
	} else {
		const levelDecos = props.level.decos;
		if (levelDecos == null) {
			return null;
		}

		return levelDecos.map((dec, index) => {
			// I can't find a better way to do this, so I'm just going to ignore the error
			// $FlowFixMe[unsupported-syntax]
			let src = require('../../sprites/' + dec.spr + '.png');
			return (
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
				<div
					className={
						styles.item +
						' ' +
						(props.entityIndexHover === index ? styles.decoHover : '')
					}
					key={index}
					onClick={() => props.onEntityClick(index, props.type)}
					onMouseEnter={() => props.onEntityHover(index)}
					onMouseLeave={() => props.onEntityHover(null)}
					style={{
						left: dec.x - spritesData[dec.spr].originx,
						top: dec.y - spritesData[dec.spr].originy,
					}}
				>
					<img
						alt={dec.spr}
						className={styles.image}
						key={index}
						src={src}
						width={spritesData[dec.spr].width * dec.xs}
						height={spritesData[dec.spr].height * dec.ys}
						style={{
							transform:
								`rotate(${dec.ang}deg)` +
								(dec.xs < 0 ? ' scaleX(-1) ' : ' scaleX(1) ') +
								(dec.ys < 0 ? 'scaleY(-1)' : 'scaleY(1)'),
						}}
					/>
				</div>
			);
		});
	}
}

export default (memo<Props>(LevelPreviewEntities): React$AbstractComponent<
	Props,
	mixed
>);

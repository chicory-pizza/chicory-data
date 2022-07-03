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
						styles.itemObj +
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
			const urlPrefix = import.meta.env.VITE_SPRITES_URL_PREFIX;
			const originx = spritesData[dec.spr].originx;
			const originy = spritesData[dec.spr].originy;

			let decoElement;
			if (urlPrefix == null) {
				// Add sprite toggle here
				decoElement = dec.spr;
			} else {
				const src = urlPrefix + dec.spr + '.png';
				decoElement = (
					<img
						alt={dec.spr}
						title={dec.spr}
						key={src}
						src={src}
						width={spritesData[dec.spr].width}
						height={spritesData[dec.spr].height}
					/>
				);
			}

			return (
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
				<div
					className={
						styles.itemDeco +
						' ' +
						(props.entityIndexHover === index ? styles.decoHover : '')
					}
					key={index}
					onClick={() => props.onEntityClick(index, props.type)}
					onMouseEnter={() => props.onEntityHover(index)}
					onMouseLeave={() => props.onEntityHover(null)}
					style={{
						left: dec.x - originx,
						top: dec.y - originy,
						transformOrigin: `${originx}px ${originy}px`,
						transform: `scaleX(${dec.xs}) scaleY(${dec.ys}) rotate(${
							-1 * Math.sign(dec.xs) * dec.ang
						}deg)`,
					}}
				>
					{decoElement}
				</div>
			);
		});
	}
}

export default (memo<Props>(LevelPreviewEntities): React$AbstractComponent<
	Props,
	mixed
>);

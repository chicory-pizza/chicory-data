// @flow strict

import {memo} from 'react';

// $FlowFixMe[untyped-import]
import spritesData from '../spriteData.json';
import type {GameEntityType} from '../types/GameEntityType';
import type {LevelType} from '../types/LevelType';

import styles from './LevelPreviewDecos.module.css';

type Props = $ReadOnly<{
	level: LevelType,
	entityIndexHover: ?number,
	onEntityClick: (entityIndex: number, entityType: GameEntityType) => mixed,
	onEntityHover: (entityIndex: ?number) => mixed,
}>;

function LevelPreviewDecos(props: Props): React$Node {
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
					styles.item +
					' ' +
					(props.entityIndexHover === index ? styles.hover : '')
				}
				key={index}
				onClick={() => props.onEntityClick(index, 'DECO')}
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

export default (memo<Props>(LevelPreviewDecos): React$AbstractComponent<
	Props,
	mixed
>);

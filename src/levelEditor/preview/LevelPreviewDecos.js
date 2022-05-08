// @flow strict

import {memo} from 'react';

import spritesData from '../spriteData.json';
import type {LevelType} from '../types/LevelType';

import styles from './LevelPreviewDecos.module.css';

type Props = $ReadOnly<{
	level: LevelType,
	decoIndexHover: ?number,
	onEntityClick: (entityIndex: number) => mixed,
	onDecoHover: (decoIndex: ?number) => mixed,
}>;

function LevelPreviewDecos(props: Props): React$Node {
	const decos = props.level.decos;

	if (decos == null) {
		return null;
	}

	return decos.map((dec, index) => {
		const src = require('../../sprites/' + dec.spr + '.png');
		return (
			// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
			<div
				className={
					styles.item +
					' ' +
					(props.decoIndexHover === index ? styles.itemHover : '')
				}
				key={index}
				onClick={() => props.onEntityClick(index, 'DECO')}
				onMouseEnter={() => props.onDecoHover(index)}
				onMouseLeave={() => props.onDecoHover(null)}
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

export default (memo<Props>(LevelPreviewDecos): React$AbstractComponent<
	Props,
	mixed
>);

// @flow strict

import {memo} from 'react';

// $FlowFixMe[untyped-import]
import spriteData from '../spriteData.json';
import type {GameEntityType} from '../types/GameEntityType';
import type {EditorToolType} from '../types/EditorToolType';
import type {LevelType} from '../types/LevelType';

import styles from './LevelPreviewDecos.module.css';

type Props = $ReadOnly<{
	level: LevelType,
	editorToolType: EditorToolType,
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

		const sprite = spriteData[dec.spr];

		let image: string | React$MixedElement = dec.spr;
		const style = {
			left: dec.x,
			top: dec.y,
			transformOrigin: '',
			transform: '',
		};
		if (sprite != null && urlPrefix != null) {
			const src = urlPrefix + dec.spr + '.png';
			image = (
				<img
					alt={dec.spr}
					title={dec.spr}
					key={src}
					src={src}
					width={sprite.width}
					height={sprite.height}
				/>
			);

			const originx = sprite.originx;
			const originy = sprite.originy;

			style.left = dec.x - originx;
			style.top = dec.y - originy;
			style.transformOrigin = `${originx}px ${originy}px`;
			style.transform = `scaleX(${dec.xs}) scaleY(${dec.ys}) rotate(${
				-1 * Math.sign(dec.xs) * dec.ang
			}deg)`;
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
				onClick={() => props.onEntityClick(index, 'DECO')}
				onMouseEnter={() => props.onEntityHover(index)}
				onMouseLeave={() => props.onEntityHover(null)}
				style={style}
			>
				{image}
			</div>
		);
	});
}

export default (memo<Props>(LevelPreviewDecos): React$AbstractComponent<
	Props,
	mixed
>);

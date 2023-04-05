// @flow strict

import {memo} from 'react';

// $FlowFixMe[untyped-import]
import spriteData from '../spriteData.json';
import type {EditorToolType} from '../types/EditorToolType';
import type {GameEntityType} from '../types/GameEntityType';
import type {LevelType} from '../types/LevelType';
import type {TransformType} from '../types/TransformType';

import styles from './LevelPreviewDecos.module.css';
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

function LevelPreviewDecos(props: Props): React$Node {
	const levelDecos = props.level.decos;
	if (levelDecos == null) {
		return null;
	}

	return levelDecos.map((dec, index) => {
		const urlPrefix = import.meta.env.VITE_SPRITES_URL_PREFIX;

		const sprite = spriteData[dec.spr];

		let image: string | React$MixedElement = dec.spr;
		let transformOrigin = null;
		let renderOffset = null;

		if (sprite != null && urlPrefix != null) {
			const src = urlPrefix + dec.spr + '.png';
			image = (
				<img
					alt={dec.spr}
					height={sprite.height}
					key={src}
					src={src}
					title={dec.spr}
					width={sprite.width}
				/>
			);

			transformOrigin = [sprite.originx, sprite.originy];
			renderOffset = [-sprite.originx, -sprite.originy];
		}

		return (
			// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
			<TransformDiv
				baseTransform={{
					x: dec.x,
					y: dec.y,
					xScale: dec.xs,
					yScale: dec.ys,
					angle: dec.ang,
				}}
				className={
					styles.item +
					' ' +
					(props.entityIndexHover === index ? styles.hover : '') +
					' ' +
					(props.editorToolType !== 'SELECT' ? styles.disabled : '')
				}
				key={index}
				mapMouseMoveCoordinates={props.mapMouseMoveCoordinates}
				onClick={() => props.onEntityClick(index, 'DECO')}
				onMouseEnter={() => props.onEntityHover(index)}
				onMouseLeave={() => props.onEntityHover(null)}
				onTransformUpdate={(t: TransformType) =>
					props.onEntityTransformUpdate(
						index,
						{
							x: t.x,
							y: t.y,
						},
						'DECO'
					)
				}
				origin={transformOrigin}
				renderOffset={renderOffset}
			>
				{image}
			</TransformDiv>
		);
	});
}

export default (memo<Props>(LevelPreviewDecos): React$AbstractComponent<
	Props,
	mixed
>);

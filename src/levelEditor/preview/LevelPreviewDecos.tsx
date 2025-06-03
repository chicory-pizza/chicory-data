import {memo} from 'react';

import spriteData from '../spriteData.json';
import type {EditorToolType} from '../types/EditorToolType';
import type {GameEntityType} from '../types/GameEntityType';
import type {LevelType} from '../types/LevelType';
import type {TransformType} from '../types/TransformType';

import styles from './LevelPreviewDecos.module.css';
import TransformDiv from './TransformDiv';

type Props = Readonly<{
	level: LevelType;
	editorToolType: EditorToolType;
	entityIndexHover: number | null;
	mapMouseMoveCoordinates: [number, number] | null;
	onEntityClick: (entityIndex: number, entityType: GameEntityType) => void;
	onEntityHover: (entityIndex: number | null) => void;
	onEntityTransformUpdate: (
		index: number,
		properties: {
			[key: string]: string | number | null;
		},
		type: GameEntityType
	) => void;
}>;

function LevelPreviewDecos(props: Props) {
	const levelDecos = props.level.decos;
	if (levelDecos == null) {
		return null;
	}

	return levelDecos.map((dec, index) => {
		const urlPrefix = import.meta.env.VITE_SPRITES_URL_PREFIX;

		const sprite = spriteData[dec.spr];

		let image: string | React.ReactNode = dec.spr;
		let transformOrigin: [number, number] | null = null;
		let renderOffset: [number, number] | null = null;

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

			transformOrigin = [
				parseInt(sprite.originx, 10),
				parseInt(sprite.originy, 10),
			];
			renderOffset = [-sprite.originx, -sprite.originy];
		}

		return (
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

export default memo(LevelPreviewDecos);

import {memo} from 'react';

import spriteData from '../spriteData.json';
import type {EditorEntityTransform} from '../types/EditorEntityTransform';
import type {EditorToolType} from '../types/EditorToolType';
import type {GameEntityType} from '../types/GameEntityType';
import type {LevelType} from '../types/LevelType';

import styles from './LevelPreviewDecos.module.css';
import TransformDiv from './TransformDiv';

type Props = Readonly<{
	level: LevelType;
	entityTransforming: EditorEntityTransform | null;
	editorToolType: EditorToolType;
	entityIndexHover: number | null;
	onEntityClick: (entityType: GameEntityType, entityIndex: number) => void;
	onEntityHover: (
		entityType: GameEntityType,
		entityIndex: number | null
	) => void;
	onEntityMouseDown: (
		ev: React.MouseEvent<HTMLDivElement>,
		entityType: GameEntityType,
		entityIndex: number
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

			transformOrigin = [sprite.originx, sprite.originy];
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
					(props.editorToolType !== 'SELECT' ? styles.disabled : '') +
					' ' +
					(props.entityTransforming?.index === index ? styles.grabbing : '')
				}
				// We don't have unique IDs for decos :(
				// eslint-disable-next-line @eslint-react/no-array-index-key
				key={index}
				onClick={() => {
					props.onEntityClick('DECO', index);
				}}
				onMouseEnter={() => {
					props.onEntityHover('DECO', index);
				}}
				onMouseLeave={() => {
					props.onEntityHover('DECO', null);
				}}
				onMouseDown={(ev) => {
					props.onEntityMouseDown(ev, 'DECO', index);
				}}
				origin={transformOrigin}
				renderOffset={renderOffset}
			>
				{image}
			</TransformDiv>
		);
	});
}

export default memo(LevelPreviewDecos);

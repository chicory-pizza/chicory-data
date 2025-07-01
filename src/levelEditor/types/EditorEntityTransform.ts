import type {GameEntityType} from './GameEntityType';

export type EditorEntityTransform = {
	type: GameEntityType;
	index: number;
	x: number;
	y: number;
};

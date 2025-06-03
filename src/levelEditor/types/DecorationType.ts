import type {SpriteType} from './SpriteType';

export type DecorationType = {
	ang: number;
	spr: SpriteType;
	x: number;
	xs: number;
	y: number;
	ys: number;
};

const DECORATION_TYPE_KEYS = new Set([
	'ang',
	'spr',
	'x',
	'xs',
	'y',
	'ys',
]) as ReadonlySet<keyof DecorationType>;

export function isValidDecorationTypeKey(
	key: string
): key is keyof DecorationType {
	return DECORATION_TYPE_KEYS.has(key);
}

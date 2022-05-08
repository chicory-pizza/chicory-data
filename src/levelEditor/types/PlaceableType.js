// @flow strict

import type {GameObjectEntityType} from './GameObjectEntityType';
import type {SpriteType} from './SpriteType';

export type PlaceableType = {
	type: 'OBJECT' | 'DECO',
	data: GameObjectEntityType | SpriteType,
};

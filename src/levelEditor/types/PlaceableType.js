// @flow strict

import type {GameObjectEntityType} from './GameObjectEntityType';
import type {SpriteType} from './SpriteType';

export type Placeable = {
	type: 'OBJECT' | 'DECO',
	data: GameObjectEntityType | SpriteType,
};

import type {GameObjectEntityType} from './GameObjectEntityType';
import type {SpriteType} from './SpriteType';

export type PlaceableType =
	| {
			type: 'OBJECT';
			data: GameObjectEntityType;
	  }
	| {
			type: 'DECO';
			data: SpriteType;
	  };

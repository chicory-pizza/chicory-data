// @flow strict

import type {GameObjectEntityType} from './GameObjectEntityType';

export type GameObjectType =
	| {
			obj: GameObjectEntityType,
			x: number,
			y: number,
			id?: number,
			...
	  }
	| {
			obj: 'objNode',
			x: number,
			y: number,
			id?: number,

			name: string,
	  }
	| {
			obj: 'objPortal',
			x: number,
			y: number,

			dest: string,
			name: string,
			sound: string,
			swimming: string, // more like boolean
			trans: string,
	  };

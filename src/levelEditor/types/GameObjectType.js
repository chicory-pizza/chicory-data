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

			dataamt?: string, // actually number
			datalock?: string,
			dest: string,
			interactable?: '1', // only on [1, -1, -1]
			name: string,
			oneway?: '0' | '1',
			sound: string,
			swimming?: '1' | '-1',
			trans: '-2' | '0' | '1' | '2' | '3',
	  }
	| {
			obj: 'objCustomDog',
			x: number,
			y: number,

			animation: string,
			clothes: string,
			color_body: number,
			color_head: number,
			color_skin: number,
			comment: string,
			expression: string,
			hair: string,
			hat: string,
	  };

import type {GameObjectEntityType} from './GameObjectEntityType';

export type GameObjectType =
	| {
			obj: Exclude<
				GameObjectEntityType,
				'objNode' | 'objPortal' | 'objCustomDog'
			>;
			x: number;
			y: number;
			id?: number;
			[key: string]: string | number | undefined;
	  }
	| {
			obj: 'objNode';
			x: number;
			y: number;
			id?: number;
			name: string;
			[key: string]: string | number | undefined;
	  }
	| {
			obj: 'objPortal';
			x: number;
			y: number;
			dataamt?: string; // actually number;
			datalock?: string;
			dest: string;
			interactable?: '1'; // only on [1, -1, -1];
			name: string;
			oneway?: '0' | '1';
			sound: string;
			swimming?: '1' | '-1';
			trans: '-2' | '0' | '1' | '2' | '3';
			[key: string]: string | number | undefined;
	  }
	| {
			obj: 'objCustomDog';
			x: number;
			y: number;
			angle: number;
			animation: string;
			brush: number;
			clothes: string;
			color_body: number;
			color_head: number;
			color_skin: number;
			comment: string;
			custom_clothes?: string;
			custom_hat?: string;
			dialogue?: string;
			expression: string;
			hair: string;
			hat: string;
			interactable?: number;
			npc_name?: string;
			xscale: number;
			yscale: number;
			[key: string]: string | number | undefined;
	  };

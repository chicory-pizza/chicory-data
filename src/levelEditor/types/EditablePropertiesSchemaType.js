// @flow strict

export type EditablePropertiesType =
	| {
			key: string,
			type: 'STRING',
			default?: string, // future use
			help?: string,
	  }
	| {
			key: string,
			type: 'NUMBER',
			default?: number, // future use
			help?: string,
	  }
	| {
			key: string,
			type: 'ENUM',
			options: $ReadOnlyArray<string>,
	  }
	| {
			key: string,
			type: 'PALETTE',
	  }
	| {
			key: string,
			type: 'DOG_EXPRESSION',
	  }
	| {
			key: string,
			type: 'GM_COLOR',
			default: number,
			help?: string,
	  };

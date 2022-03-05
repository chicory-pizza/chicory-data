// @flow strict

export type EditablePropertiesType =
	| {
			key: string,
			type: 'STRING',
	  }
	| {
			key: string,
			type: 'NUMBER',
	  }
	| {
			key: string,
			type: 'ENUM',
			options: $ReadOnlyArray<string>,
	  };

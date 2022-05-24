// @flow strict

export type DrawdogPreset = {
	clothes: string,
	clothesColor: string,
	customClothesImage?: string,
	expression?: string,
	hair: string,
	hats: $ReadOnlyArray<{
		name: string,
		color: string,
		customImage: ?string,
	}>,
	name: string,
	skinColor: string,
	skinOutlineColor?: string,
};

export const DRAWDOG_PRESETS: $ReadOnlyArray<DrawdogPreset> = [
	{
		clothes: 'Overalls',
		clothesColor: '#ffffff',
		hair: 'Simple',
		hats: [
			{
				name: 'Bandana',
				color: '#ffffff',
				customImage: null,
			},
		],
		name: 'Pizza (default)',
		skinColor: '#ffffff',
	},
	{
		clothes: 'Hoodie',
		clothesColor: '#FF5B57',
		hair: 'Simple',
		hats: [
			{
				name: 'Flower',
				color: '#DF243F',
				customImage: null,
			},
			{
				name: 'Kerchief',
				color: '#777CE1',
				customImage: null,
			},
		],
		skinColor: '#1C2E89',
		name: 'Azure Pancakes',
		skinOutlineColor: '#03EFF9',
	},
	{
		clothes: 'Wielder Cloak',
		clothesColor: '#B432FF',
		hair: 'Big Fluffy',
		hats: [
			{
				name: 'Bow',
				color: '#8C44A4',
				customImage: null,
			},
		],
		name: 'Burrito',
		skinColor: '#FFF2C9',
	},
	{
		clothes: 'Custom Tee',
		clothesColor: '#CB5587',
		customClothesImage: require('./Custom_Tee_Cinnaroll.png'),
		hair: 'Simple',
		hats: [
			{
				name: 'Custom Hat',
				color: '#B996C2',
				customImage: require('./Custom_Hat_Cinnaroll.png'),
			},
		],
		name: 'Cinnaroll',
		skinColor: '#B38184',
	},
	{
		clothes: 'Scarf',
		clothesColor: '#DFDEF5',
		hair: 'Simple',
		hats: [
			{
				name: 'Round Glasses',
				color: '#B1E2E5',
				customImage: null,
			},
		],
		name: 'Cocoa',
		skinColor: '#665E58',
	},
	{
		clothes: 'Wielder Cloak',
		clothesColor: '#B696ED',
		hair: 'Simple',
		hats: [
			{
				name: 'Wielder Tie',
				color: '#B696ED',
				customImage: null,
			},
		],
		name: 'Hot Wings',
		skinColor: '#FFF5ED',
	},
	{
		clothes: 'Scarf',
		clothesColor: '#F9A797',
		hair: 'Simple',
		hats: [
			{
				name: 'None',
				color: '#FA777F',
				customImage: null,
			},
		],
		name: 'Lasagne',
		skinColor: '#FEFDAE',
	},
	{
		clothes: 'Scarf',
		clothesColor: '#00f3dd',
		hair: 'Hedgehog',
		hats: [
			{
				name: 'Spellcaster',
				color: '#b69aff',
				customImage: null,
			},
		],
		name: 'Pancake',
		skinColor: '#ffa694',
	},
	{
		clothes: 'Princess',
		clothesColor: '#42BDF5',
		hair: 'Simple',
		hats: [
			{
				name: 'Foxy',
				color: '#F4AA41',
				customImage: null,
			},
		],
		name: 'Pizzy',
		skinColor: '#F4AA41',
	},
	{
		clothes: 'Kerchief',
		clothesColor: '#81E9B5',
		hair: 'Simple',
		hats: [
			{
				name: 'Top Hat',
				color: '#A2FEF8',
				customImage: null,
			},
		],
		name: 'Rice',
		skinColor: '#FFFFFF',
	},
];

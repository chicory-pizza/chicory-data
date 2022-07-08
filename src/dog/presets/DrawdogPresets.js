// @flow strict

import transformImageImport from '../../util/transformImageImport';

export type DrawdogPreset = {
	clothes: string,
	clothesColor: string,
	customClothesImage?: string,
	expression?: string, // default is 'normal'
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

	// Drawdogs from various members from Discord!
	//
	// Please sort this list A-Z
	{
		clothes: 'Mailbag',
		clothesColor: '#81e9b5',
		hair: 'Simple',
		hats: [
			{
				name: 'Kerchief',
				color: '#fc777d',
				customImage: null,
			},
		],
		skinColor: '#fef2c9',
		name: 'Apple Pie',
	},
	{
		clothes: 'Hoodie',
		clothesColor: '#ff5b57',
		hair: 'Simple',
		hats: [
			{
				name: 'Flower',
				color: '#df243f',
				customImage: null,
			},
			{
				name: 'Kerchief',
				color: '#777ce1',
				customImage: null,
			},
		],
		skinColor: '#1c2e89',
		name: 'Azure Pancakes',
		skinOutlineColor: '#03eff9',
	},
	{
		clothes: 'Wielder Cloak',
		clothesColor: '#b432ff',
		hair: 'Big Fluffy',
		hats: [
			{
				name: 'Bow',
				color: '#8c44a4',
				customImage: null,
			},
		],
		name: 'Burrito',
		skinColor: '#fff2c9',
	},
	{
		clothes: 'Scarf',
		clothesColor: '#ffffae',
		hair: 'Simple',
		hats: [
			{
				name: 'Strawhat',
				color: '#f38a8a',
				customImage: null,
			},
		],
		name: 'Caldereta',
		skinColor: '#ffdc80',
	},
	{
		clothes: 'Smock',
		clothesColor: '#0fc3a2',
		hair: 'Dreds',
		hats: [
			{
				name: 'None',
				color: '#ffffff',
				customImage: null,
			},
		],
		name: 'Chicken',
		skinColor: '#fec52b',
	},
	{
		clothes: 'Big Star',
		clothesColor: '#c9ffe2',
		hair: 'Floofy',
		hats: [
			{
				name: 'Scarf',
				color: '#ffffff',
				customImage: null,
			},
		],
		name: 'Chips',
		skinColor: '#ffebfc',
	},
	{
		clothes: 'Custom Tee',
		clothesColor: '#cb5587',
		customClothesImage: transformImageImport(
			new URL('./Custom_Tee_Cinnaroll.png', import.meta.url)
		),
		expression: 'smit',
		hair: 'Simple',
		hats: [
			{
				name: 'Custom Hat',
				color: '#b996c2',
				customImage: transformImageImport(
					new URL('./Custom_Hat_Cinnaroll.png', import.meta.url)
				),
			},
		],
		name: 'Cinnaroll',
		skinColor: '#b38184',
	},
	{
		clothes: 'Scarf',
		clothesColor: '#dfdef5',
		hair: 'Simple',
		hats: [
			{
				name: 'Round Glasses',
				color: '#b1e2e5',
				customImage: null,
			},
		],
		name: 'Cocoa',
		skinColor: '#665e58',
	},
	{
		clothes: 'Wielder Cloak',
		clothesColor: '#b696ed',
		expression: 'closed',
		hair: 'Simple',
		hats: [
			{
				name: 'Wielder Tie',
				color: '#b696ed',
				customImage: null,
			},
		],
		name: 'Hot Wings',
		skinColor: '#fff5ed',
	},
	{
		clothes: 'College',
		clothesColor: '#d3eeea',
		hair: 'Simple',
		hats: [
			{
				name: 'Beanie',
				color: '#fea694',
				customImage: null,
			},
		],
		name: 'Jaffa Cake',
		skinColor: '#dfdef5',
	},
	{
		clothes: 'Scarf',
		clothesColor: '#f9a797',
		hair: 'Simple',
		hats: [
			{
				name: 'None',
				color: '#fa777f',
				customImage: null,
			},
		],
		name: 'Lasagne',
		skinColor: '#fefdae',
	},
	{
		// myself lol
		clothes: 'Scarf',
		clothesColor: '#00f3dd',
		hair: 'Hedgehog',
		hats: [
			{
				name: 'None',
				color: '#b69aff',
				customImage: null,
			},
			{
				// Originally Spellcaster
				name: 'Custom Hat',
				color: '#ffffff',
				customImage: transformImageImport(
					new URL('./Custom_Hat_Pancake.png', import.meta.url)
				),
			},
		],
		name: 'Pancake',
		skinColor: '#ffa694',
	},
	{
		clothes: 'Kerchief',
		clothesColor: '#887ded',
		hair: 'Topknot',
		hats: [
			{
				name: 'Round Glasses',
				color: '#ffd481',
				customImage: null,
			},
		],
		name: 'Pipoca',
		skinColor: '#e4c18b',
	},
	{
		clothes: 'Princess',
		clothesColor: '#42bdf5',
		hair: 'Simple',
		hats: [
			{
				name: 'Foxy',
				color: '#f4aa41',
				customImage: null,
			},
		],
		name: 'Pizzy',
		skinColor: '#f4aa41',
	},
	{
		clothes: 'College',
		clothesColor: '#1086eb',
		expression: 'cheeky',
		hair: 'Flip',
		hats: [
			{
				name: 'Kerchief',
				color: '#baec34',
				customImage: null,
			},
		],
		name: 'Popcorn',
		skinColor: '#dfc591',
	},
	{
		clothes: 'College',
		clothesColor: '#8ad8fb',
		hair: 'Bellhair',
		hats: [
			{
				name: 'Sparkles',
				color: '#e898c1',
				customImage: null,
			},
		],
		name: 'Ramen',
		skinColor: '#fff9d9',
	},
	{
		clothes: 'Kerchief',
		clothesColor: '#81e9b5',
		hair: 'Simple',
		hats: [
			{
				name: 'Top Hat',
				color: '#a2fef8',
				customImage: null,
			},
		],
		name: 'Rice',
		skinColor: '#ffffff',
	},
	{
		clothes: 'Bard',
		clothesColor: '#8c8cfe',
		hair: 'Floofy',
		hats: [
			{
				name: 'Bow',
				color: '#9ec79f',
				customImage: null,
			},
			{
				name: 'Half-Moons',
				color: '#ffffff',
				customImage: null,
			},
		],
		name: 'Spark',
		skinColor: '#d3c3c3',
	},
	{
		clothes: 'Custom Tee',
		clothesColor: '#e3c861',
		customClothesImage: transformImageImport(
			new URL('./Custom_Tee_Stir_Fry.png', import.meta.url)
		),
		expression: 'angry',
		hair: 'Simple',
		hats: [
			{
				name: 'Custom Hat',
				color: '#e3c861',
				customImage: transformImageImport(
					new URL('./Custom_Hat_Stir_Fry.png', import.meta.url)
				),
			},
		],
		name: 'Stir Fry',
		skinColor: '#00c6ff',
	},
	{
		clothes: 'Kerchief',
		clothesColor: '#0f83dc',
		hair: 'Gorgeous',
		hats: [
			{
				name: 'Half-Moons',
				color: '#3ce2c5',
				customImage: null,
			},
		],
		name: 'Taco',
		skinColor: '#ffaf50',
	},
];

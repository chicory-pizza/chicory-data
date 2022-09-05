// @flow strict

import transformImageImport from '../../util/transformImageImport';

export type DrawdogPreset = {
	clothes: string,
	clothesColor: string,
	earColor?: string,
	customClothesImage?: string,
	expression?: string, // default is 'normal'
	hair: string,
	hats: $ReadOnlyArray<{
		name: string,
		color: string,
		customImage?: ?string,
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
			},
			{
				name: 'Kerchief',
				color: '#777ce1',
			},
		],
		skinColor: '#1c2e89',
		name: 'Azure Pancakes',
		skinOutlineColor: '#03eff9',
	},
	{
		clothes: 'Bard',
		clothesColor: '#2fbe40',
		hair: 'Pixie',
		hats: [
			{
				name: 'Kerchief',
				color: '#de3cdf',
			},
		],
		name: 'Biscuit',
		skinColor: '#ffa02a',
	},
	{
		clothes: 'Wielder Cloak',
		clothesColor: '#b432ff',
		hair: 'Big Fluffy',
		hats: [
			{
				name: 'Bow',
				color: '#8c44a4',
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
			},
		],
		name: 'Caldereta',
		skinColor: '#ffdc80',
	},
	{
		clothes: 'Nice Shirt',
		clothesColor: '#00ffff',
		expression: 'smit',
		hair: 'Shortcurl',
		hats: [
			{
				name: 'Goggles',
				color: '#ffe863',
			},
		],
		name: 'Cherry',
		skinColor: '#387eff',
	},
	{
		clothes: 'Smock',
		clothesColor: '#0fc3a2',
		hair: 'Dreds',
		hats: [
			{
				name: 'None',
				color: '#ffffff',
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
			},
		],
		name: 'Chips',
		skinColor: '#ffebfc',
	},
	{
		clothes: 'Cord Coat',
		clothesColor: '#a25d68',
		hair: 'Frizz',
		hats: [
			{
				name: 'Goggles',
				color: '#a25d68',
				customImage: null,
			},
		],
		name: 'Cinnabuns',
		skinColor: '#fea694',
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
			},
		],
		name: 'Cocoa',
		skinColor: '#665e58',
	},
	{
		clothes: 'Big Heart',
		clothesColor: '#fff3a7',
		hair: 'Simple',
		hats: [
			{
				name: 'Beanie',
				color: '#706e3d',
			},
		],
		name: 'Fish finger',
		skinColor: '#b695ec',
	},
	{
		clothes: 'Wielder Cloak',
		clothesColor: '#b696ed',
		expression: 'closed',
		hair: 'Boyband',
		hats: [
			{
				name: 'Wielder Tie',
				color: '#b696ed',
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
			},
		],
		name: 'Lasagne',
		skinColor: '#fefdae',
	},
	{
		clothes: 'Big Star',
		clothesColor: '#58a5b2',
		hair: 'Pony',
		hats: [
			{
				name: 'Bow',
				color: '#b25aa0',
			},
		],
		name: 'Meatloaf',
		skinColor: '#ffc31b',
	},
	{
		clothes: 'Smock',
		clothesColor: '#47d3ff',
		hair: 'Simple',
		hats: [
			{
				name: 'Flower',
				color: '#fe05e1',
			},
		],
		name: 'Minty :>',
		skinColor: '#bbebdc',
	},
	{
		clothes: 'Cute Dress',
		clothesColor: '#b871f3',
		hair: 'Simple',
		hats: [
			{
				name: 'Foxy',
				color: '#ff7080',
			},
		],
		name: 'Mulberry',
		skinColor: '#ffe8c2',
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
		clothes: 'Hoodie',
		clothesColor: '#ff5b57',
		hair: 'Simple',
		hats: [
			{
				name: 'Kerchief',
				color: '#777ce1',
			},
		],
		skinColor: '#c3884e',
		name: 'Pancakes',
	},
	{
		clothes: 'Kerchief',
		clothesColor: '#887ded',
		hair: 'Topknot',
		hats: [
			{
				name: 'Round Glasses',
				color: '#ffd481',
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
			},
		],
		name: 'Ramen',
		skinColor: '#fff9d9',
	},
	{
		clothes: 'Scarf',
		clothesColor: '#69117f',
		hair: 'Simple',
		hats: [
			{
				name: 'Top Hat',
				color: '#97fbb5',
			},
		],
		name: 'Rice',
		skinColor: '#ffffff',
	},
	{
		clothes: 'Wielder Cloak',
		clothesColor: '#a178fe',
		hair: 'Pony',
		hats: [
			{
				name: 'Bow',
				color: '#fec62c',
			},
		],
		name: 'Sour Gummi',
		skinColor: '#ffffff',
	},
	{
		clothes: 'High Nooner',
		clothesColor: '#ea7c4b',
		hair: 'Simple',
		hats: [
			{
				name: 'Ahoy',
				color: '#b56777',
			},
		],
		name: 'Spaghetti',
		skinColor: '#ffeabf',
	},
	{
		clothes: 'Princess',
		clothesColor: '#ee2020',
		hair: 'Gorgeous',
		hats: [
			{
				name: 'Tiara',
				color: '#f7ef18',
			},
		],
		name: 'Steak',
		skinColor: '#ffffff',
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
			},
		],
		name: 'Taco',
		skinColor: '#ffaf50',
	},
];

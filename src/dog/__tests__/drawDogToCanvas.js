// @flow strict

import path from 'path';

// $FlowFixMe[untyped-import]
import {loadImage} from 'canvas';
// $FlowFixMe[untyped-import]
import {toMatchImageSnapshot} from 'jest-image-snapshot';

import drawDogToCanvasTestHelper from '../testUtil/drawDogToCanvasTestHelper';

expect.extend({toMatchImageSnapshot});

test('basic dog', async () => {
	const image = await drawDogToCanvasTestHelper({
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
		skinColor: '#ffffff',
	});

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

test('hiker clothes', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Gi',
		clothesColor: '#ff0000',
		hair: 'Floofy',
		hats: [
			{
				name: 'Beak',
				color: '#00ff00',
				customImage: null,
			},
		],
		skinColor: '#0000ff',
	});

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

test('horns hat', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Overalls',
		clothesColor: '#ff0000',
		hair: 'Pony',
		hats: [
			{
				name: 'PLACEHOLDER_CLOTHES2',
				color: '#00ff00',
				customImage: null,
			},
		],
		skinColor: '#0000ff',
	});

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

test('multiple hats', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Overalls',
		clothesColor: '#ffffff',
		hair: 'Simple',
		hats: [
			{
				name: 'Flower',
				color: '#ff0000',
				customImage: null,
			},
			{
				name: 'Foxy',
				color: '#ff8800',
				customImage: null,
			},
			{
				name: 'Pointish Glasses',
				color: '#ffffff',
				customImage: null,
			},
			{
				name: 'Scarf',
				color: '#00aaff',
				customImage: null,
			},
		],
		skinColor: '#ffffff',
	});

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

test('expression', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Avast',
		clothesColor: '#ff0000',
		expression: 'cheeky',
		hair: 'Bob',
		hats: [
			{
				name: 'Ahoy',
				color: '#00ff00',
				customImage: null,
			},
		],
		skinColor: '#0000ff',
	});

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

// myself lol
test('Pancake', async () => {
	const image = await drawDogToCanvasTestHelper({
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
		skinColor: '#ffa694',
	});

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

// drawdogs from various members from Discord!
test('Burrito', async () => {
	const image = await drawDogToCanvasTestHelper({
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
		skinColor: '#FFF2C9',
	});

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

test('Cocoa', async () => {
	const image = await drawDogToCanvasTestHelper({
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
		skinColor: '#665E58',
	});

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

test('Hot Wings', async () => {
	const image = await drawDogToCanvasTestHelper({
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
		skinColor: '#FFF5ED',
	});

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

test('Lasagne', async () => {
	const image = await drawDogToCanvasTestHelper({
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
		skinColor: '#FEFDAE',
	});

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

test('Pizzy', async () => {
	const image = await drawDogToCanvasTestHelper({
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
		skinColor: '#F4AA41',
	});

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

test('Rice', async () => {
	const image = await drawDogToCanvasTestHelper({
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
		skinColor: '#FFFFFF',
	});

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

// for custom outline color
test('Azure', async () => {
	const image = await drawDogToCanvasTestHelper({
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
		skinOutlineColor: '#03EFF9',
	});

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

// for custom clothes/hat
test('Cinnaroll', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Custom Tee',
		clothesColor: '#CB5587',
		customClothesImage: await loadImage(
			path.resolve(__dirname, 'Custom_Tee_Cinnaroll.png')
		),
		hair: 'Simple',
		hats: [
			{
				name: 'Custom Hat',
				color: '#B996C2',
				customImage: await loadImage(
					path.resolve(__dirname, 'Custom_Hat_Cinnaroll.png')
				),
			},
		],
		skinColor: '#B38184',
	});

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

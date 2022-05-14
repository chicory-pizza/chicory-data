import path from 'path';

import {loadImage} from 'canvas';
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
			},
		],
		skinColor: '#ffffff',
	});

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
			},
		],
		skinColor: '#0000ff',
	});

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
			},
		],
		skinColor: '#0000ff',
	});

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
			},
			{
				name: 'Foxy',
				color: '#ff8800',
			},
			{
				name: 'Pointish Glasses',
				color: '#ffffff',
			},
			{
				name: 'Scarf',
				color: '#00aaff',
			},
		],
		skinColor: '#ffffff',
	});

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
			},
		],
		skinColor: '#ffa694',
	});

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
			},
		],
		skinColor: '#FFF2C9',
	});

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
			},
		],
		skinColor: '#665E58',
	});

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
			},
		],
		skinColor: '#FFF5ED',
	});

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
			},
		],
		skinColor: '#FEFDAE',
	});

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
			},
		],
		skinColor: '#F4AA41',
	});

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
			},
		],
		skinColor: '#FFFFFF',
	});

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
				name: 'Kerchief',
				color: '#777CE1',
			},
		],
		skinColor: '#1C2E89',
		skinOutlineColor: '#03EFF9',
	});

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
		hat: '',
		hatColor: '#',
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

	expect(image).toMatchImageSnapshot();
});

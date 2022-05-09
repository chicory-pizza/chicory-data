import {toMatchImageSnapshot} from 'jest-image-snapshot';

import drawDogToCanvasTestHelper from '../testUtil/drawDogToCanvasTestHelper';

expect.extend({toMatchImageSnapshot});

test('basic dog', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Overalls',
		clothesColor: '#ffffff',
		hair: 'Simple',
		hat: 'Bandana',
		hatColor: '#ffffff',
		skinColor: '#ffffff',
	});

	expect(image).toMatchImageSnapshot();
});

test('hiker clothes', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Gi',
		clothesColor: '#ff0000',
		hair: 'Floofy',
		hat: 'Beak',
		hatColor: '#00ff00',
		skinColor: '#0000ff',
	});

	expect(image).toMatchImageSnapshot();
});

test('Pancake', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Scarf',
		clothesColor: '#00f3dd',
		hair: 'Hedgehog',
		hat: 'Spellcaster',
		hatColor: '#b69aff',
		skinColor: '#ffa694',
	});

	expect(image).toMatchImageSnapshot();
});

test('Burrito', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Wielder Cloak',
		clothesColor: '#B432FF',
		hair: 'Big Fluffy',
		hat: 'Bow',
		hatColor: '#8C44A4',
		skinColor: '#FFF2C9',
	});

	expect(image).toMatchImageSnapshot();
});

test('Cocoa', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Scarf',
		clothesColor: '#DFDEF5',
		hair: 'Simple',
		hat: 'Round Glasses',
		hatColor: '#B1E2E5',
		skinColor: '#665E58',
	});

	expect(image).toMatchImageSnapshot();
});

test('Hot Wings', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Wielder Cloak',
		clothesColor: '#B696ED',
		hair: 'Simple',
		hat: 'Wielder Tie',
		hatColor: '#B696ED',
		skinColor: '#FFF5ED',
	});

	expect(image).toMatchImageSnapshot();
});

test('Lasagne', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Scarf',
		clothesColor: '#F9A797',
		hair: 'Simple',
		hat: 'None',
		hatColor: '#FA777F',
		skinColor: '#FEFDAE',
	});

	expect(image).toMatchImageSnapshot();
});

test('Pizzy', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Princess',
		clothesColor: '#42BDF5',
		hair: 'Simple',
		hat: 'Foxy',
		hatColor: '#F4AA41',
		skinColor: '#F4AA41',
	});

	expect(image).toMatchImageSnapshot();
});

test('Rice', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Kerchief',
		clothesColor: '#81E9B5',
		hair: 'Simple',
		hat: 'Top Hat',
		hatColor: '#A2FEF8',
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
		hat: 'Kerchief',
		hatColor: '#777CE1',
		skinColor: '#1C2E89',
		skinOutlineColor: '#03EFF9',
	});

	expect(image).toMatchImageSnapshot();
});

// @flow strict

import path from 'path';

// $FlowFixMe[untyped-import]
import {loadImage} from 'canvas';
// $FlowFixMe[untyped-import]
import {toMatchImageSnapshot} from 'jest-image-snapshot';

import {DRAWDOG_PRESETS} from '../presets/DrawdogPresets';
import type {DrawdogPreset} from '../presets/DrawdogPresets';
import drawDogToCanvasTestHelper from '../testUtil/drawDogToCanvasTestHelper';

expect.extend({toMatchImageSnapshot});

test('bard clothes', async () => {
	const image = await drawDogToCanvasTestHelper({
		clothes: 'Bard',
		clothesColor: '#ff0000',
		hair: 'Simple',
		hats: [],
		skinColor: '#0000ff',
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

// Presets
test.each(DRAWDOG_PRESETS)('$name', async (preset: DrawdogPreset) => {
	const newPreset = {
		clothes: preset.clothes,
		clothesColor: preset.clothesColor,
		customClothesImage:
			preset.customClothesImage != null
				? await loadImage(
						path.resolve(__dirname, '../presets/', preset.customClothesImage)
				  )
				: null,
		expression: preset.expression,
		hair: preset.hair,
		hats: await Promise.all(
			preset.hats.map(async (hat) => {
				return {
					...hat,
					customImage:
						hat.customImage != null
							? await loadImage(
									path.resolve(__dirname, '../presets/', hat.customImage)
							  )
							: null,
				};
			})
		),
		skinColor: preset.skinColor,
		skinOutlineColor: preset.skinOutlineColor,
	};

	const image = await drawDogToCanvasTestHelper(newPreset);

	// $FlowFixMe[incompatible-call]
	expect(image).toMatchImageSnapshot();
});

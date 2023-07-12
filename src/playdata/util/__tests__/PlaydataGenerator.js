// @flow strict

import PlaydataGenerator from '../PlaydataGenerator';

test('converts a dog', async () => {
	const generator = PlaydataGenerator.loadFromDogPreset({
		clothes: 'Avast',
		clothesColor: '#ff0000',
		hair: 'Bob',
		hats: [
			{
				name: 'Ahoy',
				color: '#00ff00',
			},
		],
		name: 'abc',
		skinColor: '#0000ff',
	});

	expect(generator.exportToGameSave()).toMatchObject({
		clothes: 'Avast',
		color_part_0: 65280,
		color_part_1: 16711680,
		color_part_2: 255,
		hair: 'Bob',
		hat: 'Ahoy',
		name: 'abc',
	});
});

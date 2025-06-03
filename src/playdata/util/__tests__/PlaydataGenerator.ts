import {PlaydataGenerator} from '../PlaydataGenerator';

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

	expect(generator.exportToGameSave()).toEqual({
		clothes: 'Avast',
		color_part_0: 65280,
		color_part_1: 16711680,
		color_part_2: 255,
		got_Ahoy: 1,
		got_Avast: 1,
		hair: 'Bob',
		hat: 'Ahoy',
		name: 'abc',
	});
});

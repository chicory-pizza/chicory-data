// @flow strict

import convertDogEditorStateToPreset from '../convertDogEditorStateToPreset';

test('converts dog editor state to preset', async () => {
	expect(
		convertDogEditorStateToPreset({
			bodyShow: true,
			clothes: 'Overalls',
			clothesColor: '#ff0000',
			customClothesImage: null,
			earColor: '#ee0000',
			expression: 'normal',
			hair: 'Simple',
			hasCustomEarColor: true,
			hats: [
				{
					name: 'Bandana',
					color: '#00ff00',
					customImage: null,
				},
			],
			skinColor: '#0000ff',
			skinOutlineColor: '#0000ee',
			speechFont: 'Domigorgon',
			speechShowBubble: true,
			speechText: 'Hello!',
		})
	).toEqual({
		clothes: 'Overalls',
		clothesColor: '#ff0000',
		earColor: '#ee0000',
		expression: 'normal',
		hair: 'Simple',
		hats: [
			{
				name: 'Bandana',
				color: '#00ff00',
				customImage: null,
			},
		],
		name: '',
		skinColor: '#0000ff',
		skinOutlineColor: '#0000ee',
	});
});

test('no custom ear color', async () => {
	expect(
		convertDogEditorStateToPreset({
			bodyShow: true,
			clothes: 'Overalls',
			clothesColor: '#ff0000',
			customClothesImage: null,
			earColor: '#ee0000',
			expression: 'normal',
			hair: 'Simple',
			hasCustomEarColor: false,
			hats: [
				{
					name: 'Bandana',
					color: '#00ff00',
					customImage: null,
				},
			],
			skinColor: '#0000ff',
			skinOutlineColor: '#0000ee',
			speechFont: 'Domigorgon',
			speechShowBubble: true,
			speechText: 'Hello!',
		})
	).toEqual({
		clothes: 'Overalls',
		clothesColor: '#ff0000',
		earColor: '#0000ff',
		expression: 'normal',
		hair: 'Simple',
		hats: [
			{
				name: 'Bandana',
				color: '#00ff00',
				customImage: null,
			},
		],
		name: '',
		skinColor: '#0000ff',
		skinOutlineColor: '#0000ee',
	});
});

import getChicorobotCode from '../getChicorobotCode';

test('Pizza (default)', async () => {
	const code = getChicorobotCode({
		clothes: 'Overalls',
		clothesColor: '#ffffff',
		expression: 'normal',
		hair: 'Simple',
		hat: 'Bandana',
		hatColor: '#ffffff',
		skinColor: '#ffffff',
	});

	expect(code).toBe(
		'/dog expression:normal clothes:Overalls hat:Bandana hair:Simple body_col:#ffffff clothes_col:#ffffff hat_col:#ffffff'
	);
});

test('Pancake', async () => {
	const code = getChicorobotCode({
		clothes: 'Scarf',
		clothesColor: '#00f3dd',
		expression: 'normal',
		hair: 'Hedgehog',
		hat: 'None',
		hatColor: '#b69aff',
		skinColor: '#ffa694',
	});

	expect(code).toBe(
		'/dog expression:normal clothes:Scarf hat:None hair:Hedgehog body_col:#ffa694 clothes_col:#00f3dd hat_col:#b69aff'
	);
});

test('horns hat', async () => {
	const code = getChicorobotCode({
		clothes: 'Overalls',
		clothesColor: '#ff0000',
		expression: 'normal',
		hair: 'Pony',
		hat: 'PLACEHOLDER_CLOTHES2',
		hatColor: '#00ff00',
		skinColor: '#0000ff',
	});

	expect(code).toBe(
		'/dog expression:normal clothes:Overalls hat:Horns hair:Pony body_col:#0000ff clothes_col:#ff0000 hat_col:#00ff00'
	);
});

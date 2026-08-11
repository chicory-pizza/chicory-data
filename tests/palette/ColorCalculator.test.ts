import {screen} from '@testing-library/react';
import {expect, test} from 'vitest';

import clearAndType from '../testUtil/clearAndType';

import renderPaletteAppRoute from './testUtil/renderPaletteAppRoute';

test('changes the color on new hex input', async () => {
	await renderPaletteAppRoute();

	await clearAndType(
		await screen.findByLabelText('Hex code', {exact: false}),
		'#b69aff',
	);

	expect(screen.getByLabelText('Red', {exact: false})).toHaveValue('182');
	expect(screen.getByLabelText('Green', {exact: false})).toHaveValue('154');
	expect(screen.getByLabelText('Blue', {exact: false})).toHaveValue('255');
	expect(screen.getByLabelText('GML number')).toHaveValue('16751286');
});

test('changes the color on new GML input', async () => {
	await renderPaletteAppRoute();

	await clearAndType(await screen.findByLabelText('GML number'), '16751286');

	expect(screen.getByLabelText('Hex code', {exact: false})).toHaveValue(
		'#b69aff',
	);
	expect(screen.getByLabelText('Red', {exact: false})).toHaveValue('182');
	expect(screen.getByLabelText('Green', {exact: false})).toHaveValue('154');
	expect(screen.getByLabelText('Blue', {exact: false})).toHaveValue('255');
});

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect, test} from 'vitest';

import renderPaletteAppRoute from './testUtil/renderPaletteAppRoute';

test('changes the color on new hex input', async () => {
	await renderPaletteAppRoute();

	const hex = await screen.findByLabelText('Hex code', {exact: false});
	await userEvent.clear(hex);
	await userEvent.type(hex, '#b69aff');

	expect(screen.getByLabelText('Red', {exact: false})).toHaveValue('182');
	expect(screen.getByLabelText('Green', {exact: false})).toHaveValue('154');
	expect(screen.getByLabelText('Blue', {exact: false})).toHaveValue('255');
	expect(screen.getByLabelText('GML number')).toHaveValue('16751286');
});

test('changes the color on new GML input', async () => {
	await renderPaletteAppRoute();

	const hex = await screen.findByLabelText('GML number');
	await userEvent.clear(hex);
	await userEvent.type(hex, '16751286');

	expect(screen.getByLabelText('Hex code', {exact: false})).toHaveValue(
		'#b69aff',
	);
	expect(screen.getByLabelText('Red', {exact: false})).toHaveValue('182');
	expect(screen.getByLabelText('Green', {exact: false})).toHaveValue('154');
	expect(screen.getByLabelText('Blue', {exact: false})).toHaveValue('255');
});

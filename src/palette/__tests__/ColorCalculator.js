// @flow strict

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPaletteAppRoute from '../testUtil/renderPaletteAppRoute';

test('changes the color on new input', async () => {
	await renderPaletteAppRoute();

	await screen.findByTestId('colorcalculator-hex');

	const hex = screen.getByTestId('colorcalculator-hex'); // workaround bug
	await userEvent.clear(hex);
	await userEvent.type(hex, '#b69aff');

	expect(screen.getByTestId('colorcalculator-r')).toHaveValue(182);
	expect(screen.getByTestId('colorcalculator-g')).toHaveValue(154);
	expect(screen.getByTestId('colorcalculator-b')).toHaveValue(255);
	expect(screen.getByTestId('colorcalculator-gml')).toHaveValue('16751286');
});

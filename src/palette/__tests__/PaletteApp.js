// @flow strict

import {screen} from '@testing-library/react';

import renderPaletteAppRoute from '../testUtil/renderPaletteAppRoute';

test('renders the UI', async () => {
	await renderPaletteAppRoute();

	expect(screen.getByText('Color palettes')).toBeVisible();
});

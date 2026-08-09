import {screen} from '@testing-library/react';
import {expect, test} from 'vitest';

import renderPaletteAppRoute from '../testUtil/renderPaletteAppRoute';

test('renders the UI', async () => {
	await renderPaletteAppRoute();

	expect(screen.getByText('Color palettes')).toBeVisible();
});

import {screen} from '@testing-library/react';

import {renderWithFileRoutes} from '../../file-route-utils';

export default async function renderPaletteAppRoute() {
	renderWithFileRoutes('/palette');

	await screen.findByText(
		'Color palettes',
		{},
		{
			// Hacky fix for CI
			timeout: 3000,
		},
	);
}

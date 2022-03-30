import {screen} from '@testing-library/react';

import renderAppRoutes from '../../testUtil/renderAppRoutes';

test('renders the UI', async () => {
	renderAppRoutes();

	await screen.findByText(
		'Load custom level_data',
		{},
		{
			// Hacky fix for GitHub CI
			timeout: 2000,
		}
	);

	const worldMapActive = await screen.findByTestId('worldmap-active');
	expect(worldMapActive).toHaveTextContent('0, 0');
});

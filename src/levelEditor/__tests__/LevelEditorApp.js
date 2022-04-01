import {screen} from '@testing-library/react';

import renderAppRoutes from '../../testUtil/renderAppRoutes';

test('renders the UI', async () => {
	await renderAppRoutes();

	const worldMapActive = await screen.findByTestId('worldmap-active');
	expect(worldMapActive).toHaveTextContent('0, 0');
});

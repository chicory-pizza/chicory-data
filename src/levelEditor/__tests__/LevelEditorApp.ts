import {screen} from '@testing-library/react';

import renderLevelEditorRoute from '../testUtil/renderLevelEditorRoute';

test('renders the UI', async () => {
	await renderLevelEditorRoute();

	const worldMapActive = await screen.findByTestId('worldmap-active');
	expect(worldMapActive).toHaveTextContent('0, 0');
});

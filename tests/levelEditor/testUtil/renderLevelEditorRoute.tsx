import {screen} from '@testing-library/react';

import {renderWithFileRoutes} from '../../file-route-utils';

export default async function renderLevelEditorRoute() {
	renderWithFileRoutes('/level/0_0_0');

	await screen.findByText(
		'Load',
		{},
		{
			// Hacky fix for CI
			timeout: 10000,
		},
	);
}

import {screen} from '@testing-library/react';

import {renderWithFileRoutes} from '../../file-route-utils';

export default async function renderDogEditorRoute() {
	renderWithFileRoutes('/dog');

	await screen.findByText(
		'Drawdog maker',
		{},
		{
			// Hacky fix for CI
			timeout: 6000,
		},
	);
}

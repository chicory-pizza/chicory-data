import {render, screen} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';

import AppWrapper from '../../../src/AppWrapper';
import {routes} from '../../../src/routes';

export default async function renderLevelEditorRoute() {
	render(
		<AppWrapper>
			<RouterProvider
				router={createMemoryRouter(routes, {
					initialEntries: ['/level'],
				})}
			/>
		</AppWrapper>,
	);

	await screen.findByText(
		'Load',
		{},
		{
			// Hacky fix for CI
			timeout: 10000,
		},
	);
}

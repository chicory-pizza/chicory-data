import {render, screen} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';

import AppWrapper from '../../AppWrapper';
import {routes} from '../../routes';

export default async function renderLevelEditorRoute() {
	render(
		<AppWrapper>
			<RouterProvider
				router={createMemoryRouter(routes, {
					initialEntries: ['/level'],
				})}
			/>
		</AppWrapper>
	);

	await screen.findByText(
		'Load',
		{},
		{
			// Hacky fix for CI
			timeout: 5000,
		}
	);
}

import {render, screen} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';

import AppWrapper from '../../../src/AppWrapper';
import {routes} from '../../../src/routes';

export default async function renderDogEditorRoute() {
	render(
		<AppWrapper>
			<RouterProvider
				router={createMemoryRouter(routes, {
					initialEntries: ['/dog'],
				})}
			/>
		</AppWrapper>,
	);

	await screen.findByText(
		'Drawdog maker',
		{},
		{
			// Hacky fix for CI
			timeout: 6000,
		},
	);
}

import {render, screen} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';

import AppWrapper from '../../AppWrapper';
import {routes} from '../../routes';

export default async function renderPaletteAppRoute() {
	render(
		<AppWrapper>
			<RouterProvider
				router={createMemoryRouter(routes, {
					initialEntries: ['/palette'],
				})}
			/>
		</AppWrapper>
	);

	await screen.findByText(
		'Color palettes',
		{},
		{
			// Hacky fix for CI
			timeout: 3000,
		}
	);
}

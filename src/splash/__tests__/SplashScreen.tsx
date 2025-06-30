import {render, screen} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';

import AppWrapper from '../../AppWrapper';
import {routes} from '../../routes';

test('renders the splash screen', async () => {
	render(
		<AppWrapper>
			<RouterProvider
				router={createMemoryRouter(routes, {
					initialEntries: ['/'],
				})}
			/>
		</AppWrapper>
	);

	expect(await screen.findByText('Chicory: A Colorful Modding')).toBeVisible();

	expect(await screen.findByText('⛰ Level editor')).toBeVisible();
});

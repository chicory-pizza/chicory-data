// @flow strict

import {render, screen} from '@testing-library/react';
import {Suspense} from 'react';
import {
	// $FlowFixMe[missing-export]
	createMemoryRouter,
	RouterProvider,
} from 'react-router-dom';

import {routes} from '../../routes';

test('renders the splash screen', async () => {
	await render(
		<Suspense>
			<RouterProvider
				router={createMemoryRouter(routes, {
					initialEntries: ['/'],
				})}
			/>
		</Suspense>
	);

	await screen.findByText('Chicory: A Colorful Modding');

	await screen.findByText('⛰ Level editor');
});

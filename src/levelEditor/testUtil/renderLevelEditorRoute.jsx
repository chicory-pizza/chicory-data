// @flow strict

import {render, screen} from '@testing-library/react';
import {Suspense} from 'react';
import {
	// $FlowFixMe[missing-export]
	createMemoryRouter,
	RouterProvider,
} from 'react-router-dom';

import {routes} from '../../routes';

export default async function renderLevelEditorRoute(): mixed {
	await render(
		<Suspense>
			<RouterProvider
				router={createMemoryRouter(routes, {
					initialEntries: ['/level'],
				})}
			/>
		</Suspense>
	);

	await screen.findByText(
		'Load',
		{},
		{
			// Hacky fix for CI
			timeout: 2000,
		}
	);
}

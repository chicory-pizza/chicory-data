// @flow strict

import {render, screen} from '@testing-library/react';
import {Suspense} from 'react';
import {
	// $FlowFixMe[missing-export]
	createMemoryRouter,
	RouterProvider,
} from 'react-router-dom';

import {routes} from '../../routes';

export default async function renderPaletteAppRoute(): mixed {
	await render(
		<Suspense>
			<RouterProvider
				router={createMemoryRouter(routes, {
					initialEntries: ['/palette'],
				})}
			/>
		</Suspense>
	);

	await screen.findByText('Color palettes');
}

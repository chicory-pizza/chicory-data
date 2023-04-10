// @flow strict

import {render} from '@testing-library/react';
import {Suspense} from 'react';
import {
	// $FlowFixMe[missing-export]
	createMemoryRouter,
	// $FlowFixMe[missing-export]
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
}

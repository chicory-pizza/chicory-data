// @flow strict

import {screen} from '@testing-library/react';
import {render} from '@testing-library/react';
import {Suspense} from 'react';
import {
	// $FlowFixMe[missing-export]
	createMemoryRouter,
	// $FlowFixMe[missing-export]
	RouterProvider,
} from 'react-router-dom';

import {routes} from '../../routes';

export default async function renderDogEditorRoute(): mixed {
	await render(
		<Suspense>
			<RouterProvider
				router={createMemoryRouter(routes, {
					initialEntries: ['/dog'],
				})}
			/>
		</Suspense>
	);

	await screen.findByText('Drawdog maker');
}

import {render, screen} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';

import AppWrapper from '../../AppWrapper';
import {routes} from '../../routes';

export default async function renderDogEditorRoute() {
	await render(
		<AppWrapper>
			<RouterProvider
				router={createMemoryRouter(routes, {
					initialEntries: ['/dog'],
				})}
			/>
		</AppWrapper>
	);

	await screen.findByText('Drawdog maker');
}

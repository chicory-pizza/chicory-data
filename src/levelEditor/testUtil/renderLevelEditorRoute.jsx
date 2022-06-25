// @flow strict

import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import {routes} from '../../routes';

export default async function renderLevelEditorRoute(): mixed {
	await render(
		<MemoryRouter initialEntries={['/level']}>{routes}</MemoryRouter>
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

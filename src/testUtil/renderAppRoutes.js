// @flow strict

import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import {routes} from '../routes';

export default async function renderAppRoutes(
	waitForLoad: boolean = true
): mixed {
	await render(<MemoryRouter>{routes}</MemoryRouter>);

	if (waitForLoad) {
		await screen.findByText(
			'Load custom level_data',
			{},
			{
				// Hacky fix for CI
				timeout: 2000,
			}
		);
	}
}

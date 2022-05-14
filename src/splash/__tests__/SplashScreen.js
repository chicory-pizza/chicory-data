// @flow strict

import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import {routes} from '../../routes';

test('renders the splash screen', async () => {
	await render(<MemoryRouter initialEntries={['/']}>{routes}</MemoryRouter>);

	await screen.findByText('Chicory: A Colorful Modding');

	await screen.findByText('⛰ Level editor');
});

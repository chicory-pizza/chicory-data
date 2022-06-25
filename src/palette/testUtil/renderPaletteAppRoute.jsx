// @flow strict

import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import {routes} from '../../routes';

export default async function renderPaletteAppRoute(): mixed {
	await render(
		<MemoryRouter initialEntries={['/palette']}>{routes}</MemoryRouter>
	);
}

// @flow strict

import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import {routes} from '../../routes';

export default async function renderDogEditorRoute(): mixed {
	await render(<MemoryRouter initialEntries={['/dog']}>{routes}</MemoryRouter>);
}

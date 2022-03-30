// @flow strict

import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import {routes} from '../routes';

export default function renderAppRoutes(): mixed {
	return render(<MemoryRouter>{routes}</MemoryRouter>);
}

import {screen, render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';

import {routes} from '../../../routes';

test('duplicates the level', async () => {
	render(<MemoryRouter>{routes}</MemoryRouter>);

	await waitFor(() => {
		expect(screen.getByText('Duplicate level')).toBeInTheDocument();
	});

	userEvent.click(screen.getByText('Duplicate level'));

	userEvent.type(screen.getByTestId('duplicatelevelmodal-layer'), '1', {
		initialSelectionStart: 0,
	});
	userEvent.type(screen.getByTestId('duplicatelevelmodal-x'), '2', {
		initialSelectionStart: 0,
	});
	userEvent.type(screen.getByTestId('duplicatelevelmodal-y'), '3', {
		initialSelectionStart: 0,
	});
	userEvent.click(screen.getByTestId('duplicatelevelmodal-submit'));

	expect(screen.getByTestId('worldmap-active')).toHaveTextContent('2, 3');
});

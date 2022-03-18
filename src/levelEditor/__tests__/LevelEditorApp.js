import {screen, render, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';

import {routes} from '../../routes';

test('renders the UI', async () => {
	render(<MemoryRouter>{routes}</MemoryRouter>);

	await waitFor(
		() => {
			expect(screen.getByText(/Load custom level_data/)).toBeInTheDocument();
		},
		{
			// Hacky fix for GitHub CI
			timeout: 2000,
		}
	);

	expect(screen.getByTestId('worldmap-active')).toHaveTextContent('0, 0');
});

test('changing the level using the 3 number inputs', async () => {
	render(<MemoryRouter>{routes}</MemoryRouter>);

	await waitFor(() => {
		expect(screen.getByTestId('levelselector-layer')).toBeInTheDocument();
	});

	userEvent.type(screen.getByTestId('levelselector-layer'), '1', {
		initialSelectionStart: 0,
	});
	userEvent.type(screen.getByTestId('levelselector-x'), '2', {
		initialSelectionStart: 0,
	});
	userEvent.type(screen.getByTestId('levelselector-y'), '-99', {
		initialSelectionStart: 0,
	});
	userEvent.click(screen.getByTestId('levelselector-go'));

	expect(
		within(screen.getByTestId('levelpreview-root')).getByText(/GameIntro/)
	).toBeInTheDocument();
});

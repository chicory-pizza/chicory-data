import {screen, render, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('renders the UI', async () => {
	render(<App />);

	await waitFor(() => {
		expect(screen.getByText(/Load custom level_data/)).toBeInTheDocument();
	});

	await waitFor(() => {
		expect(screen.getByTestId('worldmap-active')).toHaveTextContent('0, 0');
	});
});

test('changing the level using the 3 number inputs', async () => {
	render(<App />);

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

import {
	fireEvent,
	screen,
	render,
	waitFor,
	within,
} from '@testing-library/react';
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

	// todo should change to `userEvent.type()`
	fireEvent.change(screen.getByTestId('levelselector-layer'), {
		target: {value: 1},
	});
	fireEvent.change(screen.getByTestId('levelselector-x'), {
		target: {value: 2},
	});
	fireEvent.change(screen.getByTestId('levelselector-y'), {
		target: {value: -99},
	});
	userEvent.click(screen.getByTestId('levelselector-go'));

	expect(
		within(screen.getByTestId('levelpreview-root')).getByText(/GameIntro/)
	).toBeInTheDocument();
});

import {screen, render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LevelEditorApp from '../../../LevelEditorApp';

test('deletes the level if confirmed', async () => {
	render(<LevelEditorApp />);

	await waitFor(() => {
		expect(screen.getByText('Delete level')).toBeInTheDocument();
	});

	window.confirm = jest.fn().mockReturnValue(true);

	userEvent.click(screen.getByText('Delete level'));

	expect(window.confirm).toHaveBeenCalled();
	expect(screen.getByText("Level 0, 0, 0 doesn't exist")).toBeInTheDocument();
});

test('does not delete the level if cancelled', async () => {
	render(<LevelEditorApp />);

	await waitFor(() => {
		expect(screen.getByText('Delete level')).toBeInTheDocument();
	});

	window.confirm = jest.fn().mockReturnValue(false);

	userEvent.click(screen.getByText('Delete level'));

	expect(window.confirm).toHaveBeenCalled();
	expect(screen.getByTestId('worldmap-active')).toHaveTextContent('0, 0');
	expect(
		screen.queryByText("Level 0, 0, 0 doesn't exist")
	).not.toBeInTheDocument();
});
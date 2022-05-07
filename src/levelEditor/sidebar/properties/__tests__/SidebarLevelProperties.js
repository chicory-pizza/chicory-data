import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderLevelEditorRoute from '../../../testUtil/renderLevelEditorRoute';

test('deletes the level if confirmed', async () => {
	await renderLevelEditorRoute();

	await screen.findByText('Delete level');

	window.confirm = jest.fn().mockReturnValue(true);

	await userEvent.click(screen.getByText('Delete level'));

	expect(window.confirm).toHaveBeenCalled();
	expect(screen.getByText(/Level 0, 0, 0 doesn't exist/)).toBeInTheDocument();
});

test('does not delete the level if cancelled', async () => {
	await renderLevelEditorRoute();

	await screen.findByText('Delete level');

	window.confirm = jest.fn().mockReturnValue(false);

	await userEvent.click(screen.getByText('Delete level'));

	expect(window.confirm).toHaveBeenCalled();
	expect(screen.getByTestId('worldmap-active')).toHaveTextContent('0, 0');
	expect(
		screen.queryByText(/Level 0, 0, 0 doesn't exist/)
	).not.toBeInTheDocument();
});

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderLevelEditorRoute from '../../../testUtil/renderLevelEditorRoute';

jest.setTimeout(10000); // hack, sigh

test('deletes the level if confirmed', async () => {
	await renderLevelEditorRoute();

	await userEvent.click(await screen.findByText('Delete level'));
	await userEvent.click(await screen.findByText('Delete'));

	expect(screen.getByText(/Level 0, 0, 0 doesn't exist/)).toBeInTheDocument();
});

test('does not delete the level if cancelled', async () => {
	await renderLevelEditorRoute();

	await userEvent.click(await screen.findByText('Delete level'));
	await userEvent.click(await screen.findByText('Cancel'));

	expect(screen.getByTestId('worldmap-active')).toHaveTextContent('0, 0');
	expect(
		screen.queryByText(/Level 0, 0, 0 doesn't exist/)
	).not.toBeInTheDocument();
});

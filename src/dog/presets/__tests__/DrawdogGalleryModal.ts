import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderDogEditorRoute from '../../testUtil/renderDogEditorRoute';

jest.setTimeout(20000); // hack, sigh

test('filters the gallery', async () => {
	await renderDogEditorRoute();

	await userEvent.click(screen.getByText('Gallery'));

	await userEvent.type(screen.getByLabelText('Search:'), 'panCa');

	expect(screen.getByText('Pizza (default)')).not.toBeVisible();
	expect(screen.getByText('Pancake')).toBeVisible();
});

test('shows no results message', async () => {
	await renderDogEditorRoute();

	await userEvent.click(screen.getByText('Gallery'));

	await userEvent.type(screen.getByLabelText('Search:'), 'pickle');

	expect(screen.getByText('Pizza (default)')).not.toBeVisible();
	expect(screen.getByText('No dogs')).toBeVisible();
});

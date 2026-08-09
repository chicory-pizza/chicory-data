import {screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect, test} from 'vitest';

import renderLevelEditorRoute from '../../testUtil/renderLevelEditorRoute';

test('makes decos visible', async () => {
	await renderLevelEditorRoute();

	await userEvent.click(await screen.findByText('View options'));
	await userEvent.click(await screen.findByText('Decorations'));

	const levelPreviewRoot = await screen.findByTestId('levelpreview-root');
	expect(
		within(levelPreviewRoot).getAllByAltText(/tree_trunk7/),
	).not.toHaveLength(0);
});

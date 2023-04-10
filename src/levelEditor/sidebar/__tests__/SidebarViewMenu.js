// @flow strict

import {screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderLevelEditorRoute from '../../testUtil/renderLevelEditorRoute';

jest.setTimeout(10000); // hack, sigh

test('makes decos visible', async () => {
	await renderLevelEditorRoute();

	await userEvent.click(await screen.findByText('Change view'));
	await userEvent.click(screen.getByText('Decorations'));

	const levelPreviewRoot = screen.getByTestId('levelpreview-root');
	expect(
		within(levelPreviewRoot).getAllByAltText(/tree_trunk7/)
	).not.toHaveLength(0);
});

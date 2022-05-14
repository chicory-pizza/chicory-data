// @flow strict

import {screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderLevelEditorRoute from '../../testUtil/renderLevelEditorRoute';

test('changing the level using the 3 number inputs', async () => {
	await renderLevelEditorRoute();

	await screen.findByTestId('levelselector-layer');

	await userEvent.type(screen.getByTestId('levelselector-layer'), '1');
	await userEvent.type(screen.getByTestId('levelselector-x'), '2');
	const y = screen.getByTestId('levelselector-y'); // workaround bug
	await userEvent.clear(y);
	await userEvent.type(y, '-99');
	await userEvent.click(screen.getByTestId('levelselector-go'));

	const levelPreviewRoot = screen.getByTestId('levelpreview-root');
	expect(within(levelPreviewRoot).getByText(/GameIntro/)).toBeInTheDocument();
});

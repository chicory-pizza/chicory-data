import {screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect, test} from 'vitest';

import clearAndType from '../../testUtil/clearAndType';
import renderLevelEditorRoute from '../testUtil/renderLevelEditorRoute';

test('changing the level using the 3 number inputs', async () => {
	await renderLevelEditorRoute();

	await clearAndType(await screen.findByTestId('levelselector-layer'), '1');
	await clearAndType(screen.getByTestId('levelselector-x'), '2');
	await clearAndType(screen.getByTestId('levelselector-y'), '-99');
	await userEvent.click(screen.getByTestId('levelselector-go'));

	const levelPreviewRoot = screen.getByTestId('levelpreview-root');
	expect(within(levelPreviewRoot).getByText(/GameIntro/)).toBeInTheDocument();
});

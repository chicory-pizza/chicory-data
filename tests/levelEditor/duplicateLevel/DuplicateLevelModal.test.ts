import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect, test} from 'vitest';

import clearAndType from '../../testUtil/clearAndType';
import renderLevelEditorRoute from '../testUtil/renderLevelEditorRoute';

test('duplicates the level', async () => {
	await renderLevelEditorRoute();

	await screen.findByText('Duplicate level');

	await userEvent.click(screen.getByText('Duplicate level'));

	await clearAndType(screen.getByTestId('duplicatelevelmodal-layer'), '1');
	await clearAndType(screen.getByTestId('duplicatelevelmodal-x'), '2');
	await clearAndType(screen.getByTestId('duplicatelevelmodal-y'), '3');
	await userEvent.click(screen.getByTestId('duplicatelevelmodal-submit'));

	expect(screen.getByTestId('worldmap-active')).toHaveTextContent('2, 3');
});
